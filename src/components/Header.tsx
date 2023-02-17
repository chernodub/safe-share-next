import { Button, Flex, Text } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import { ThemeToggle } from './ThemeToggle';

import { UserAvatar } from './UserAvatar';

const handleAvatarClick = () => {
  void signOut();
};

const handleSignInClick = () => {
  void signIn();
};

function HeaderLayout({ children }: PropsWithChildren) {
  return (
    <header>
      <Flex py={2} px={6} justifyContent="space-between" alignItems="center">
        <Link href="/">
          <Text fontWeight="bold">SafeShare</Text>
        </Link>

        <Flex alignItems="center" gap={2}>
          <ThemeToggle />
          {children}
        </Flex>
      </Flex>
    </header>
  );
}

export function Header() {
  const session = useSession();

  if (session.status === 'authenticated' && session.data.user) {
    return (
      <HeaderLayout>
        <Button
          onClick={handleAvatarClick}
          variant="ghost"
          borderRadius="full"
          p={0}
        >
          <UserAvatar
            imageSrc={session.data.user.image ?? undefined}
          />
        </Button>
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <Button variant="outline" onClick={handleSignInClick}>Sign In</Button>
    </HeaderLayout>
  );
}
