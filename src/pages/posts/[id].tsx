import { Flex } from '@chakra-ui/react';
import type { Post } from '@prisma/client';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Suspense } from 'react';

import { serialize, deserialize } from 'superjson';

import { Header } from '../../components/Header';
import { DateTime } from '../../components/shared/DateTime';

import { ssgHelpers } from '../../server/api/root';

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
  const post = deserialize<Post>(serializedPost);

  return (
    <>
      <Header></Header>

      <main>
        <Flex p={6} flexDir="column" gap={6}>

          <p>{post.text}</p>

          <DateTime value={post.createdAt} ></DateTime>
        </Flex>
      </main>
    </>
  );
}
