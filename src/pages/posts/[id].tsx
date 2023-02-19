import { Flex, Text } from '@chakra-ui/react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { deserialize, serialize } from 'superjson';

import { Header } from '../../components/Header';
import { PostContent } from '../../components/Post/PostContent';
import { DateTime } from '../../components/shared/DateTime';

import { ssgHelpers } from '../../server/api/root';

type FullPost = Awaited<ReturnType<typeof ssgHelpers.post.get.fetch>>;

export async function getServerSideProps({ params }: GetServerSidePropsContext<{ id: string; }>) {
  const id = params?.id;

  if (id == null || Array.isArray(id)) {
    return {
      notFound: true,
    };
  }

  const post = await ssgHelpers.post.get.fetch(id);

  return {
    props: {
      serializedPost: serialize(post),
    },
  };
}

export default function PostPage({ serializedPost }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const post = deserialize<FullPost>(serializedPost);

  return (
    <>
      <Header></Header>

      <main>
        <Flex p={6} flexDir="column" gap={6} maxW="container.lg" mx={{ xl: '20%' }}>

          <PostContent post={post} />

          <div>
            Created at <DateTime value={post.createdAt}></DateTime> by <Text as="span" fontWeight="bold">{post.author.name}</Text>
          </div>
        </Flex>
      </main>
    </>
  );
}
