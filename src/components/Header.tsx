import { Button, Flex } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import type { PropsWithChildren } from 'react';

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
        <h1>SafeShare</h1>

        {children}
      </Flex>
    </header>
  );
}

export function Header() {
  const session = useSession();

  if (session.status === 'authenticated' && session.data.user) {
    return (
      <HeaderLayout>
        <UserAvatar
          imageSrc={session.data.user.image ?? undefined}
          onClick={handleAvatarClick}
        />
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <Button variant="outline" onClick={handleSignInClick}>Sign In</Button>
    </HeaderLayout>
  );
}
