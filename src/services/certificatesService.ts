import { apiRequest } from '../lib/api';
import type { CertificateTrack, IssuedCertificate, PublicProfileData } from '../types';

export interface MyCertificatesResponse {
  issued: IssuedCertificate[];
  tracks: CertificateTrack[];
}

export interface VerifyCertificateResponse {
  certificate: IssuedCertificate;
  isValid: boolean;
  recipient: {
    name: string;
    handle: string;
    id: string;
  };
  verificationUrl: string;
  issuer: {
    organization: string;
    division: string;
    verificationStandard: string;
  };
}

export async function fetchMyCertificates(): Promise<MyCertificatesResponse> {
  return apiRequest<MyCertificatesResponse>('/certificates/my');
}

export async function claimCertificate(trackId: string): Promise<IssuedCertificate> {
  return apiRequest<IssuedCertificate>('/certificates/claim', {
    method: 'POST',
    body: JSON.stringify({ trackId }),
  });
}

export async function verifyCertificate(certId: string): Promise<VerifyCertificateResponse> {
  return apiRequest<VerifyCertificateResponse>(`/certificates/verify/${encodeURIComponent(certId)}`, {
    silent: true,
  });
}

export async function fetchPublicProfile(identifier: string): Promise<PublicProfileData> {
  return apiRequest<PublicProfileData>(`/public/profile/${encodeURIComponent(identifier)}`, {
    silent: true,
  });
}
