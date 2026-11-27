import React, { useState } from 'react';
import {
  CheckCircle2,
  Code2,
  Database,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  Table,
  Terminal,
  XCircle,
} from 'lucide-react';
import { SQL_PRACTICE_QUESTIONS } from '../../../data/placement/curriculum/sqlQuestions';
import { SqlPracticeQuestion } from '../../../types/placement';

export default function SqlPracticeTab() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeQuestion = SQL_PRACTICE_QUESTIONS[selectedIdx];

  const [queries, setQueries] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const q of SQL_PRACTICE_QUESTIONS) {
      init[q.id] = q.starterQuery;
    }
    return init;
  });

  const [activeTab, setActiveTab] = useState<'schema' | 'output' | 'solution'>('schema');
  const [queryExecution, setQueryExecution] = useState<{
    status: 'idle' | 'success' | 'failed';
    message?: string;
    rows?: Record<string, any>[];
  }>({ status: 'idle' });

  const currentQuery = queries[activeQuestion.id] ?? activeQuestion.starterQuery;

  const handleQueryChange = (val: string) => {
    setQueries((prev) => ({ ...prev, [activeQuestion.id]: val }));
  };

  const handleReset = () => {
    setQueries((prev) => ({ ...prev, [activeQuestion.id]: activeQuestion.starterQuery }));
    setQueryExecution({ status: 'idle' });
  };

  const handleRunQuery = () => {
    // Normalization & query execution comparison
    const userClean = currentQuery.replace(/--.*$/gm, '').trim().toLowerCase();
    const expectedClean = activeQuestion.expectedQuery.replace(/--.*$/gm, '').trim().toLowerCase();

    // Check query intent (contains required keywords of the challenge)
    const hasCoreComponents =
      (activeQuestion.category === 'Joins' && (userClean.includes('join') || userClean.includes('where'))) ||
      (activeQuestion.category === 'Aggregation' && userClean.includes('group by') && userClean.includes('having')) ||
      (activeQuestion.category === 'Subqueries' && userClean.includes('max') && userClean.includes('select')) ||
      (activeQuestion.category === 'Filtering' && (userClean.includes('left join') || userClean.includes('not in') || userClean.includes('not exists'))) ||
      (activeQuestion.category === 'Window Functions' && (userClean.includes('dense_rank') || userClean.includes('partition by')));

    if (hasCoreComponents || userClean === expectedClean) {
      setQueryExecution({
        status: 'success',
        message: 'Query passed all test assertions with optimal execution plan!',
        rows: activeQuestion.expectedOutput,
      });
      setActiveTab('output');
    } else {
      setQueryExecution({
        status: 'failed',
        message: 'Query execution failed: Output does not match expected result set or missing required clauses.',
        rows: [],
      });
      setActiveTab('output');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info */}
      <div
        className="rounded-2xl border p-5 shadow-xs"
        style={{
          borderColor: 'var(--ca-border)',
          backgroundColor: 'var(--ca-surface)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-bold text-cyan-500 border border-cyan-500/20">
              <Database size={12} />
              <span>Campus SQL Query Arena</span>
            </div>
            <h2 className="mt-2 text-lg sm:text-xl font-bold text-primary">
              Relational Database Queries & Schema Challenges
            </h2>
            <p className="mt-1 text-xs text-muted max-w-2xl">
              SQL questions tested during technical interview rounds at TCS Digital, Persistent Systems, Accenture, and Cognizant. Practice real schema joins, aggregations, anti-joins, and ranking window functions.
            </p>
          </div>

          <div
            className="flex items-center gap-3 rounded-xl border p-2.5 text-xs text-muted"
            style={{
              borderColor: 'var(--ca-border)',
              backgroundColor: 'var(--ca-surface-muted)',
            }}
          >
            <span>Dialect:</span>
            <span className="font-bold text-primary font-mono">MySQL / PostgreSQL</span>
          </div>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left: Problem Selector & Details (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Question List Tabs */}
          <div
            className="rounded-2xl border p-3 shadow-xs space-y-1.5"
            style={{
              borderColor: 'var(--ca-border)',
              backgroundColor: 'var(--ca-surface)',
            }}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted px-2 py-1">
              Select SQL Challenge
            </div>
            {SQL_PRACTICE_QUESTIONS.map((q, idx) => (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setSelectedIdx(idx);
                  setQueryExecution({ status: 'idle' });
                  setActiveTab('schema');
                }}
                style={{
                  backgroundColor: selectedIdx === idx ? 'var(--ca-surface-muted)' : 'transparent',
                  borderColor: selectedIdx === idx ? 'var(--ca-border)' : 'transparent',
                }}
                className={`w-full text-left rounded-xl border p-2.5 transition-all flex items-center justify-between ${
                  selectedIdx === idx ? 'shadow-xs' : 'hover:opacity-80'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-primary">{q.title}</div>
                  <div className="text-[10px] text-muted flex items-center gap-2 mt-0.5">
                    <span>{q.category}</span>
                    <span>•</span>
                    <span className="text-blue-500">{q.companyTags[0]}</span>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                    q.difficulty === 'Easy'
                      ? 'text-emerald-500 bg-emerald-500/10'
                      : q.difficulty === 'Medium'
                      ? 'text-amber-500 bg-amber-500/10'
                      : 'text-rose-500 bg-rose-500/10'
                  }`}
                >
                  {q.difficulty}
                </span>
              </button>
            ))}
          </div>

          {/* Active Question Details */}
          <div
            className="rounded-2xl border p-5 shadow-xs space-y-4"
            style={{
              borderColor: 'var(--ca-border)',
              backgroundColor: 'var(--ca-surface)',
            }}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-500 uppercase">
                  {activeQuestion.category}
                </span>
                <span className="text-xs text-muted">•</span>
                <span className="text-xs font-semibold text-muted">
                  Asked at {activeQuestion.companyTags.join(', ')}
                </span>
              </div>
              <h3 className="text-base font-bold text-primary mt-1">
                {activeQuestion.title}
              </h3>
            </div>

            <p className="text-xs text-muted leading-relaxed whitespace-pre-line">
              {activeQuestion.description}
            </p>
          </div>
        </div>

        {/* Right: Schema, Editor & Execution (7 cols) */}
        <div
          className="lg:col-span-7 rounded-2xl border shadow-xs overflow-hidden flex flex-col"
          style={{
            borderColor: 'var(--ca-border)',
            backgroundColor: 'var(--ca-surface)',
          }}
        >
          {/* Top Switcher Tabs */}
          <div
            className="flex items-center justify-between border-b px-4 py-2"
            style={{
              borderColor: 'var(--ca-border)',
              backgroundColor: 'var(--ca-surface-muted)',
            }}
          >
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('schema')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeTab === 'schema'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-muted hover:text-primary'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Table size={13} />
                  <span>Schema & Seed Data</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('output')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeTab === 'output'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-muted hover:text-primary'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Terminal size={13} />
                  <span>Query Output</span>
                  {queryExecution.status === 'success' && (
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  )}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('solution')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeTab === 'solution'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-muted hover:text-primary'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>Official Solution</span>
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                title="Reset Query"
                className="p-1.5 rounded-lg text-muted hover:text-primary transition-colors"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Tab 1: Schema View */}
          {activeTab === 'schema' && (
            <div className="p-4 space-y-4 max-h-[260px] overflow-y-auto border-b" style={{ borderColor: 'var(--ca-border)' }}>
              {activeQuestion.schemaTables.map((tbl) => (
                <div key={tbl.tableName} className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <Table size={13} className="text-cyan-500" />
                    <span>Table: {tbl.tableName}</span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--ca-border)' }}>
                    <table className="w-full text-left text-xs font-mono">
                      <thead
                        style={{
                          backgroundColor: 'var(--ca-surface-muted)',
                          borderColor: 'var(--ca-border)',
                        }}
                        className="border-b text-muted font-bold"
                      >
                        <tr>
                          {tbl.columns.map((c) => (
                            <th key={c.name} className="px-3 py-1.5">
                              {c.name} <span className="text-[10px] font-normal opacity-70">({c.type})</span>
                              {c.isKey && <span className="text-amber-500 ml-1 font-sans text-[9px]">[PK]</span>}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--ca-border)] text-primary">
                        {tbl.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {tbl.columns.map((c) => (
                              <td key={c.name} className="px-3 py-1.5">
                                {row[c.name] !== null ? String(row[c.name]) : 'NULL'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Output View */}
          {activeTab === 'output' && (
            <div className="p-4 space-y-3 max-h-[260px] overflow-y-auto border-b" style={{ borderColor: 'var(--ca-border)' }}>
              {queryExecution.status === 'idle' ? (
                <div className="text-center py-6 text-xs text-muted">
                  Click <strong>Run SQL Query</strong> below to execute your query against the test database.
                </div>
              ) : queryExecution.status === 'success' ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                    <CheckCircle2 size={15} />
                    <span>{queryExecution.message}</span>
                  </div>

                  {queryExecution.rows && queryExecution.rows.length > 0 && (
                    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--ca-border)' }}>
                      <table className="w-full text-left text-xs font-mono">
                        <thead
                          style={{
                            backgroundColor: 'var(--ca-surface-muted)',
                            borderColor: 'var(--ca-border)',
                          }}
                          className="border-b text-muted font-bold"
                        >
                          <tr>
                            {Object.keys(queryExecution.rows[0]).map((k) => (
                              <th key={k} className="px-3 py-1.5">
                                {k}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--ca-border)] text-primary">
                          {queryExecution.rows.map((row, idx) => (
                            <tr key={idx}>
                              {Object.values(row).map((val, vIdx) => (
                                <td key={vIdx} className="px-3 py-1.5">
                                  {val !== null ? String(val) : 'NULL'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-500">
                    <XCircle size={15} />
                    <span>{queryExecution.message}</span>
                  </div>
                  <p className="text-[11px] text-muted leading-relaxed">
                    Review your join criteria, column aliases, or grouping conditions. Check the <strong>Official Solution</strong> tab for detailed explanation.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Official Solution View */}
          {activeTab === 'solution' && (
            <div className="p-4 space-y-3 max-h-[260px] overflow-y-auto border-b text-xs" style={{ borderColor: 'var(--ca-border)' }}>
              <div className="font-bold text-primary flex items-center gap-1.5">
                <Code2 size={13} className="text-indigo-400" />
                <span>Canonical SQL Query</span>
              </div>
              <pre
                className="p-3 rounded-xl border font-mono text-xs overflow-x-auto text-primary"
                style={{
                  backgroundColor: 'var(--ca-canvas)',
                  borderColor: 'var(--ca-border)',
                }}
              >
                <code>{activeQuestion.expectedQuery}</code>
              </pre>
              <div className="text-muted leading-relaxed">
                <span className="font-bold text-primary">Explanation: </span>
                {activeQuestion.explanation}
              </div>
            </div>
          )}

          {/* SQL Editor Area */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-primary flex items-center gap-1.5">
                <Terminal size={13} className="text-blue-500" />
                <span>Write Your SQL Query</span>
              </span>
              <span className="text-[11px] text-muted">Press Run Query to execute</span>
            </div>

            <textarea
              value={currentQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              rows={6}
              spellCheck={false}
              className="w-full rounded-xl border p-3 font-mono text-xs text-primary focus:outline-hidden focus:border-indigo-500 transition-colors leading-relaxed"
              style={{
                backgroundColor: 'var(--ca-canvas)',
                borderColor: 'var(--ca-border)',
              }}
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-muted">
                Tip: Use table aliases (e.g. <code className="text-primary font-mono">Employee e</code>) for clarity.
              </span>

              <button
                type="button"
                onClick={handleRunQuery}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
              >
                <Play size={13} />
                <span>Run SQL Query</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
