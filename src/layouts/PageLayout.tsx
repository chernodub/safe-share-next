import { Flex } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

import { Header } from '../components/Header';

export interface PageLayoutProps extends PropsWithChildren {
  readonly head?: JSX.Element;
}

export function PageLayout({ children, head }: PageLayoutProps) {
  return (
    <>
      {head}
      <Header></Header>
      <main>
        <Flex flexDir="column" p={6} gap={6} maxW={960} mx="auto">
          {children}
        </Flex>
      </main>
    </>
  );
}
