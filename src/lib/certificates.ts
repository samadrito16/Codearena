import type { IssuedCertificate, VerifiedBadge } from '../types';

/**
 * Returns the official LinkedIn 1-Click "Add to Licenses & Certifications" URL.
 * See LinkedIn documentation:
 * https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=...
 */
export function getLinkedInCertAddUrl(cert: IssuedCertificate, originUrl?: string): string {
  const base = 'https://www.linkedin.com/profile/add';
  const issueDate = new Date(cert.issueDate);
  const issueYear = issueDate.getFullYear();
  const issueMonth = issueDate.getMonth() + 1;

  const appOrigin = originUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://prismcode.dev');
  const certUrl = `${appOrigin}/verify/${cert.id}`;

  const params = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: cert.title,
    organizationName: 'PrismCode',
    issueYear: String(issueYear),
    issueMonth: String(issueMonth),
    certUrl,
    certId: cert.id,
  });

  return `${base}?${params.toString()}`;
}

/**
 * Returns LinkedIn share post URL with pre-filled announcement text.
 */
export function getLinkedInSharePostUrl(shareUrl: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
}

/**
 * Returns Twitter / X share intent URL.
 */
export function getTwitterShareUrl(text: string, shareUrl: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
}

/**
 * Pre-composes a celebratory, professional announcement students can post on LinkedIn.
 */
export function generateCertificateAnnouncement(cert: IssuedCertificate, verifyUrl: string): string {
  return `🎓 Proud to share that I've earned the ${cert.title} verified certificate on PrismCode!

Key Verified Metrics:
• ${cert.metrics.solvedCount} Algorithmic Problems Solved
• ${cert.metrics.mediumCount} Medium-tier Problems Conquered
• Verifiable credential with a unique ID: ${cert.id}

Check out my official verified credential:
${verifyUrl}

#Algorithms #DataStructures #Coding #SoftwareEngineering #PrismCode #ProblemSolving #CareerGrowth`;
}

/**
 * Pre-composes an announcement for sharing an unlocked verified badge.
 */
export function generateBadgeAnnouncement(badge: VerifiedBadge, profileUrl: string): string {
  return `🏆 Just unlocked the verified "${badge.title}" badge on PrismCode!

${badge.description}
Unique Credential ID: ${badge.verificationHash || 'PRISM-VERIFIED'}

Inspect my verified solving profile:
${profileUrl}

#CompetitiveProgramming #SoftwareDevelopment #TechSkills #Algorithms`;
}

/**
 * Returns color classes and styling based on badge tier.
 */
export function getBadgeTierClasses(tier: string) {
  switch (tier.toLowerCase()) {
    case 'diamond':
      return {
        border: 'border-cyan-500/40 hover:border-cyan-400',
        bg: 'bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-indigo-500/15',
        text: 'text-cyan-400 dark:text-cyan-300',
        badgePill: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
      };
    case 'platinum':
      return {
        border: 'border-purple-500/40 hover:border-purple-400',
        bg: 'bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-violet-500/15',
        text: 'text-purple-400 dark:text-purple-300',
        badgePill: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
      };
    case 'gold':
      return {
        border: 'border-amber-500/40 hover:border-amber-400',
        bg: 'bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-orange-500/15',
        text: 'text-amber-400 dark:text-amber-300',
        badgePill: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      };
    case 'silver':
      return {
        border: 'border-slate-400/40 hover:border-slate-300',
        bg: 'bg-gradient-to-br from-slate-400/15 via-slate-500/10 to-gray-500/15',
        text: 'text-slate-300 dark:text-slate-200',
        badgePill: 'bg-slate-400/20 text-slate-300 border-slate-400/30',
        glow: 'shadow-[0_0_15px_rgba(148,163,184,0.1)]',
      };
    case 'bronze':
    default:
      return {
        border: 'border-amber-700/40 hover:border-amber-600',
        bg: 'bg-gradient-to-br from-amber-800/15 via-stone-700/10 to-amber-900/15',
        text: 'text-amber-600 dark:text-amber-500',
        badgePill: 'bg-amber-700/20 text-amber-600 border-amber-700/30',
        glow: 'shadow-[0_0_15px_rgba(180,83,9,0.1)]',
      };
  }
}
