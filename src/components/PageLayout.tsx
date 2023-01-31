import { Flex } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Flex maxW={960} mx='auto'>
        {children}
      </Flex>
    </main>
  );
}
