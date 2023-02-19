import { type NextPage } from 'next';
import Head from 'next/head';

import { PostsList } from '../components/PostsList';
import { PageLayout } from '../layouts/PageLayout';

import { GuardedSessionProvider } from '../components/SessionGuardedPage';

const Home: NextPage = () => (
  <GuardedSessionProvider loader={<p>Loading...</p>}>
    <PageLayout head={<HomeHead/>}>
      <PostsList />
    </PageLayout>
  </GuardedSessionProvider>
);

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
