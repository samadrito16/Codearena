import { useAsyncResource } from '../../hooks/useAsyncResource';
import { apiRequest } from '../../lib/api';
import type { CompanyAssessment } from '../../types/placement';

export function usePlacementAssessments() {
  return useAsyncResource<CompanyAssessment[]>(signal => apiRequest('/placement', { signal }), []);
}
