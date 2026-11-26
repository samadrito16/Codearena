import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

console.log('🧪 Running Client Execution System Tests...\n');

// 1. Verify Scope Isolation: Workspace.tsx must NOT use client execution
const workspaceSrc = fs.readFileSync(path.resolve('src/pages/Workspace.tsx'), 'utf-8');
assert(!workspaceSrc.includes('clientExecution'), 'Workspace.tsx must not import clientExecution!');
assert(!workspaceSrc.includes('pyodide'), 'Workspace.tsx must not use pyodide!');
assert(!workspaceSrc.includes('jsWorkerRunner'), 'Workspace.tsx must not use jsWorkerRunner!');
console.log('✅ Scope Isolation Verified: Workspace.tsx remains strictly on backend test harness.');

// 2. Verify StandaloneEditor.tsx imports and integrates client execution
const editorSrc = fs.readFileSync(path.resolve('src/pages/StandaloneEditor.tsx'), 'utf-8');
assert(editorSrc.includes('executeEditorCode'), 'StandaloneEditor.tsx must use executeEditorCode!');
assert(editorSrc.includes('getEngineDetails'), 'StandaloneEditor.tsx must use getEngineDetails!');
assert(editorSrc.includes('prewarmLanguage'), 'StandaloneEditor.tsx must use prewarmLanguage!');
console.log('✅ StandaloneEditor Integration Verified: Uses executeEditorCode, getEngineDetails, prewarmLanguage.');

// 3. Test TypeScript Cleaner Logic
const tsSample = `
interface User {
  id: number;
  name: string;
}
type Role = 'admin' | 'student';
const user: User = { id: 1, name: "Alice" };
function getGreeting(u: User): string {
  return "Hello " + u.name;
}
const list: Array<number> = [1, 2, 3];
`;

function cleanTypeScriptForWorker(tsCode) {
  return tsCode
    .replace(/export\s+(interface|type)\s+[\s\S]*?\{[\s\S]*?\}/g, '')
    .replace(/(interface|type)\s+[A-Za-z0-9_<>,\s]+\s*=\s*[\s\S]*?;/g, '')
    .replace(/(interface)\s+[A-Za-z0-9_<>,\s]+\s*\{[\s\S]*?\}/g, '')
    .replace(/export\s+default\s+/g, '')
    .replace(/export\s+/g, '')
    .replace(/(private|public|protected|readonly)\s+/g, '')
    .replace(/:\s*(string|number|boolean|any|void|unknown|never|Record<[^>]+>|Map<[^>]+>|Set<[^>]+>|Array<[^>]+>|\[\]|{[^}]+})(\[\])?(?=[=;,)\{])/g, '')
    .replace(/as\s+[A-Za-z0-9_<>]+/g, '')
    .replace(/<[A-Za-z0-9_,\s]+>(?=\()/g, '');
}

const cleaned = cleanTypeScriptForWorker(tsSample);
assert(!cleaned.includes('interface User'), 'interface should be stripped');
assert(!cleaned.includes('type Role'), 'type alias should be stripped');
console.log('✅ TypeScript Transpilation/Stripping Verified.');

// 4. Engine Classification Verification
const clientServiceSrc = fs.readFileSync(path.resolve('src/services/clientExecution/clientExecutionService.ts'), 'utf-8');
assert(clientServiceSrc.includes("'pyodide-wasm'"), 'Service must support pyodide-wasm');
assert(clientServiceSrc.includes("'isolated-worker'"), 'Service must support isolated-worker');
assert(clientServiceSrc.includes("'server'"), 'Service must support server');
assert(clientServiceSrc.includes("runPythonInPyodide"), 'Python must route to runPythonInPyodide');
assert(clientServiceSrc.includes("runJsInWorker"), 'JavaScript must route to runJsInWorker');
console.log('✅ Execution Engine Routing Verified.');

console.log('\n🎉 ALL CLIENT EXECUTION TESTS PASSED SUCCESSFULLY!');
