import { Avatar } from '@chakra-ui/react';

interface UserAvatarProps {
  readonly imageSrc?: string;
  readonly onClick?: () => void;
}

export function UserAvatar({ imageSrc, onClick }: UserAvatarProps) {
  return <Avatar size='sm' src={imageSrc ?? undefined} onClick={onClick} />;
}
