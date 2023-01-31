import { type NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';

import { Header } from '../components/Header';
import { PageLayout } from '../components/PageLayout';

import { SharedItems } from '../components/SharedItems';

const Home: NextPage = () => {
  const session = useSession();

  if (session.status === 'unauthenticated') {
    void signIn();
    return null;
  }

  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>SafeShare</title>
        <meta name="description" content="Simple app for sharing credentials" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <PageLayout>
        <SharedItems />
      </PageLayout>
    </>
  );
};

export default Home;
