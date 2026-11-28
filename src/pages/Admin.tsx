import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Download,
  Eye,
  FileJson,
  FilePlus2,
  HardDrive,
  History,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Trash2,
  UploadCloud,
  Users,
  X,
  XCircle,
} from 'lucide-react';
import AdminWorkspacePreview from '../components/AdminWorkspacePreview';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import ErrorAlert from '../components/ui/ErrorAlert';
import {
  createEmptyDraft,
  draftFromProblem,
  exportProblemsJson,
  parseAndValidateImport,
  slugifyProblemId,
  validateProblemDraft,
  type ImportReport,
  type ProblemFormDraft,
} from '../lib/adminProblems';
import { adminService } from '../services';
import type { AdminStats, AuditLog, Difficulty, Problem } from '../types';

type EditorViewMode = 'split' | 'form' | 'preview';

export default function Admin() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const addProblem = (problem: Problem) => setProblems(current => [problem, ...current.filter(item => item.id !== problem.id)]);
  const updateProblem = (id: string, problem: Problem) => setProblems(current => current.map(item => item.id === id ? problem : item));
  const deleteProblem = (id: string) => setProblems(current => current.filter(item => item.id !== id));
  useEffect(() => {
    const controller = new AbortController();
    void adminService.listDrafts(controller.signal).then(setProblems).catch(() => {});
    return () => controller.abort();
  }, []);
  const fileRef = useRef<HTMLInputElement>(null);
  const editorSectionRef = useRef<HTMLElement>(null);

  const [draft, setDraft] = useState<ProblemFormDraft>(createEmptyDraft);
  const [customIdTouched, setCustomIdTouched] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorView, setEditorView] = useState<EditorViewMode>('split');
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const [serverStats, setServerStats] = useState<AdminStats | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [serverConnected, setServerConnected] = useState<boolean | null>(null);

  const [banner, setBanner] = useState<{ tone: 'success' | 'error'; text: string; retryAction?: 'import' | 'export' } | null>(null);
  const [importReport, setImportReport] = useState<ImportReport | null>(null);
  const [inventoryQuery, setInventoryQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Problem | null>(null);
  const [previewModalProblem, setPreviewModalProblem] = useState<Problem | null>(null);

  const fetchServerData = useCallback(async () => {
    try {
      const [stats, logs] = await Promise.all([
        adminService.getStats(),
        adminService.getAuditLogs(50),
      ]);
      setServerStats(stats);
      setAuditLogs(logs);
      setServerConnected(true);
    } catch {
      setServerConnected(false);
    }
  }, []);

  useEffect(() => {
    void fetchServerData();
  }, [fetchServerData]);

  const validation = useMemo(
    () => validateProblemDraft(draft, problems, editingId),
    [draft, problems, editingId],
  );

  // Build a live preview problem that preserves partial example input/output while typing.
  const previewProblem = useMemo<Problem>(() => ({
    ...validation.normalized,
    title: draft.title.trim(),
    description: draft.description,
    examples: draft.examples
      .filter((ex) => ex.input.trim() || ex.output.trim() || ex.explanation.trim())
      .map((ex) => ({
        input: ex.input.trim(),
        output: ex.output.trim(),
        ...(ex.explanation.trim() ? { explanation: ex.explanation.trim() } : {}),
      })),
    constraints: draft.constraints.map((item) => item.trim()).filter(Boolean),
  }), [validation.normalized, draft]);

  const filteredInventory = useMemo(() => {
    const q = inventoryQuery.trim().toLowerCase();
    if (!q) return problems;
    return problems.filter((item) => (
      `${item.id} ${item.title} ${item.difficulty} ${item.topics.join(' ')}`.toLowerCase().includes(q)
    ));
  }, [problems, inventoryQuery]);

  // Close delete, preview, or audit modals on Escape.
  useEffect(() => {
    if (!deleteTarget && !previewModalProblem && !showAuditModal) return undefined;
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDeleteTarget(null);
        setPreviewModalProblem(null);
        setShowAuditModal(false);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [deleteTarget, previewModalProblem, showAuditModal]);

  function handleTitleChange(nextTitle: string) {
    setDraft((current) => ({
      ...current,
      title: nextTitle,
      ...(!editingId && !customIdTouched ? { id: slugifyProblemId(nextTitle) } : {}),
    }));
  }

  function handleIdChange(nextId: string) {
    setCustomIdTouched(true);
    setDraft((current) => ({ ...current, id: nextId }));
  }

  function addExampleRow() {
    setDraft((current) => ({
      ...current,
      examples: [...current.examples, { input: '', output: '', explanation: '' }],
    }));
  }

  function updateExampleRow(index: number, field: 'input' | 'output' | 'explanation', value: string) {
    setDraft((current) => ({
      ...current,
      examples: current.examples.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)),
    }));
  }

  function removeExampleRow(index: number) {
    setDraft((current) => ({
      ...current,
      examples: current.examples.filter((_, idx) => idx !== index),
    }));
  }

  function addConstraintRow() {
    setDraft((current) => ({
      ...current,
      constraints: [...current.constraints, ''],
    }));
  }

  function updateConstraintRow(index: number, value: string) {
    setDraft((current) => ({
      ...current,
      constraints: current.constraints.map((item, idx) => (idx === index ? value : item)),
    }));
  }

  function removeConstraintRow(index: number) {
    setDraft((current) => {
      const next = current.constraints.filter((_, idx) => idx !== index);
      return { ...current, constraints: next.length ? next : [''] };
    });
  }

  function startNewQuestion() {
    setEditingId(null);
    setCustomIdTouched(false);
    setDraft(createEmptyDraft());
    setShowValidationErrors(false);
  }

  function startEditQuestion(problem: Problem) {
    setEditingId(problem.id);
    setCustomIdTouched(true);
    setDraft(draftFromProblem(problem));
    setShowValidationErrors(false);
    setBanner(null);
    editorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleSaveQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validation.errors.length > 0) {
      setShowValidationErrors(true);
      setBanner({
        tone: 'error',
        text: `Fix ${validation.errors.length} validation ${validation.errors.length === 1 ? 'issue' : 'issues'} before saving.`,
      });
      return;
    }

    setIsSaving(true);
    setBanner(null);

    try {
      if (editingId) {
        const updated = await adminService.updateProblem(editingId, validation.normalized);
        updateProblem(editingId, updated);
        setBanner({
          tone: 'success',
          text: `Successfully updated “${updated.title}” (${updated.id}) in server database.`,
        });
        startNewQuestion();
      } else {
        const created = await adminService.createProblem(validation.normalized);
        addProblem(created);
        setBanner({
          tone: 'success',
          text: `Successfully created “${created.title}” (${created.id}) and saved to server database.`,
        });
        startNewQuestion();
      }
      void fetchServerData();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save question to server.';
      setBanner({
        tone: 'error',
        text: `Server error: ${message}`,
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function confirmDeleteQuestion() {
    if (!deleteTarget) return;
    const removed = deleteTarget;
    setIsDeleting(true);
    try {
      await adminService.deleteProblem(removed.id);
      deleteProblem(removed.id);
      if (editingId === removed.id) {
        startNewQuestion();
      }
      setDeleteTarget(null);
      setBanner({
        tone: 'success',
        text: `Deleted “${removed.title}” from server database.`,
      });
      void fetchServerData();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete question from server.';
      setBanner({
        tone: 'error',
        text: `Server delete error: ${message}`,
      });
    } finally {
      setIsDeleting(false);
    }
  }

  async function importFile(file?: File) {
    if (!file) return;
    setIsImporting(true);
    setBanner(null);
    try {
      const text = await file.text();
      const localReport = parseAndValidateImport(text, file.name, problems);

      if (localReport.accepted.length === 0) {
        setImportReport(localReport);
        setBanner({
          tone: 'error',
          text: `No questions could be imported from ${file.name} (${localReport.rejected.length} rejected). Review the import report below.`,
        });
        return;
      }

      const payloadProblems = localReport.accepted.map((entry) => entry.problem);
      const serverRes = await adminService.importProblems(payloadProblems, file.name);

      // Sync into client state
      serverRes.accepted.forEach((prob) => addProblem(prob));

      const combinedReport: ImportReport = {
        fileName: file.name,
        totalRows: localReport.totalRows,
        accepted: localReport.accepted,
        rejected: [
          ...localReport.rejected,
          ...serverRes.rejected.map((r) => ({
            row: r.row,
            label: r.label,
            reasons: r.reasons,
          })),
        ],
      };
      setImportReport(combinedReport);

      setBanner({
        tone: 'success',
        text: `Server batch import complete: ${serverRes.acceptedCount} imported/updated (${serverRes.rejectedCount + localReport.rejected.length} rejected) from ${file.name}.`,
      });
      void fetchServerData();
    } catch (error) {
      setBanner({
        tone: 'error',
        text: `Import failed: ${error instanceof Error ? error.message : 'Unable to read file or sync with server.'}`,
        retryAction: 'import',
      });
    } finally {
      setIsImporting(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  function handleExportJson() {
    try {
      const fileName = exportProblemsJson(problems);
      setBanner({
        tone: 'success',
        text: `Exported ${problems.length} local question${problems.length === 1 ? '' : 's'} to ${fileName}.`,
      });
    } catch (error) {
      setBanner({
        tone: 'error',
        text: `Export failed: ${error instanceof Error ? error.message : 'Could not create JSON download.'}`,
        retryAction: 'export',
      });
    }
  }

  return <div className="space-y-6">
    {/* Header */}
    <section className="page-heading-row">
      <div>
        <h2 className="page-title mt-0">Admin question editor</h2>
        <p className="page-subtitle">Create, preview, edit, delete, validate, import, and export questions with backend validation and persistence.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setShowAuditModal(true)}
          className="btn-secondary text-xs"
          title="View recent administrative audit events"
        >
          <History size={14}/> Audit trail ({serverStats?.totalAuditLogs ?? auditLogs.length})
        </button>
        <button
          type="button"
          onClick={handleExportJson}
          disabled={problems.length === 0}
          className="btn-secondary disabled:opacity-45 text-xs"
        >
          <Download size={14}/> Export JSON ({problems.length})
        </button>
        <div className="flex items-center gap-2 rounded-xl border px-3.5 py-2" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
          <ShieldCheck size={17} className="themed-link"/>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-muted">Backend API</p>
            <p className="text-[11px] font-bold text-primary flex items-center gap-1.5">
              <span className={`inline-block h-2 w-2 rounded-full ${serverConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              {serverConnected === true ? 'Connected' : (serverConnected === false ? 'Offline cache' : 'Checking...')}
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Backend Persistence & Role Notice */}
    <section className="workspace-static-banner" role="note">
      <Server size={15} className="mt-0.5 shrink-0 themed-link"/>
      <div className="min-w-0">
        <p className="text-xs font-bold text-primary">Authorized Administrator Console</p>
        <p className="mt-0.5 text-[11px] leading-5 text-muted">
          Create, preview, and import drafts. Publish reviewed questions through the repository catalog.
        </p>
      </div>
    </section>

    {/* Quick Stats */}
    <section className="grid gap-4 sm:grid-cols-3">
      <AdminStat icon={<BookOpen size={18}/>} label="Question Library" value={`${problems.length} ${problems.length === 1 ? 'problem' : 'problems'}`}/>
      <AdminStat icon={<Server size={18}/>} label="Server Database" value={serverConnected === true ? 'db.json (Active)' : (serverConnected === false ? 'Offline / Local cache' : 'Checking...')} />
      <AdminStat icon={<History size={18}/>} label="Audit Events" value={`${serverStats?.totalAuditLogs ?? auditLogs.length} actions logged`}/>
    </section>

    {/* Feedback Banner */}
    {banner && (
      banner.tone === 'error' ? (
        <ErrorAlert
          title="Local admin operation failed"
          message={banner.text}
          onRetry={
            banner.retryAction === 'import'
              ? () => fileRef.current?.click()
              : banner.retryAction === 'export'
                ? handleExportJson
                : undefined
          }
          retryLabel={banner.retryAction === 'import' ? 'Choose file again' : 'Retry export'}
          onDismiss={() => setBanner(null)}
        />
      ) : (
        <div
          role="status"
          className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200"
        >
          <CheckCircle2 size={15} className="mt-0.5 shrink-0"/>
          <span className="min-w-0 flex-1">{banner.text}</span>
          <button type="button" className="shrink-0 font-bold" onClick={() => setBanner(null)}>Dismiss</button>
        </div>
      )
    )}

    {/* Question Editor + Live Workspace Preview */}
    <section ref={editorSectionRef} className="panel-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--ca-border)' }}>
        <div className="flex items-center gap-3">
          <div className="themed-icon themed-icon-primary h-10 w-10 rounded-xl">
            {editingId ? <Pencil size={18}/> : <FilePlus2 size={18}/>}
          </div>
          <div>
            <h3 className="section-title">
              {editingId ? `Edit question · ${editingId}` : 'Create a question'}
            </h3>
            <p className="mt-0.5 text-[11px] text-muted">
              {editingId
                ? 'Editing an existing local question. Save drafts here and review catalog changes in the repository.'
                : 'Author a complete problem with examples, constraints, and live workspace preview.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {editingId && (
            <button type="button" onClick={startNewQuestion} className="btn-secondary py-1.5 text-[11px]">
              <X size={13}/> Cancel edit
            </button>
          )}
          <div className="workspace-segment-group" role="group" aria-label="Editor view mode">
            {([
              ['split', 'Split'],
              ['form', 'Editor'],
              ['preview', 'Preview'],
            ] as [EditorViewMode, string][]).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setEditorView(mode)}
                aria-pressed={editorView === mode}
                className={`workspace-segment ${editorView === mode ? 'workspace-segment-active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`mt-5 grid gap-6 ${editorView === 'split' ? 'xl:grid-cols-[1.05fr_0.95fr]' : 'grid-cols-1'}`}>
        {/* Form Pane */}
        {editorView !== 'preview' && (
          <form onSubmit={handleSaveQuestion} noValidate className="space-y-4">
            {/* Duplicate warnings */}
            {(validation.duplicateIdMatch || validation.duplicateTitleMatch) && (
              <div className="space-y-2">
                {validation.duplicateIdMatch && (
                  <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[11px] text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
                    <AlertCircle size={14} className="mt-0.5 shrink-0"/>
                    <span>
                      <strong>Duplicate ID:</strong> <code className="font-mono">{validation.normalized.id}</code> is already used by “{validation.duplicateIdMatch.title}”. Pick a unique ID before saving.
                    </span>
                  </div>
                )}
                {validation.duplicateTitleMatch && (
                  <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-[11px] text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                    <AlertTriangle size={14} className="mt-0.5 shrink-0"/>
                    <span>
                      <strong>Duplicate title warning:</strong> “{validation.duplicateTitleMatch.title}” (ID: <code className="font-mono">{validation.duplicateTitleMatch.id}</code>) already exists in your local bank.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Validation errors summary */}
            {showValidationErrors && validation.errors.length > 0 && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200" role="alert">
                <p className="font-bold">Please fix the following before saving:</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[11px]">
                  {validation.errors.map((err) => <li key={err}>{err}</li>)}
                </ul>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="form-label">
                Question title *
                <input
                  value={draft.title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  className="form-input"
                  placeholder="e.g. Merge Intervals"
                />
              </label>
              <label className="form-label">
                Question ID (slug) *
                <input
                  value={draft.id}
                  onChange={(event) => handleIdChange(event.target.value)}
                  className="form-input font-mono"
                  placeholder="e.g. merge-intervals"
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <label className="form-label">
                Difficulty *
                <select
                  value={draft.difficulty}
                  onChange={(event) => setDraft((current) => ({ ...current, difficulty: event.target.value as Difficulty }))}
                  className="form-input"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </label>
              <label className="form-label sm:col-span-2">
                Topics (comma-separated) *
                <input
                  value={draft.topicsText}
                  onChange={(event) => setDraft((current) => ({ ...current, topicsText: event.target.value }))}
                  className="form-input"
                  placeholder="Array, Sorting, Intervals"
                />
              </label>
            </div>

            <label className="form-label">
              Problem statement *
              <textarea
                value={draft.description}
                onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
                className="form-input min-h-[110px] resize-y"
                placeholder="Write a clear problem description, input format, and expected behavior..."
              />
            </label>

            {/* Repeatable Examples */}
            <div className="space-y-2.5 rounded-xl border p-3.5" style={{ borderColor: 'var(--ca-border)', background: 'color-mix(in srgb, var(--ca-surface-muted) 45%, var(--ca-surface))' }}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-primary">Examples *</p>
                  <p className="text-[10px] text-muted">Each example requires an input and expected output (explanation is optional).</p>
                </div>
                <button type="button" onClick={addExampleRow} className="btn-secondary py-1 text-[11px]">
                  <Plus size={12}/> Add example
                </button>
              </div>

              <div className="space-y-3">
                {draft.examples.map((example, index) => (
                  <div key={index} className="rounded-xl border p-3" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-primary">Example {index + 1}</span>
                      {draft.examples.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExampleRow(index)}
                          className="workspace-tc-delete-btn py-0.5 text-[10px]"
                          aria-label={`Remove example ${index + 1}`}
                        >
                          <Trash2 size={11}/> Remove
                        </button>
                      )}
                    </div>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-[10px] font-bold text-muted">Input *</span>
                        <textarea
                          rows={2}
                          value={example.input}
                          onChange={(event) => updateExampleRow(index, 'input', event.target.value)}
                          placeholder="intervals = [[1,3],[2,6],[8,10]]"
                          className="workspace-tc-textarea mt-1"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[10px] font-bold text-muted">Output *</span>
                        <textarea
                          rows={2}
                          value={example.output}
                          onChange={(event) => updateExampleRow(index, 'output', event.target.value)}
                          placeholder="[[1,6],[8,10]]"
                          className="workspace-tc-textarea mt-1"
                        />
                      </label>
                    </div>
                    <label className="mt-2 block">
                      <span className="text-[10px] font-bold text-muted">Explanation (optional)</span>
                      <input
                        type="text"
                        value={example.explanation}
                        onChange={(event) => updateExampleRow(index, 'explanation', event.target.value)}
                        placeholder="Explain why the output follows from the input..."
                        className="form-input mt-1 py-2 text-[11px]"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Repeatable Constraints */}
            <div className="space-y-2.5 rounded-xl border p-3.5" style={{ borderColor: 'var(--ca-border)', background: 'color-mix(in srgb, var(--ca-surface-muted) 45%, var(--ca-surface))' }}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-primary">Constraints</p>
                  <p className="text-[10px] text-muted">Add input size bounds and edge-case guarantees.</p>
                </div>
                <button type="button" onClick={addConstraintRow} className="btn-secondary py-1 text-[11px]">
                  <Plus size={12}/> Add constraint
                </button>
              </div>
              <div className="space-y-2">
                {draft.constraints.map((constraint, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={constraint}
                      onChange={(event) => updateConstraintRow(index, event.target.value)}
                      placeholder={`Constraint ${index + 1} (e.g. 1 <= nums.length <= 10⁴)`}
                      aria-label={`Constraint ${index + 1}`}
                      className="form-input mt-0 py-2 font-mono text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={() => removeConstraintRow(index)}
                      className="workspace-icon-button shrink-0"
                      aria-label={`Remove constraint ${index + 1}`}
                      title="Remove constraint"
                    >
                      <X size={13}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <button type="button" onClick={startNewQuestion} disabled={isSaving} className="btn-secondary disabled:opacity-50">
                {editingId ? 'Cancel edit' : 'Clear form'}
              </button>
              <button type="submit" disabled={isSaving} className="btn-primary disabled:opacity-50">
                {isSaving ? (
                  <><RefreshCw size={15} className="animate-spin"/> Saving to server...</>
                ) : editingId ? (
                  <><CheckCircle2 size={15}/> Save changes</>
                ) : (
                  <><FilePlus2 size={15}/> Save to server</>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Live Workspace Preview Pane */}
        {editorView !== 'form' && (
          <div className="min-w-0">
            <div className="mb-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                <Eye size={14} className="themed-link"/> Live workspace preview
              </span>
              <span className="text-[10px] text-muted">Matches Workspace Description pane</span>
            </div>
            <AdminWorkspacePreview problem={previewProblem}/>
          </div>
        )}
      </div>
    </section>

    {/* Import & Export Panel */}
    <section className="panel-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="themed-icon themed-icon-primary h-10 w-10 rounded-xl"><UploadCloud size={19}/></div>
          <div>
            <h3 className="section-title">Import & export local question bank</h3>
            <p className="mt-0.5 text-[11px] text-muted">Upload JSON, JSONL, or NDJSON with per-row validation, or export your current local bank as JSON.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleExportJson}
          disabled={problems.length === 0}
          className="btn-secondary disabled:opacity-45"
        >
          <Download size={14}/> Export bank (.json)
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <input ref={fileRef} type="file" accept=".json,.jsonl,.ndjson,application/json" className="hidden" onChange={(event) => importFile(event.target.files?.[0])}/>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-500/5"
          >
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-xs dark:bg-slate-800 dark:text-indigo-300"><FileJson size={21}/></span>
            <span className="text-sm font-bold text-primary">Choose a JSON or JSONL file</span>
            <span className="mt-1 text-[11px] text-muted">Each row is validated individually for required fields, examples, and duplicate IDs.</span>
            <span className="mt-3 rounded-lg bg-indigo-600 px-3 py-1.5 text-[11px] font-bold text-white">Browse files</span>
          </button>
          <div className="mt-3 rounded-xl p-3" style={{ background: 'var(--ca-surface-muted)' }}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Supported fields</p>
            <p className="mt-1 font-mono text-[10px] leading-5 text-muted">
              id, title, difficulty (Easy|Medium|Hard), topics/tags, statement/description, examples ([&#123;input, output, explanation?&#125;]), constraints
            </p>
          </div>
        </div>

        {/* Row-by-row Import Report */}
        <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--ca-border)', background: 'color-mix(in srgb, var(--ca-surface-muted) 45%, var(--ca-surface))' }}>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-primary">Import report</p>
            {importReport && (
              <button type="button" onClick={() => setImportReport(null)} className="text-[10px] font-bold themed-link">
                Clear report
              </button>
            )}
          </div>

          {importReport ? (
            <div className="mt-3 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="font-mono text-[10px] text-muted">{importReport.fileName}</span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  {importReport.accepted.length} accepted
                </span>
                <span className="rounded-full bg-rose-50 px-2.5 py-0.5 font-bold text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
                  {importReport.rejected.length} rejected
                </span>
              </div>

              <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                {importReport.accepted.map((entry) => (
                  <div key={`ok-${entry.row}-${entry.problem.id}`} className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 px-3 py-2 text-[11px] dark:border-emerald-500/20 dark:bg-emerald-500/10">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-200">
                      <CheckCircle2 size={13}/>
                      <span>Row {entry.row}: {entry.problem.title}</span>
                      <span className="ml-auto font-mono text-[10px] opacity-75">{entry.problem.id}</span>
                    </div>
                    {entry.warnings.length > 0 && (
                      <p className="mt-1 text-[10px] text-amber-700 dark:text-amber-300">
                        Note: {entry.warnings.join(' · ')}
                      </p>
                    )}
                  </div>
                ))}

                {importReport.rejected.map((entry) => (
                  <div key={`err-${entry.row}`} className="rounded-xl border border-rose-200/80 bg-rose-50/70 px-3 py-2 text-[11px] dark:border-rose-500/20 dark:bg-rose-500/10">
                    <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-200">
                      <XCircle size={13}/>
                      <span>Row {entry.row}: {entry.label}</span>
                    </div>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[10px] text-rose-700 dark:text-rose-300">
                      {entry.reasons.map((reason) => <li key={reason}>{reason}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-3 text-xs leading-5 text-muted">
              Upload a JSON or JSONL file to see a detailed row-by-row report of accepted and rejected questions along with exact validation reasons.
            </p>
          )}
        </div>
      </div>
    </section>

    {/* Full Local Question Inventory with Preview, Edit & Delete */}
    <section className="panel-card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4" style={{ borderColor: 'var(--ca-border)' }}>
        <div>
          <h3 className="section-title">Question drafts ({problems.length})</h3>
          <p className="mt-0.5 text-[11px] text-muted">Preview, edit, or delete any question stored in this browser’s demo library.</p>
        </div>
        <div className="search-field h-9 w-full sm:w-64">
          <Search size={14} className="text-slate-400"/>
          <input
            value={inventoryQuery}
            onChange={(event) => setInventoryQuery(event.target.value)}
            placeholder="Filter by title, ID, topic..."
            aria-label="Filter local question bank"
          />
        </div>
      </div>

      {filteredInventory.length ? (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredInventory.map((problem) => {
            const isEditing = editingId === problem.id;
            return (
              <div
                key={problem.id}
                className={`flex flex-wrap items-center gap-3 px-5 py-3.5 transition ${isEditing ? 'bg-indigo-50/50 dark:bg-indigo-500/10' : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/30'}`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  <BookOpen size={15}/>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-xs font-bold text-primary">{problem.title}</p>
                    <span className="font-mono text-[10px] text-muted">{problem.id}</span>
                    {isEditing && (
                      <span className="rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: 'color-mix(in srgb, var(--ca-accent-solid) 15%, var(--ca-surface))', color: 'var(--ca-accent-solid)' }}>
                        Editing
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-[10px] text-muted">
                    {problem.topics.join(' · ') || 'No topics'} · {problem.examples.length} {problem.examples.length === 1 ? 'example' : 'examples'} · {problem.constraints.length} {problem.constraints.length === 1 ? 'constraint' : 'constraints'}
                  </p>
                </div>
                <span className={`difficulty-badge ${problem.difficulty === 'Easy' ? 'difficulty-easy' : problem.difficulty === 'Medium' ? 'difficulty-medium' : 'difficulty-hard'}`}>
                  {problem.difficulty}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPreviewModalProblem(problem)}
                    className="study-action-btn h-8 px-2.5"
                    title={`Preview ${problem.title}`}
                  >
                    <Eye size={13}/> Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => startEditQuestion(problem)}
                    className={`study-action-btn h-8 px-2.5 ${isEditing ? 'study-action-btn-active' : ''}`}
                    title={`Edit ${problem.title}`}
                  >
                    <Pencil size={13}/> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(problem)}
                    className="workspace-tc-delete-btn h-8 px-2.5"
                    title={`Delete ${problem.title}`}
                  >
                    <Trash2 size={13}/> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-6 py-12 text-center">
          <p className="text-xs font-bold text-primary">
            {problems.length === 0 ? 'Your local question bank is empty' : 'No local questions match your filter'}
          </p>
          <p className="mt-1 text-[11px] text-muted">
            {problems.length === 0
              ? 'Create a question above or import a JSON/JSONL file to populate your local demo library.'
              : 'Clear the filter to see all local questions.'}
          </p>
        </div>
      )}
    </section>

    <p className="text-center text-[10px] text-muted">
      Administrative actions are secured with role authorization, server-side Zod validation, JSON database persistence, and audit logging.
    </p>

    {/* Delete Confirmation Dialog */}
    <ConfirmDialog
      open={Boolean(deleteTarget)}
      tone="danger"
      title="Delete question from server?"
      description={
        deleteTarget ? (
          <>
            This will permanently remove <strong className="text-primary">“{deleteTarget.title}”</strong> (<code className="font-mono">{deleteTarget.id}</code>) from the server database.
          </>
        ) : ''
      }
      confirmLabel={isDeleting ? 'Deleting...' : 'Delete question'}
      cancelLabel="Cancel"
      onConfirm={confirmDeleteQuestion}
      onCancel={() => setDeleteTarget(null)}
    />

    {/* Quick Preview Modal for Existing Inventory Questions */}
    {previewModalProblem && (
      <div
        className="problem-preview-backdrop"
        role="dialog"
        aria-modal="true"
        aria-label={`Workspace preview of ${previewModalProblem.title}`}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPreviewModalProblem(null);
        }}
      >
        <div className="problem-preview-drawer">
          <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: 'var(--ca-border)' }}>
            <div>
              <p className="text-xs font-bold text-primary">Workspace preview</p>
              <p className="text-[10px] text-muted">How “{previewModalProblem.title}” appears to learners</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const target = previewModalProblem;
                  setPreviewModalProblem(null);
                  startEditQuestion(target);
                }}
                className="btn-secondary py-1.5 text-[11px]"
              >
                <Pencil size={12}/> Edit
              </button>
              <button
                type="button"
                onClick={() => setPreviewModalProblem(null)}
                className="workspace-icon-button"
                aria-label="Close preview"
              >
                <X size={15}/>
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <AdminWorkspacePreview problem={previewModalProblem}/>
          </div>
        </div>
      </div>
    )}

    {/* Administrative Audit Trail Modal */}
    {showAuditModal && (
      <div
        className="problem-preview-backdrop"
        role="dialog"
        aria-modal="true"
        aria-label="Administrative Audit Trail"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowAuditModal(false);
        }}
      >
        <div className="problem-preview-drawer max-w-3xl">
          <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: 'var(--ca-border)' }}>
            <div className="flex items-center gap-2">
              <div className="themed-icon themed-icon-primary h-8 w-8 rounded-lg">
                <History size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-primary">Administrative Audit Trail</p>
                <p className="text-[10px] text-muted">Immutable log of server actions, timestamps, and authorized administrators</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAuditModal(false)}
              className="workspace-icon-button"
              aria-label="Close audit log"
            >
              <X size={15}/>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            {auditLogs.length === 0 ? (
              <div className="py-12 text-center text-muted">
                <History size={28} className="mx-auto mb-2 opacity-40" />
                <p className="text-xs font-semibold">No audit logs recorded yet</p>
                <p className="text-[11px] mt-0.5">Admin operations (creates, updates, deletes, imports) will appear here in real-time.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {auditLogs.map((log) => {
                  const actionLabels: Record<string, { label: string; tone: string }> = {
                    create_problem: { label: 'CREATE', tone: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
                    update_problem: { label: 'UPDATE', tone: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' },
                    delete_problem: { label: 'DELETE', tone: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' },
                    import_problems: { label: 'IMPORT', tone: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
                  };
                  const cfg = actionLabels[log.action] || { label: log.action.toUpperCase(), tone: 'bg-slate-500/10 text-slate-600' };

                  return (
                    <div
                      key={log.id}
                      className="rounded-xl border p-3.5 text-xs transition"
                      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold ${cfg.tone}`}>
                            {cfg.label}
                          </span>
                          <span className="font-mono text-xs font-semibold text-primary">
                            {log.targetId || 'bulk'}
                          </span>
                        </div>
                        <span className="text-[11px] text-muted">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted">
                        <span>Admin: <strong className="text-primary">{log.userEmail}</strong></span>
                        {log.ipAddress && <span>IP: <code className="font-mono text-[10px]">{log.ipAddress}</code></span>}
                      </div>

                      {log.details && Object.keys(log.details).length > 0 && (
                        <div className="mt-2 rounded-lg p-2 font-mono text-[10px]" style={{ background: 'var(--ca-surface-muted)' }}>
                          {Object.entries(log.details).map(([k, v]) => (
                            <div key={k} className="truncate">
                              <span className="text-muted">{k}:</span> <span className="text-primary">{typeof v === 'object' ? JSON.stringify(v) : String(v)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </div>;
}

function AdminStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="panel-card flex items-center gap-3 p-4">
      <div className="themed-icon themed-icon-primary h-10 w-10 rounded-xl">{icon}</div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
        <p className="mt-0.5 text-sm font-bold text-primary">{value}</p>
      </div>
    </div>
  );
}
