import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ApiError, apiRequest } from '../lib/api';
import type { LearningModule, LearningPath } from '../services/learningPathsService';

interface Entry {
  slug: string;
  revision: number;
  publishedRevision: number | null;
  version: number;
  draft: LearningPath;
}
interface History {
  revisions: { number: number; createdAt: string }[];
}

const endpoint = '/admin/learning-paths';
const emptyModule = (order: number): LearningModule => ({
  id: '', order, title: '', summary: '', concepts: [], problemIds: [], topicTags: [],
});
const emptyPath: LearningPath = {
  id: '', order: 1, title: '', subtitle: '', description: '',
  topics: [], estimatedHours: '', accent: 'a', modules: [emptyModule(1)],
};
const slugPattern = '[a-z0-9]+(-[a-z0-9]+)*';
const errorText = (error: unknown) => error instanceof Error ? error.message : 'Something went wrong. Try again.';

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid gap-1 text-sm font-medium text-primary">{label}{children}</label>;
}

const fieldStyle = 'form-input';

export default function LearningPathAdmin() {
  const [entries, setEntries] = useState<Entry[]>();
  const [entry, setEntry] = useState<Entry>();
  const [history, setHistory] = useState<History>();
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [unconfigured, setUnconfigured] = useState(false);
  const [formVersion, setFormVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<Entry[]>(endpoint, { signal: controller.signal, silent: true }).then(setEntries).catch(failure => {
      if (controller.signal.aborted) return;
      if (failure instanceof ApiError && failure.code === 'CONTENT_UNAVAILABLE') setUnconfigured(true);
      else setError(errorText(failure));
    });
    return () => controller.abort();
  }, []);

  function select(next?: Entry) {
    setEntry(next);
    setHistory(undefined);
    setDirty(false);
    setError('');
    setNotice('');
    setFormVersion(version => version + 1);
  }

  async function run(operation: () => Promise<void>) {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await operation();
    } catch (failure) {
      setError(errorText(failure));
    } finally {
      setBusy(false);
    }
  }

  async function reload(slug?: string) {
    const latest = await apiRequest<Entry[]>(endpoint);
    setEntries(latest);
    select(latest.find(item => item.slug === slug));
  }

  function save(action: 'save' | 'publish' | 'archive' | 'restore', body?: LearningPath, revision?: number) {
    const slug = entry?.slug ?? body?.id;
    if (!slug) return;
    if (action === 'archive' && !window.confirm('Hide this learning path from learners? You can publish it again later.')) return;
    void run(async () => {
      await apiRequest<void>(`${endpoint}/${encodeURIComponent(slug)}`, {
        method: 'POST',
        body: JSON.stringify({ action, body, revision, expectedVersion: entry?.version ?? 0 }),
      });
      await reload(slug);
      setNotice({ save: 'Draft saved.', publish: 'Learning path published.', archive: 'Learning path archived.', restore: 'Revision restored as a draft.' }[action]);
    });
  }

  return (
    <section className="panel-card space-y-4 p-5 sm:p-6">
      <h3 className="section-title">Learning paths</h3>
      {error && <p className="text-sm text-rose-600 dark:text-rose-400" role="alert">{error}</p>}
      {notice && <p className="text-sm text-emerald-700 dark:text-emerald-300" role="status">{notice}</p>}
      {unconfigured ? <p className="text-sm text-muted">Connect PostgreSQL to manage learning paths.</p> : entries ? (
        <fieldset disabled={busy} className="space-y-4">
          <div className="flex flex-wrap items-end gap-3">
            <Field label="Select a path">
              <select className={fieldStyle} value={entry?.slug ?? ''} disabled={dirty}
                onChange={event => select(entries.find(item => item.slug === event.target.value))}>
                <option value="">New learning path</option>
                {entries.map(item => <option key={item.slug} value={item.slug}>
                  {item.draft.title} ({item.publishedRevision === null ? 'Unpublished' : 'Published'})
                </option>)}
              </select>
            </Field>
            <button className="btn-secondary" type="button" onClick={() => {
              if (!dirty || window.confirm('Discard unsaved edits and reload?')) void run(() => reload(entry?.slug));
            }}>Reload</button>
            {dirty && <button className="btn-secondary" type="button" onClick={() => select(entry)}>Discard edits</button>}
          </div>
          <LearningPathForm key={formVersion} value={entry?.draft ?? emptyPath} readOnlyId={!!entry}
            onChange={() => setDirty(true)} onSave={value => save('save', value)} saveDisabled={!dirty} />
          {entry && <div className="flex flex-wrap gap-2">
            <button className="btn-primary" type="button" disabled={dirty || entry.publishedRevision === entry.revision} onClick={() => save('publish')}>Publish draft</button>
            {entry.publishedRevision !== null && <button className="btn-secondary" type="button" disabled={dirty} onClick={() => save('archive')}>Archive</button>}
            <button className="btn-secondary" type="button" onClick={() => void run(async () => {
              setHistory(await apiRequest<History>(`${endpoint}/${encodeURIComponent(entry.slug)}/history`));
            })}>Revision history</button>
          </div>}
          {entry && <details className="rounded-xl border p-3">
            <summary className="cursor-pointer text-sm font-semibold text-primary">Preview saved draft</summary>
            <div className="mt-3 space-y-2 text-sm">
              <h4 className="font-semibold text-primary">{entry.draft.title}</h4>
              <p className="text-muted">{entry.draft.subtitle} · {entry.draft.estimatedHours}</p>
              <p className="whitespace-pre-wrap text-primary">{entry.draft.description}</p>
              <ol className="list-decimal space-y-2 pl-5 text-primary">
                {[...entry.draft.modules].sort((a, b) => a.order - b.order).map(module => (
                  <li key={module.id}>
                    <strong>{module.title}</strong>
                    <p className="text-muted">{module.summary}</p>
                  </li>
                ))}
              </ol>
            </div>
          </details>}
          {history && <ul className="space-y-2">
            {history.revisions.map(item => <li key={item.number} className="flex flex-wrap items-center gap-2 text-sm">
              Revision {item.number} · {new Date(item.createdAt).toLocaleString()}
              {item.number === entry?.publishedRevision && <span className="text-muted">Published</span>}
              <button className="btn-secondary" type="button" disabled={dirty || item.number === entry?.revision}
                onClick={() => save('restore', undefined, item.number)}>Restore as draft</button>
            </li>)}
          </ul>}
        </fieldset>
      ) : error ? (
        <button className="btn-secondary" type="button" disabled={busy} onClick={() => void run(() => reload())}>Retry</button>
      ) : <p role="status" className="text-sm text-muted">Loading learning paths…</p>}
    </section>
  );
}

