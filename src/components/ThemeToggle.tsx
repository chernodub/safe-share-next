import { Icon, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { AppIconButton } from './AppIconButton';

export function ThemeToggle() {
  const { toggleColorMode } = useColorMode();
  const ThemeIcon = useColorModeValue(MdLightMode, MdDarkMode);
  const label = useColorModeValue('Toggle to dark mode', 'Toggle to light mode');

  return (
    <AppIconButton icon={<Icon as={ThemeIcon} w={6} h={6}/>} label={label} onClick={toggleColorMode}></AppIconButton>
  );
}
