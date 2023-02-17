import { Button, Icon } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

interface IconButtonProps {
  readonly onClick?: () => void;
  readonly title?: string;
  readonly IconType: IconType;
}

export function IconButton({ onClick, title, IconType }: IconButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      borderRadius="full"
      title={title}
      p={0}
    >
      <Icon w={6} h={6} as={IconType} />
    </Button>
  );
}
