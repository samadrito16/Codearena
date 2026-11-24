import React, { useState } from 'react';
import { Calculator, Delete, Minus, Move, X } from 'lucide-react';

interface VirtualCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VirtualCalculator({ isOpen, onClose }: VirtualCalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<string | null>(null);
  const [clearOnNext, setClearOnNext] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (clearOnNext || display === '0') {
      setDisplay(digit);
      setClearOnNext(false);
    } else {
      if (display.length < 16) {
        setDisplay(display + digit);
      }
    }
  };

  const handleDecimal = () => {
    if (clearOnNext) {
      setDisplay('0.');
      setClearOnNext(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setMemory(null);
    setPendingOp(null);
    setClearOnNext(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleNegate = () => {
    if (display !== '0') {
      setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
    }
  };

  const handleOperator = (op: string) => {
    const val = parseFloat(display);
    if (memory !== null && pendingOp && !clearOnNext) {
      const res = calculate(memory, val, pendingOp);
      setDisplay(String(res));
      setMemory(res);
    } else {
      setMemory(val);
    }
    setPendingOp(op);
    setClearOnNext(true);
  };

  const handleEquals = () => {
    if (memory === null || !pendingOp) return;
    const val = parseFloat(display);
    const res = calculate(memory, val, pendingOp);
    setDisplay(String(res));
    setMemory(null);
    setPendingOp(null);
    setClearOnNext(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    let result = 0;
    switch (op) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '×':
      case '*':
        result = a * b;
        break;
      case '÷':
      case '/':
        result = b !== 0 ? a / b : 0;
        break;
      case 'x^y':
        result = Math.pow(a, b);
        break;
      default:
        result = b;
    }
    return Math.round(result * 100000000) / 100000000;
  };

  const handleFunction = (fn: string) => {
    const val = parseFloat(display);
    let res = 0;
    switch (fn) {
      case 'sin':
        res = Math.sin((val * Math.PI) / 180);
        break;
      case 'cos':
        res = Math.cos((val * Math.PI) / 180);
        break;
      case 'tan':
        res = Math.tan((val * Math.PI) / 180);
        break;
      case 'sqrt':
        res = val >= 0 ? Math.sqrt(val) : NaN;
        break;
      case 'sqr':
        res = val * val;
        break;
      case 'inv':
        res = val !== 0 ? 1 / val : NaN;
        break;
      case 'log':
        res = val > 0 ? Math.log10(val) : NaN;
        break;
      case 'ln':
        res = val > 0 ? Math.log(val) : NaN;
        break;
      case 'fact':
        res = factorial(Math.floor(val));
        break;
      case 'pi':
        res = Math.PI;
        break;
      default:
        res = val;
    }
    setDisplay(isNaN(res) ? 'Error' : String(Math.round(res * 100000000) / 100000000));
    setClearOnNext(true);
  };

  const factorial = (n: number): number => {
    if (n < 0 || n > 25) return NaN;
    if (n === 0 || n === 1) return 1;
    let acc = 1;
    for (let i = 2; i <= n; i++) acc *= i;
    return acc;
  };

  const onMouseDownHeader = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: Math.max(10, Math.min(window.innerWidth - 320, e.clientX - dragOffset.x)),
        y: Math.max(10, Math.min(window.innerHeight - 440, e.clientY - dragOffset.y)),
      });
    };
    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      className="fixed z-50 w-72 select-none rounded-2xl border border-slate-300 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-neutral-700 dark:bg-neutral-900/95 overflow-hidden text-slate-800 dark:text-neutral-100 animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Draggable Header */}
      <div
        onMouseDown={onMouseDownHeader}
        className="flex cursor-grab active:cursor-grabbing items-center justify-between border-b border-slate-200 bg-slate-100/80 px-3 py-2 text-xs font-semibold dark:border-neutral-800 dark:bg-neutral-800/80"
      >
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-neutral-300">
          <Calculator size={14} className="text-blue-500" />
          <span>TCS iON Virtual Calculator</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
        >
          <X size={14} />
        </button>
      </div>

      {/* Calculator Screen */}
      <div className="bg-slate-900 p-3 text-right font-mono text-white dark:bg-black">
        <div className="h-4 text-[10px] text-slate-400">
          {memory !== null && `${memory} ${pendingOp || ''}`}
        </div>
        <div className="text-xl font-bold tracking-wider truncate">{display}</div>
      </div>

      {/* Button Grid */}
      <div className="p-2 space-y-1.5 text-xs">
        {/* Scientific Row 1 */}
        <div className="grid grid-cols-4 gap-1">
          <button
            type="button"
            onClick={() => handleFunction('sin')}
            className="rounded-lg bg-slate-100 p-1.5 font-semibold hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            sin
          </button>
          <button
            type="button"
            onClick={() => handleFunction('cos')}
            className="rounded-lg bg-slate-100 p-1.5 font-semibold hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            cos
          </button>
          <button
            type="button"
            onClick={() => handleFunction('tan')}
            className="rounded-lg bg-slate-100 p-1.5 font-semibold hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            tan
          </button>
          <button
            type="button"
            onClick={() => handleFunction('sqrt')}
            className="rounded-lg bg-slate-100 p-1.5 font-semibold hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            √x
          </button>
        </div>

        {/* Scientific Row 2 */}
        <div className="grid grid-cols-4 gap-1">
          <button
            type="button"
            onClick={() => handleFunction('log')}
            className="rounded-lg bg-slate-100 p-1.5 font-semibold hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            log
          </button>
          <button
            type="button"
            onClick={() => handleFunction('ln')}
            className="rounded-lg bg-slate-100 p-1.5 font-semibold hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            ln
          </button>
          <button
            type="button"
            onClick={() => handleFunction('sqr')}
            className="rounded-lg bg-slate-100 p-1.5 font-semibold hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            x²
          </button>
          <button
            type="button"
            onClick={() => handleOperator('x^y')}
            className="rounded-lg bg-slate-100 p-1.5 font-semibold hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            xʸ
          </button>
        </div>

        {/* Numbers & Standard Ops */}
        <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-100 dark:border-neutral-800">
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg bg-rose-100 p-2 font-bold text-rose-600 hover:bg-rose-200 dark:bg-rose-950/40 dark:text-rose-400"
          >
            C
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className="rounded-lg bg-slate-100 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 flex items-center justify-center"
          >
            <Delete size={14} />
          </button>
          <button
            type="button"
            onClick={handleNegate}
            className="rounded-lg bg-slate-100 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            ±
          </button>
          <button
            type="button"
            onClick={() => handleOperator('÷')}
            className="rounded-lg bg-blue-500/10 p-2 font-bold text-blue-600 hover:bg-blue-500/20 dark:text-blue-400"
          >
            ÷
          </button>

          {/* 7, 8, 9, × */}
          <button
            type="button"
            onClick={() => handleDigit('7')}
            className="rounded-lg bg-slate-50 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-700"
          >
            7
          </button>
          <button
            type="button"
            onClick={() => handleDigit('8')}
            className="rounded-lg bg-slate-50 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-700"
          >
            8
          </button>
          <button
            type="button"
            onClick={() => handleDigit('9')}
            className="rounded-lg bg-slate-50 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-700"
          >
            9
          </button>
          <button
            type="button"
            onClick={() => handleOperator('×')}
            className="rounded-lg bg-blue-500/10 p-2 font-bold text-blue-600 hover:bg-blue-500/20 dark:text-blue-400"
          >
            ×
          </button>

          {/* 4, 5, 6, - */}
          <button
            type="button"
            onClick={() => handleDigit('4')}
            className="rounded-lg bg-slate-50 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-700"
          >
            4
          </button>
          <button
            type="button"
            onClick={() => handleDigit('5')}
            className="rounded-lg bg-slate-50 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-700"
          >
            5
          </button>
          <button
            type="button"
            onClick={() => handleDigit('6')}
            className="rounded-lg bg-slate-50 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-700"
          >
            6
          </button>
          <button
            type="button"
            onClick={() => handleOperator('-')}
            className="rounded-lg bg-blue-500/10 p-2 font-bold text-blue-600 hover:bg-blue-500/20 dark:text-blue-400"
          >
            -
          </button>

          {/* 1, 2, 3, + */}
          <button
            type="button"
            onClick={() => handleDigit('1')}
            className="rounded-lg bg-slate-50 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-700"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => handleDigit('2')}
            className="rounded-lg bg-slate-50 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-700"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => handleDigit('3')}
            className="rounded-lg bg-slate-50 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-700"
          >
            3
          </button>
          <button
            type="button"
            onClick={() => handleOperator('+')}
            className="rounded-lg bg-blue-500/10 p-2 font-bold text-blue-600 hover:bg-blue-500/20 dark:text-blue-400"
          >
            +
          </button>

          {/* 0, ., = */}
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="col-span-2 rounded-lg bg-slate-50 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-700"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDecimal}
            className="rounded-lg bg-slate-50 p-2 font-semibold hover:bg-slate-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-700"
          >
            .
          </button>
          <button
            type="button"
            onClick={handleEquals}
            className="rounded-lg bg-blue-600 p-2 font-bold text-white shadow-xs hover:bg-blue-700"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
