import { useEffect, useState } from 'react';
import { getAvatarColorPreset, getProfileInitials, isSafeAvatarImageUrl } from '../lib/profileStorage';
import type { AvatarColorId, AvatarMode } from '../types';

interface ProfileAvatarProps {
  displayName: string;
  avatarMode: AvatarMode;
  avatarColor: AvatarColorId;
  avatarImage?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onImageErrorChange?: (hasError: boolean) => void;
}

const SIZE_CLASSES: Record<NonNullable<ProfileAvatarProps['size']>, string> = {
  sm: 'h-8 w-8 rounded-xl text-[11px]',
  md: 'h-11 w-11 rounded-2xl text-sm',
  lg: 'h-16 w-16 rounded-2xl text-lg',
  xl: 'h-20 w-20 rounded-3xl text-xl',
};

export default function ProfileAvatar({
  displayName,
  avatarMode,
  avatarColor,
  avatarImage = '',
  size = 'md',
  className = '',
  onImageErrorChange,
}: ProfileAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
    onImageErrorChange?.(false);
  }, [avatarImage, avatarMode, onImageErrorChange]);

  const preset = getAvatarColorPreset(avatarColor);
  const canShowImage = avatarMode === 'image' && isSafeAvatarImageUrl(avatarImage) && !imageFailed;
  const initials = getProfileInitials(displayName);

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden font-display font-bold text-white shadow-sm select-none ${SIZE_CLASSES[size]} ${className}`}
      style={canShowImage ? undefined : { background: preset.gradient }}
      aria-label={`${displayName || 'User'} avatar`}
    >
      {canShowImage ? (
        <img
          src={avatarImage}
          alt={`${displayName || 'User'} avatar`}
          className="h-full w-full object-cover"
          onError={() => {
            setImageFailed(true);
            onImageErrorChange?.(true);
          }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
