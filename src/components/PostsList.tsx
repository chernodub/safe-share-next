
import { Button, Flex, Heading, Icon, ListItem, SkeletonText, Text, UnorderedList, useDisclosure } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';

import type { Post } from '@prisma/client';

import { useAutoAnimate } from '@formkit/auto-animate/react';

import { api } from '../utils/api';

import { CreatePostModal } from './CreatePostModalProps';
import { EditPostModal } from './EditPostModal';

import { PostAlertDialog } from './PostAlertDialog';
import { Date } from './shared/Date';

import { useLoadingToast, useSuccessToast } from './hooks/toastHooks';

function useDeleteMutation() {
  const utils = api.useContext();
  const loadingToast = useLoadingToast();
  const successToast = useSuccessToast();

  return api.post.delete.useMutation({
    onSuccess(removedPost) {
      loadingToast.closeAll();
      successToast({
        title: <>Post from <Date value={removedPost.createdAt} /> was removed!</>,
      });
      void utils.post.getPage.invalidate();
    },
    onMutate: () => loadingToast(),
  }).mutate;
}

export function PostsList() {
  const [animatedElement] = useAutoAnimate();
  const { data: posts } = api.post.getPage.useQuery({ page: 0, pageSize: 10 });
  const [selectedPostId, setCurrentPostId] = useState<string | null>(null);
  const selectedPost = posts?.find(post => post.id === selectedPostId) ?? null;
  const createModal = useDisclosure();
  const editModal = useDisclosure();
  const handlePostClick = useCallback(({ id }: Post) => setCurrentPostId(id), []);
  const deletePost = useDeleteMutation();
  const handleDelete = useCallback(() => {
    if (selectedPost == null) {
      return;
    }
    deletePost(selectedPost);
    setCurrentPostId(null);
  }, [deletePost, selectedPost]);

  return (
    <Flex p={3} direction="column" w="full">
      <header>
        <Flex p={3} justifyContent="space-between" alignItems="center">
          <Heading size="md">Your Posts</Heading>
          <Button leftIcon={<Icon as={MdAdd}/>} onClick={createModal.onOpen}>New Post</Button>
        </Flex>
      </header>

      <UnorderedList p={3} m={0} ref={animatedElement}>
        {posts == null && <PostItemsSkeleton />}
        {posts && posts.length > 0 && <PostItems posts={posts} onClick={handlePostClick} />}
      </UnorderedList>
      {posts && posts.length === 0 && <EmptyListPrompt/>}

      {
        selectedPost &&
          <PostAlertDialog
            isOpen={true}
            post={selectedPost}
            onClose={setCurrentPostId.bind(null, null)}
            onEdit={editModal.onOpen}
            onDelete={handleDelete}
          />
      }
      <CreatePostModal isOpen={createModal.isOpen} onClose={createModal.onClose} />
      {
        selectedPost &&
          <EditPostModal isOpen={editModal.isOpen} onClose={editModal.onClose} post={selectedPost} />
      }
    </Flex>
  );
}

interface PostRowsProps {
  readonly posts: readonly Post[];
  readonly onClick: (post: Post) => void;
}

function PostItems({ posts, onClick }: PostRowsProps) {
  return (
    <>
      {posts.map(post => (
        <PostItem key={post.id} onClick={() => onClick(post)}>
          <Date value={post.createdAt} />
        </PostItem>
      ))}
    </>
  );
}

function EmptyListPrompt() {
  return <Text align="center" color="gray.40">No sent posts</Text>;
}

function PostItemsSkeleton() {
  const SKELETON_ITEMS_AMOUNT = 10;
  return (
    <>
      {Array(SKELETON_ITEMS_AMOUNT).map((_, i) =>
        <PostItem key={i}>
          <SkeletonText noOfLines={1} w="full" />
        </PostItem>)}
    </>
  );
}

interface PostItemProps extends PropsWithChildren {
  readonly onClick?: () => void;
}

function PostItem({ children, onClick }: PostItemProps) {
  return (
    <ListItem listStyleType="none">
      <Button w="full" justifyContent="flex-start" variant="ghost" isDisabled={onClick == null} onClick={onClick}>
        {children}
      </Button>
    </ListItem>
  );
}
