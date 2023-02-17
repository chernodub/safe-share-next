import { IconButton as ChakraIconButton } from '@chakra-ui/react';

interface IconButtonProps {
  readonly onClick?: () => void;
  readonly label: string;
  readonly icon: JSX.Element;
}

export function AppIconButton({ onClick, label, icon }: IconButtonProps) {
  return (
    <ChakraIconButton
      onClick={onClick}
      variant="ghost"
      borderRadius="full"
      p={0}
      icon={icon}
      aria-label={label}
    />
  );
}
