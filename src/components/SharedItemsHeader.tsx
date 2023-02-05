import { Flex } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

export function SharedItemsHeader({ children }: PropsWithChildren) {
  return (
    <>
      <header>
        <Flex justifyContent="flex-end">
          {children}
        </Flex>
      </header>
    </>
  );
}
