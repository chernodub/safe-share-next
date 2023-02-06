import { Button, Icon, useColorMode } from '@chakra-ui/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button p={0} variant="ghost" borderRadius="full" onClick={toggleColorMode}>
      <Icon w={6} h={6} as={colorMode === 'dark' ? MdDarkMode : MdLightMode} />
    </Button>
  );
}
