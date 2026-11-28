import { apiRequest } from '../lib/api';
import type { AdminImportResponse, AdminStats, AuditLog, Problem } from '../types';

export const adminService = {
  listDrafts: (signal?: AbortSignal) => apiRequest<Problem[]>('/admin/problems/drafts', { signal }),
  /**
   * Fetch system overview stats for administrative dashboard.
   */
  async getStats(): Promise<AdminStats> {
    return apiRequest<AdminStats>('/admin/stats', {
      method: 'GET',
    });
  },

  /**
   * Fetch recent audit logs recorded on the server.
   */
  async getAuditLogs(limit = 50): Promise<AuditLog[]> {
    return apiRequest<AuditLog[]>(`/admin/audit-logs?limit=${limit}`, {
      method: 'GET',
    });
  },

  /**
   * Create a problem on the server with backend validation and persistence.
   */
  async createProblem(problem: Problem): Promise<Problem> {
    return apiRequest<Problem>('/admin/problems', {
      method: 'POST',
      body: JSON.stringify(problem),
    });
  },

  /**
   * Update an existing problem on the server.
   */
  async updateProblem(id: string, problem: Problem): Promise<Problem> {
    return apiRequest<Problem>(`/admin/problems/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(problem),
    });
  },

  /**
   * Delete a problem from the server.
   */
  async deleteProblem(id: string): Promise<void> {
    await apiRequest<void>(`/admin/problems/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  },

  /**
   * Batch import problems into the server database.
   */
  async importProblems(problems: Problem[], fileName?: string): Promise<AdminImportResponse> {
    return apiRequest<AdminImportResponse>('/admin/problems/import', {
      method: 'POST',
      body: JSON.stringify({
        fileName: fileName || 'import.json',
        problems,
      }),
    });
  },
};
