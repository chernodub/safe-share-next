import { Avatar } from '@chakra-ui/react';

interface UserAvatarProps {
  readonly imageSrc?: string;
}

export function UserAvatar({ imageSrc }: UserAvatarProps) {
  return <Avatar size="sm" src={imageSrc ?? undefined} />;
}
