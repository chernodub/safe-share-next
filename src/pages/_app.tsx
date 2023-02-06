import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';

import { api } from '../utils/api';

import '../styles/globals.css';
import { theme } from '../utils/theme';

const MyApp: AppType<{ session: Session | null; }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </SessionProvider>
);

export default api.withTRPC(MyApp);
