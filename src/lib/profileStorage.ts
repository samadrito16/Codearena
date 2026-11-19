import { readStorage, removeStorage, writeStorage } from './storage';
import type { AvatarColorId, AvatarMode, LocalProfile, PrivacySettings, ProfileVisibility } from '../types';

export const PROFILE_STORAGE_KEY = 'codearena-local-profile';
export const PRIVACY_STORAGE_KEY = 'codearena-privacy-settings';
export const MAX_DISPLAY_NAME_LENGTH = 50;
export const MAX_BIO_LENGTH = 180;
export const MAX_AVATAR_IMAGE_LENGTH = 200_000;

export const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
  profileVisibility: 'public',
  showEmail: true,
  showAffiliation: true,
  showLocation: true,
  showLocalTime: true,
  showSocials: true,
  showHeatmap: true,
  showSolvedProblems: true,
  showAchievements: true,
};

export interface AvatarColorPreset {
  id: AvatarColorId;
  label: string;
  gradient: string;
  banner: string;
}

export const AVATAR_COLOR_PRESETS: AvatarColorPreset[] = [
  {
    id: 'indigo',
    label: 'Indigo',
    gradient: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    banner: 'linear-gradient(135deg, rgba(79, 70, 229, 0.24), rgba(124, 58, 237, 0.14))',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    gradient: 'linear-gradient(135deg, #059669, #14b8a6)',
    banner: 'linear-gradient(135deg, rgba(5, 150, 105, 0.24), rgba(20, 184, 166, 0.14))',
  },
  {
    id: 'cyan',
    label: 'Ocean',
    gradient: 'linear-gradient(135deg, #0284c7, #06b6d4)',
    banner: 'linear-gradient(135deg, rgba(2, 132, 199, 0.24), rgba(6, 182, 212, 0.14))',
  },
  {
    id: 'amber',
    label: 'Amber',
    gradient: 'linear-gradient(135deg, #d97706, #f59e0b)',
    banner: 'linear-gradient(135deg, rgba(217, 119, 6, 0.24), rgba(245, 158, 11, 0.14))',
  },
  {
    id: 'rose',
    label: 'Rose',
    gradient: 'linear-gradient(135deg, #e11d48, #f43f5e)',
    banner: 'linear-gradient(135deg, rgba(225, 29, 72, 0.24), rgba(244, 63, 94, 0.14))',
  },
  {
    id: 'violet',
    label: 'Violet',
    gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
    banner: 'linear-gradient(135deg, rgba(124, 58, 237, 0.24), rgba(236, 72, 153, 0.14))',
  },
];

const VALID_COLORS = new Set<AvatarColorId>(AVATAR_COLOR_PRESETS.map((preset) => preset.id));

export function getAvatarColorPreset(colorId: AvatarColorId): AvatarColorPreset {
  return AVATAR_COLOR_PRESETS.find((preset) => preset.id === colorId) ?? AVATAR_COLOR_PRESETS[0];
}

export function isSafeAvatarImageUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_AVATAR_IMAGE_LENGTH) return false;
  if (/^data:image\/(png|jpe?g|webp|gif);base64,[a-z0-9+/=]+$/i.test(trimmed)) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function getProfileInitials(displayName: string): string {
  const cleaned = displayName.trim();
  if (!cleaned) return 'CA';
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase();
}

export function createDefaultProfile(fallbackName?: string): LocalProfile {
  const safeName = (fallbackName ?? '').trim().slice(0, MAX_DISPLAY_NAME_LENGTH) || 'CodeArena Learner';
  return {
    displayName: safeName,
    bio: '',
    avatarMode: 'initials',
    avatarColor: 'indigo',
    avatarImage: '',
    visibility: 'public',
    updatedAt: null,
    pronouns: '',
    company: '',
    university: '',
    location: '',
    displayLocalTime: false,
    publicEmail: '',
    website: '',
    socialLinks: [],
  };
}

