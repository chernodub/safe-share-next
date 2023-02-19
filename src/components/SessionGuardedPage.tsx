import type { SessionContextValue } from 'next-auth/react';
import { signIn, useSession } from 'next-auth/react';
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

type GuardedSessionContextValue = [SessionContextValue] extends [infer T]
  ? T extends { status: 'authenticated'; }
    ? T
    : never
  : never;

const GuardedSessionContext = createContext<GuardedSessionContextValue>({
  // will 100% be overwritten so it's safe to put dummy data
  data: {
    expires: '',
  },
  status: 'authenticated',
});

interface GuardedSessionProviderProps extends PropsWithChildren {
  readonly loader?: JSX.Element;
}

export function GuardedSessionProvider({ children, loader }: GuardedSessionProviderProps) {
  const session = useSession();

  if (session.status === 'unauthenticated') {
    void signIn();
    return null;
  }

  if (session.status === 'loading') {
    return loader ?? null;
  }

  return (
    <GuardedSessionContext.Provider value={session as GuardedSessionContextValue}>
      {children}
    </GuardedSessionContext.Provider>
  );
}

export function useGuardedSession() {
  return useContext(GuardedSessionContext);
}
