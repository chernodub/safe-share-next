import { Button, Icon } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useId } from 'react';
import { MdAdd } from 'react-icons/md';

import { useLoadingToast, useSuccessToast } from '../../components/hooks/toastHooks';
import type { PostFormValue } from '../../components/PostForm';
import { PostForm } from '../../components/PostForm';
import { GuardedSessionProvider } from '../../components/SessionGuardedPage';
import { PageLayout } from '../../layouts/PageLayout';
import { api } from '../../utils/api';

export default function CreatePostPage() {
  return (
    <GuardedSessionProvider>
      <PageLayout head={<CreatePostPageHead/>}>
        <CreatePost/>
      </PageLayout>
    </GuardedSessionProvider>
  );
}

function CreatePost() {
  const router = useRouter();
  const loadingToast = useLoadingToast();
  const successToast = useSuccessToast({ title: 'Post created!' });
  const utils = api.useContext();
  const formId = useId();
  const { mutate, isLoading } = api.post.create.useMutation({
    onSuccess() {
      loadingToast.closeAll();
      void utils.post.getPage.invalidate();
      successToast();
      void router.push('/');
    },
    onMutate: () => loadingToast(),
  });

  const handleSubmit = useCallback((data: PostFormValue) => {
    mutate({
      content: data.content,
    });
  }, [mutate, router]);

  return (
    <>
      <PostForm formId={formId} onSubmit={handleSubmit} defaultValue={{ content: '' }}></PostForm>
      <footer>
        <Button
          leftIcon={<Icon as={MdAdd} />}
          isLoading={isLoading}
          colorScheme="blue"
          mr={3}
          form={formId}
          type="submit">
            Add
        </Button>
      </footer>
    </>
  );
}

function CreatePostPageHead() {
  return (
    <Head>
      <title>Create New Post</title>
    </Head>
  );
}
