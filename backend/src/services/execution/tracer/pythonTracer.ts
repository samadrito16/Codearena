/**
 * Python Execution Tracer Generator
 * Generates an isolated tracing script using standard library sys.settrace()
 * to capture discrete execution steps, call stacks, variable scopes, and heap objects.
 */

export interface PythonTracerOptions {
  maxSteps?: number;
  functionNameHint?: string;
  problemId?: string;
}

/**
 * Builds the Python script that executes and traces user code.
 */
export function generatePythonTracerScript(
  userCode: string,
  rawInput: string,
  options: PythonTracerOptions = {}
): string {
  const maxSteps = options.maxSteps || 400;
  const functionHint = options.functionNameHint || '';

  // Escape user code and input safely into Python string literals
  const encodedUserCode = JSON.stringify(userCode);
  const encodedRawInput = JSON.stringify(rawInput || '');
  const encodedHint = JSON.stringify(functionHint);

  return `# -*- coding: utf-8 -*-
"""
PrismCode Deterministic Python Execution Tracer
Powered by sys.settrace() - Zero AI, 100% exact runtime states.
"""
import sys
import json
import re
import inspect
import io
import traceback
import types

MAX_STEPS = ${maxSteps}
TARGET_FILENAME = "<user_code>"
USER_CODE = ${encodedUserCode}
RAW_INPUT = ${encodedRawInput}
FUNCTION_HINT = ${encodedHint}

TRACE_START_DELIMITER = "__PRISMCODE_TRACE_START__"
TRACE_END_DELIMITER = "__PRISMCODE_TRACE_END__"

class PrismCodeTracer:
    def __init__(self, target_filename=TARGET_FILENAME, max_steps=MAX_STEPS):
        self.target_filename = target_filename
        self.max_steps = max_steps
        self.steps = []
        self.stdout_buffer = io.StringIO()
        self.step_counter = 0
        self.truncated = False
        self.last_line = None
        self.last_func = None

    def serialize_value(self, val, depth=0):
        if depth > 3:
            return {"type": "str", "value": repr(val)[:40]}
        if val is None:
            return {"type": "None", "value": None}
        if isinstance(val, bool):
            return {"type": "bool", "value": val}
        if isinstance(val, int):
            return {"type": "int", "value": val}
        if isinstance(val, float):
            return {"type": "float", "value": val}
        if isinstance(val, str):
            disp = val if len(val) <= 120 else val[:117] + "..."
            return {"type": "str", "value": disp}
        
        # References to structured heap objects
        ref_id = f"heap_{id(val)}"
        preview = repr(val)
        if len(preview) > 60:
            preview = preview[:57] + "..."
        return {"type": "ref", "refId": ref_id, "preview": preview}

    def serialize_heap_object(self, val):
        ref_id = f"heap_{id(val)}"
        if isinstance(val, (list, tuple)):
            items = [self.serialize_value(x, depth=1) for x in val[:60]]
            return ref_id, {
                "id": ref_id,
                "type": "list" if isinstance(val, list) else "tuple",
                "items": items,
                "length": len(val),
            }
        elif isinstance(val, dict):
            entries = []
            for k, v in list(val.items())[:60]:
                entries.append({
                    "key": self.serialize_value(k, depth=1),
                    "value": self.serialize_value(v, depth=1),
                })
            return ref_id, {
                "id": ref_id,
                "type": "dict",
                "entries": entries,
                "size": len(val),
            }
        elif isinstance(val, set):
            items = [self.serialize_value(x, depth=1) for x in list(val)[:60]]
            return ref_id, {
                "id": ref_id,
                "type": "set",
                "items": items,
                "size": len(val),
            }
        elif hasattr(val, "__dict__"):
            fields = {}
            for k, v in list(val.__dict__.items())[:20]:
                if not k.startswith("_"):
                    fields[k] = self.serialize_value(v, depth=1)
            return ref_id, {
                "id": ref_id,
                "type": "object",
                "className": val.__class__.__name__,
                "fields": fields,
            }
        return None, None

    def capture_step(self, frame, event, arg=None):
        if frame.f_code.co_filename != self.target_filename:
            return

        if self.step_counter >= self.max_steps:
            self.truncated = True
            return

        line_no = frame.f_lineno
        func_name = frame.f_code.co_name

        # Avoid redundant consecutive line events without state changes if line did not move
        if event == "line" and self.last_line == line_no and self.last_func == func_name:
            pass

        self.last_line = line_no
        self.last_func = func_name
        self.step_counter += 1

        # Build Call Stack Frames
        stack = []
        curr = frame
        while curr:
            if curr.f_code.co_filename == self.target_filename:
                stack.append({
                    "frameId": f"frame_{id(curr)}",
                    "funcName": curr.f_code.co_name,
                    "line": curr.f_lineno,
                })
            curr = curr.f_back
        stack.reverse()

        # Extract locals & heap references
        variables = {}
        heap = {}
        integer_pointers = {}

        for var_name, var_val in list(frame.f_locals.items()):
            if var_name.startswith("__") and var_name.endswith("__"):
                continue
            if isinstance(var_val, types.ModuleType):
                continue

            variables[var_name] = self.serialize_value(var_val)

            ref_id, heap_obj = self.serialize_heap_object(var_val)
            if heap_obj:
                heap[ref_id] = heap_obj

            if isinstance(var_val, int) and not isinstance(var_val, bool):
                integer_pointers[var_name] = var_val

        # Detect index pointers on lists
        pointers = []
        for heap_id, heap_obj in heap.items():
            if heap_obj["type"] in ("list", "tuple"):
                length = heap_obj["length"]
                for p_name, p_idx in integer_pointers.items():
                    if 0 <= p_idx < length:
                        pointers.append({
                            "name": p_name,
                            "index": p_idx,
                            "targetHeapId": heap_id,
                        })

        step_record = {
            "stepNumber": self.step_counter,
            "line": line_no,
            "event": event,
            "funcName": func_name,
            "callStack": stack,
            "variables": variables,
            "heap": heap,
            "pointers": pointers,
            "stdout": self.stdout_buffer.getvalue(),
        }

        if event == "return":
            step_record["returnValue"] = self.serialize_value(arg)
        elif event == "exception":
            exc_type, exc_val, _ = arg
            step_record["exception"] = f"{exc_type.__name__}: {exc_val}"

        self.steps.append(step_record)

    def trace_callback(self, frame, event, arg):
        if frame.f_code.co_filename != self.target_filename:
            return self.trace_callback

        self.capture_step(frame, event, arg)
        return self.trace_callback


def _parse_input_payload(raw):
    if not raw or not raw.strip():
        return [], {}
    raw = raw.strip()

    # Case 1: valid JSON
    try:
        data = json.loads(raw)
        return [data], {}
    except Exception:
        pass

    # Case 2: Named assignments (e.g. nums = [2, 7, 11, 15], target = 9)
    parts = re.split(r',\\s*(?=[a-zA-Z_]\\w*\\s*=)', raw)
    is_named = any(re.match(r'^[a-zA-Z_]\\w*\\s*=', p) for p in parts)
    if is_named:
        scope = {}
        for p in parts:
            idx = p.find('=')
            if idx != -1:
                k = p[:idx].strip()
                v_str = p[idx+1:].strip()
                try:
                    scope[k] = json.loads(v_str)
                except Exception:
                    if v_str == 'true': scope[k] = True
                    elif v_str == 'false': scope[k] = False
                    elif v_str == 'null': scope[k] = None
                    else: scope[k] = v_str
        return [], scope

    # Case 3: Line delimited values
    lines = [l.strip() for l in raw.splitlines() if l.strip()]
    if lines:
        parsed_lines = []
        for l in lines:
            try:
                parsed_lines.append(json.loads(l))
            except Exception:
                parsed_lines.append(l)
        return parsed_lines, {}

    return [raw], {}


def main():
    tracer = PrismCodeTracer()
    real_stdout = sys.stdout
    sys.stdout = tracer.stdout_buffer

    # 1. Compile User Code
    try:
        code_obj = compile(USER_CODE, TARGET_FILENAME, "exec")
    except SyntaxError as e:
        sys.stdout = real_stdout
        out = {
            "success": False,
            "error": f"SyntaxError: {e.msg} at line {e.lineno}",
            "steps": [],
            "totalSteps": 0,
            "truncated": False,
        }
        print(f"{TRACE_START_DELIMITER}\\n{json.dumps(out)}\\n{TRACE_END_DELIMITER}")
        return

    user_globals = {
        "__name__": "__main__",
        "__file__": TARGET_FILENAME,
    }

    # 2. Execute module definitions (untraced)
    try:
        exec(code_obj, user_globals)
    except Exception as e:
        sys.stdout = real_stdout
        out = {
            "success": False,
            "error": f"Initialization error: {str(e)}",
            "steps": [],
            "totalSteps": 0,
            "truncated": False,
        }
        print(f"{TRACE_START_DELIMITER}\\n{json.dumps(out)}\\n{TRACE_END_DELIMITER}")
        return

    # 3. Discover target function or Solution class
    candidates = [
        FUNCTION_HINT,
        "two_sum", "twoSum", "is_valid", "isValid",
        "length_of_longest_substring", "max_area", "search",
        "solve", "solution",
    ]
    candidates = [c for c in candidates if c]

    fn = None
    has_solution_class = "Solution" in user_globals and isinstance(user_globals["Solution"], type)

    if has_solution_class:
        try:
            sol = user_globals["Solution"]()
            methods = [m for m in dir(sol) if not m.startswith("_") and callable(getattr(sol, m))]
            if FUNCTION_HINT and hasattr(sol, FUNCTION_HINT):
                fn = getattr(sol, FUNCTION_HINT)
            elif methods:
                fn = getattr(sol, methods[0])
        except Exception:
            pass

    if fn is None:
        for c in candidates:
            if c in user_globals and callable(user_globals[c]):
                fn = user_globals[c]
                break

    if fn is None:
        # Fallback: any non-internal callable defined in user code
        for k, v in list(user_globals.items()):
            if callable(v) and not k.startswith("_") and getattr(v, "__code__", None) and v.__code__.co_filename == TARGET_FILENAME:
                fn = v
                break

    # 4. Prepare parameters
    args, kwargs = _parse_input_payload(RAW_INPUT)

    # 5. Execute with tracing enabled
    sys.settrace(tracer.trace_callback)
    exec_error = None
    final_result = None

    try:
        if fn is not None:
            sig = inspect.signature(fn)
            params = list(sig.parameters.keys())
            if params and params[0] == "self":
                params = params[1:]

            if kwargs:
                call_args = []
                for p in params:
                    if p in kwargs:
                        call_args.append(kwargs[p])
                if len(call_args) == len(params):
                    final_result = fn(*call_args)
                else:
                    final_result = fn(**kwargs)
            else:
                if len(params) > 1 and len(args) == 1 and isinstance(args[0], (list, tuple)) and len(args[0]) == len(params):
                    args = list(args[0])
                if len(args) == len(params):
                    final_result = fn(*args)
                elif len(params) == 1 and len(args) > 1:
                    final_result = fn(args)
                elif len(args) > 0:
                    final_result = fn(*args)
                else:
                    final_result = fn()
        else:
            # Re-run module top-level under trace if no specific function
            exec(code_obj, user_globals)
    except Exception as e:
        exec_error = f"{type(e).__name__}: {str(e)}"
    finally:
        sys.settrace(None)
        sys.stdout = real_stdout

    # 6. Format final trace response
    trace_payload = {
        "success": exec_error is None,
        "error": exec_error,
        "finalResult": tracer.serialize_value(final_result) if final_result is not None else None,
        "steps": tracer.steps,
        "totalSteps": len(tracer.steps),
        "truncated": tracer.truncated,
        "code": USER_CODE,
    }

    print(f"{TRACE_START_DELIMITER}\\n{json.dumps(trace_payload)}\\n{TRACE_END_DELIMITER}")


if __name__ == "__main__":
    main()
`;
}
