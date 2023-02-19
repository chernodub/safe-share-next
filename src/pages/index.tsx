import { type NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';

import { PostsList } from '../components/PostsList';
import { PageLayout } from '../layouts/PageLayout';

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
    <PageLayout head={<HomeHead/>}>
      <PostsList />
    </PageLayout>
  );
};

function HomeHead() {
  return (
    <Head>
      <title>SafeShare</title>
      <meta name="description" content="Simple app for sharing credentials" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default Home;