export function sanitizeLocalProfile(candidate: unknown, fallbackName?: string): LocalProfile {
  const defaults = createDefaultProfile(fallbackName);
  if (!candidate || typeof candidate !== 'object') return defaults;
  const raw = candidate as Partial<LocalProfile>;

  const displayName = typeof raw.displayName === 'string' && raw.displayName.trim()
    ? raw.displayName.trim().slice(0, MAX_DISPLAY_NAME_LENGTH)
    : defaults.displayName;
  const bio = typeof raw.bio === 'string'
    ? raw.bio.slice(0, MAX_BIO_LENGTH)
    : defaults.bio;
  const avatarColor: AvatarColorId = typeof raw.avatarColor === 'string' && VALID_COLORS.has(raw.avatarColor as AvatarColorId)
    ? raw.avatarColor as AvatarColorId
    : defaults.avatarColor;
  const avatarImage = typeof raw.avatarImage === 'string' && isSafeAvatarImageUrl(raw.avatarImage)
    ? raw.avatarImage.trim()
    : '';
  const avatarMode: AvatarMode = raw.avatarMode === 'image' && avatarImage
    ? 'image'
    : 'initials';
  const visibility: ProfileVisibility = raw.visibility === 'private' ? 'private' : 'public';
  const updatedAt = typeof raw.updatedAt === 'string' && Number.isFinite(Date.parse(raw.updatedAt))
    ? raw.updatedAt
    : null;

  const pronouns = typeof raw.pronouns === 'string' ? raw.pronouns.trim().slice(0, 40) : '';
  const company = typeof raw.company === 'string' ? raw.company.trim().slice(0, 80) : '';
  const university = typeof raw.university === 'string' ? raw.university.trim().slice(0, 80) : '';
  const location = typeof raw.location === 'string' ? raw.location.trim().slice(0, 80) : '';
  const displayLocalTime = Boolean(raw.displayLocalTime);
  const publicEmail = typeof raw.publicEmail === 'string' ? raw.publicEmail.trim().slice(0, 100) : '';
  const website = typeof raw.website === 'string' ? raw.website.trim().slice(0, 120) : '';
  const socialLinks = Array.isArray(raw.socialLinks)
    ? raw.socialLinks
        .filter((item): item is string => typeof item === 'string')
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 4)
    : [];

  return {
    displayName,
    bio,
    avatarMode,
    avatarColor,
    avatarImage,
    visibility,
    updatedAt,
    pronouns,
    company,
    university,
    location,
    displayLocalTime,
    publicEmail,
    website,
    socialLinks,
  };
}

export function loadPrivacySettings(): PrivacySettings {
  const stored = readStorage<unknown>(PRIVACY_STORAGE_KEY, null);
  if (!stored || typeof stored !== 'object') return { ...DEFAULT_PRIVACY_SETTINGS };
  const raw = stored as Partial<PrivacySettings>;
  return {
    profileVisibility: raw.profileVisibility === 'private' ? 'private' : 'public',
    showEmail: raw.showEmail ?? true,
    showAffiliation: raw.showAffiliation ?? true,
    showLocation: raw.showLocation ?? true,
    showLocalTime: raw.showLocalTime ?? true,
    showSocials: raw.showSocials ?? true,
    showHeatmap: raw.showHeatmap ?? true,
    showSolvedProblems: raw.showSolvedProblems ?? true,
    showAchievements: raw.showAchievements ?? true,
  };
}

export function savePrivacySettings(settings: PrivacySettings): void {
  writeStorage(PRIVACY_STORAGE_KEY, settings);
}

export function loadLocalProfile(fallbackName?: string): LocalProfile {
  const stored = readStorage<unknown>(PROFILE_STORAGE_KEY, null);
  return sanitizeLocalProfile(stored, fallbackName);
}

export function saveLocalProfile(profile: LocalProfile): void {
  writeStorage(PROFILE_STORAGE_KEY, profile);
}

export function clearLocalProfile(): void {
  removeStorage(PROFILE_STORAGE_KEY);
}

/**
 * Resize and compress a locally chosen image file to a 160x160 square JPEG data URL
 * so it previews crisply and fits safely inside browser localStorage.
 */
export function compressAvatarFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file (PNG, JPG, WebP, or GIF).'));
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      reject(new Error('Image is too large. Please choose a file smaller than 4 MB.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the selected image file.'));
    reader.onload = () => {
      const src = typeof reader.result === 'string' ? reader.result : '';
      if (!src) {
        reject(new Error('Selected file could not be loaded as an image.'));
        return;
      }

      const img = new Image();
      img.onerror = () => reject(new Error('The selected file is not a supported image.'));
      img.onload = () => {
        const size = 160;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas is unavailable in this browser.'));
          return;
        }
        const minSide = Math.min(img.width, img.height);
        const sx = Math.max(0, (img.width - minSide) / 2);
        const sy = Math.max(0, (img.height - minSide) / 2);
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);

        const compressed = canvas.toDataURL('image/jpeg', 0.84);
        if (!isSafeAvatarImageUrl(compressed)) {
          reject(new Error('Processed image exceeded local storage limits.'));
          return;
        }
        resolve(compressed);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  });
}