function LearningPathForm({ value, readOnlyId, onSave, onChange, saveDisabled }: {
  value: LearningPath;
  readOnlyId: boolean;
  onSave: (value: LearningPath) => void;
  onChange: () => void;
  saveDisabled: boolean;
}) {
  const [modules, setModules] = useState(() => value.modules.map((data, id) => ({ id, data })));
  const [nextId, setNextId] = useState(modules.length);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const read = (name: string) => String(fields.get(name) ?? '').trim();
    const list = (name: string) => read(name).split(',').map(item => item.trim()).filter(Boolean);
    onSave({
      id: read('id'), title: read('title'), subtitle: read('subtitle'), order: Number(read('order')),
      description: read('description'), topics: list('topics'), estimatedHours: read('estimatedHours'),
      accent: read('accent') as LearningPath['accent'],
      modules: modules.map(({ id }) => ({
        id: read(`id-${id}`), order: Number(read(`order-${id}`)), title: read(`title-${id}`),
        summary: read(`summary-${id}`), concepts: list(`concepts-${id}`),
        problemIds: list(`problems-${id}`), topicTags: list(`tags-${id}`),
      })),
    });
  }

  return (
    <form className="space-y-3" onSubmit={submit} onChange={onChange}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Path ID"><input className={fieldStyle} name="id" required pattern={slugPattern} readOnly={readOnlyId} defaultValue={value.id} /></Field>
        <Field label="Title"><input className={fieldStyle} name="title" required defaultValue={value.title} /></Field>
        <Field label="Subtitle"><input className={fieldStyle} name="subtitle" required defaultValue={value.subtitle} /></Field>
        <Field label="Estimated time"><input className={fieldStyle} name="estimatedHours" required defaultValue={value.estimatedHours} /></Field>
        <Field label="Display order"><input className={fieldStyle} name="order" type="number" min={1} required defaultValue={value.order} /></Field>
        <Field label="Accent"><select className={fieldStyle} name="accent" defaultValue={value.accent}>
          <option value="a">A</option><option value="b">B</option><option value="c">C</option>
        </select></Field>
        <Field label="Topics (comma separated)"><input className={fieldStyle} name="topics" defaultValue={value.topics.join(', ')} /></Field>
      </div>
      <Field label="Description"><textarea className={fieldStyle} name="description" required defaultValue={value.description} /></Field>
      {modules.map(({ id, data }, index) => (
        <fieldset className="grid gap-3 rounded-xl border p-3 sm:grid-cols-2" key={id}>
          <legend className="px-1 text-sm font-semibold text-primary">Module {index + 1}</legend>
          <Field label="Module ID"><input className={fieldStyle} name={`id-${id}`} required pattern={slugPattern} defaultValue={data.id} /></Field>
          <Field label="Title"><input className={fieldStyle} name={`title-${id}`} required defaultValue={data.title} /></Field>
          <Field label="Summary"><textarea className={fieldStyle} name={`summary-${id}`} required defaultValue={data.summary} /></Field>
          <Field label="Display order"><input className={fieldStyle} name={`order-${id}`} type="number" min={1} required defaultValue={data.order} /></Field>
          <Field label="Concepts (comma separated)"><input className={fieldStyle} name={`concepts-${id}`} defaultValue={data.concepts.join(', ')} /></Field>
          <Field label="Practice problem IDs (comma separated)"><input className={fieldStyle} name={`problems-${id}`} defaultValue={data.problemIds.join(', ')} /></Field>
          <Field label="Topic tags (comma separated)"><input className={fieldStyle} name={`tags-${id}`} defaultValue={data.topicTags.join(', ')} /></Field>
          <button className="btn-secondary justify-self-start" type="button" disabled={modules.length === 1} onClick={() => {
            setModules(current => current.filter(module => module.id !== id));
            onChange();
          }}>Remove module</button>
        </fieldset>
      ))}
      <div className="flex flex-wrap gap-2">
        <button className="btn-secondary" type="button" onClick={event => {
          const form = event.currentTarget.form;
          if (!form) return;
          const fields = new FormData(form);
          const order = Math.max(0, ...modules.map(module => Number(fields.get(`order-${module.id}`)) || 0)) + 1;
          setModules(current => [...current, { id: nextId, data: emptyModule(order) }]);
          setNextId(nextId + 1);
          onChange();
        }}>Add module</button>
        <button className="btn-secondary" type="submit" disabled={saveDisabled}>Save draft</button>
      </div>
    </form>
  );
}
