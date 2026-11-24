import React, { useState } from 'react';
import { Calculator, Delete, X } from 'lucide-react';

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
      default:
        res = val;
    }
    setDisplay(isNaN(res) ? 'Error' : String(Math.round(res * 100000000) / 100000000));
    setClearOnNext(true);
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

  const sciBtnStyle = {
    borderColor: 'var(--ca-border)',
    backgroundColor: 'var(--ca-surface-muted)',
    color: 'var(--ca-text)',
  };

  const numBtnStyle = {
    borderColor: 'var(--ca-border)',
    backgroundColor: 'var(--ca-surface)',
    color: 'var(--ca-text)',
  };

  const opBtnStyle = {
    borderColor: 'var(--ca-border)',
    backgroundColor: 'color-mix(in srgb, var(--ca-accent-solid) 10%, var(--ca-surface-muted))',
  };

  return (
    <div
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: 'var(--ca-surface)',
        borderColor: 'var(--ca-border)',
        color: 'var(--ca-text)',
      }}
      className="fixed z-50 w-72 select-none rounded-2xl border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Draggable Header */}
      <div
        onMouseDown={onMouseDownHeader}
        className="flex cursor-grab active:cursor-grabbing items-center justify-between border-b px-3 py-2 text-xs font-semibold"
        style={{
          borderColor: 'var(--ca-border)',
          backgroundColor: 'var(--ca-surface-muted)',
        }}
      >
        <div className="flex items-center gap-1.5 text-primary">
          <Calculator size={14} className="text-indigo-400" />
          <span>TCS iON Virtual Calculator</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-0.5 text-muted hover:text-primary transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Calculator Screen */}
      <div className="bg-black/90 p-3 text-right font-mono text-white">
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
            style={sciBtnStyle}
            className="rounded-lg border p-1.5 font-semibold hover:opacity-80 transition-colors"
          >
            sin
          </button>
          <button
            type="button"
            onClick={() => handleFunction('cos')}
            style={sciBtnStyle}
            className="rounded-lg border p-1.5 font-semibold hover:opacity-80 transition-colors"
          >
            cos
          </button>
          <button
            type="button"
            onClick={() => handleFunction('tan')}
            style={sciBtnStyle}
            className="rounded-lg border p-1.5 font-semibold hover:opacity-80 transition-colors"
          >
            tan
          </button>
          <button
            type="button"
            onClick={() => handleFunction('sqrt')}
            style={sciBtnStyle}
            className="rounded-lg border p-1.5 font-semibold hover:opacity-80 transition-colors"
          >
            √x
          </button>
        </div>

        {/* Scientific Row 2 */}
        <div className="grid grid-cols-4 gap-1">
          <button
            type="button"
            onClick={() => handleFunction('log')}
            style={sciBtnStyle}
            className="rounded-lg border p-1.5 font-semibold hover:opacity-80 transition-colors"
          >
            log
          </button>
          <button
            type="button"
            onClick={() => handleFunction('ln')}
            style={sciBtnStyle}
            className="rounded-lg border p-1.5 font-semibold hover:opacity-80 transition-colors"
          >
            ln
          </button>
          <button
            type="button"
            onClick={() => handleFunction('sqr')}
            style={sciBtnStyle}
            className="rounded-lg border p-1.5 font-semibold hover:opacity-80 transition-colors"
          >
            x²
          </button>
          <button
            type="button"
            onClick={() => handleOperator('x^y')}
            style={sciBtnStyle}
            className="rounded-lg border p-1.5 font-semibold hover:opacity-80 transition-colors"
          >
            xʸ
          </button>
        </div>

        {/* Numbers & Standard Ops */}
        <div
          className="grid grid-cols-4 gap-1 pt-1 border-t"
          style={{ borderColor: 'var(--ca-border)' }}
        >
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg bg-rose-500/15 border border-rose-500/30 p-2 font-bold text-rose-500 hover:bg-rose-500/25"
          >
            C
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            style={sciBtnStyle}
            className="rounded-lg border p-2 font-semibold hover:opacity-80 flex items-center justify-center"
          >
            <Delete size={14} />
          </button>
          <button
            type="button"
            onClick={handleNegate}
            style={sciBtnStyle}
            className="rounded-lg border p-2 font-semibold hover:opacity-80"
          >
            ±
          </button>
          <button
            type="button"
            onClick={() => handleOperator('÷')}
            style={opBtnStyle}
            className="rounded-lg border p-2 font-bold text-indigo-400 hover:opacity-80"
          >
            ÷
          </button>

          {/* 7, 8, 9, × */}
          <button
            type="button"
            onClick={() => handleDigit('7')}
            style={numBtnStyle}
            className="rounded-lg border p-2 font-semibold hover:opacity-80"
          >
            7
          </button>
          <button
            type="button"
            onClick={() => handleDigit('8')}
            style={numBtnStyle}
            className="rounded-lg border p-2 font-semibold hover:opacity-80"
          >
            8
          </button>
          <button
            type="button"
            onClick={() => handleDigit('9')}
            style={numBtnStyle}
            className="rounded-lg border p-2 font-semibold hover:opacity-80"
          >
            9
          </button>
          <button
            type="button"
            onClick={() => handleOperator('×')}
            style={opBtnStyle}
            className="rounded-lg border p-2 font-bold text-indigo-400 hover:opacity-80"
          >
            ×
          </button>

          {/* 4, 5, 6, - */}
          <button
            type="button"
            onClick={() => handleDigit('4')}
            style={numBtnStyle}
            className="rounded-lg border p-2 font-semibold hover:opacity-80"
          >
            4
          </button>
          <button
            type="button"
            onClick={() => handleDigit('5')}
            style={numBtnStyle}
            className="rounded-lg border p-2 font-semibold hover:opacity-80"
          >
            5
          </button>
          <button
            type="button"
            onClick={() => handleDigit('6')}
            style={numBtnStyle}
            className="rounded-lg border p-2 font-semibold hover:opacity-80"
          >
            6
          </button>
          <button
            type="button"
            onClick={() => handleOperator('-')}
            style={opBtnStyle}
            className="rounded-lg border p-2 font-bold text-indigo-400 hover:opacity-80"
          >
            -
          </button>

          {/* 1, 2, 3, + */}
          <button
            type="button"
            onClick={() => handleDigit('1')}
            style={numBtnStyle}
            className="rounded-lg border p-2 font-semibold hover:opacity-80"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => handleDigit('2')}
            style={numBtnStyle}
            className="rounded-lg border p-2 font-semibold hover:opacity-80"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => handleDigit('3')}
            style={numBtnStyle}
            className="rounded-lg border p-2 font-semibold hover:opacity-80"
          >
            3
          </button>
          <button
            type="button"
            onClick={() => handleOperator('+')}
            style={opBtnStyle}
            className="rounded-lg border p-2 font-bold text-indigo-400 hover:opacity-80"
          >
            +
          </button>

          {/* 0, ., = */}
          <button
            type="button"
            onClick={() => handleDigit('0')}
            style={numBtnStyle}
            className="col-span-2 rounded-lg border p-2 font-semibold hover:opacity-80"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDecimal}
            style={numBtnStyle}
            className="rounded-lg border p-2 font-semibold hover:opacity-80"
          >
            .
          </button>
          <button
            type="button"
            onClick={handleEquals}
            className="rounded-lg bg-indigo-600 hover:bg-indigo-500 p-2 font-bold text-white shadow-xs"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
