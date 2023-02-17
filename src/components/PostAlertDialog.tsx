import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Icon } from '@chakra-ui/react';
import type { Post } from '@prisma/client';
import { useCallback, useRef } from 'react';
import { } from 'react-dom';
import { MdDelete, MdEdit } from 'react-icons/md';

import { useSuccessToast } from './hooks/toastHooks';
import { PostContent } from './Post/PostContent';
import { DateTime } from './shared/DateTime';
import { ShareLinkButton } from './ShareLinkButton';

function useCurrentOrigin() {
  // Window is nullable if this is a SSR context
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (window == null) {
    return '';
  }

  return window.location.origin;
}

function usePostUrl(post: Post) {
  const origin = useCurrentOrigin();

  return `${origin}/posts/${post.id}`;
}

interface PostAlertDialogProps {
  readonly post: Post;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}
export function PostAlertDialog({ post, isOpen, onClose, onEdit, onDelete }: PostAlertDialogProps) {
  const postUrl = usePostUrl(post);
  const successToast = useSuccessToast({
    title: 'Post URL was copied to clipboard!',
  });
  const ref = useRef(null);

  const handleEdit = useCallback(() => {
    onEdit();
  }, [onEdit]);

  const handleDelete = useCallback(() => {
    onDelete();
  }, [onDelete]);

  const handlePostUrlCopy = useCallback(() => {
    successToast();
  }, [successToast]);

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={ref}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogHeader>
            <DateTime value={post.updatedAt} />
          </AlertDialogHeader>

          <AlertDialogBody>
            <PostContent post={post} />
          </AlertDialogBody>

          <AlertDialogFooter gap={3}>
            <Button
              colorScheme="red"
              leftIcon={<Icon as={MdDelete}/>}
              onClick={handleDelete}>
              Delete
            </Button>
            <Button
              leftIcon={<Icon as={MdEdit}/>}
              colorScheme="blue"
              ref={ref}
              onClick={handleEdit}>
              Edit
            </Button>
            <ShareLinkButton onCopy={handlePostUrlCopy} link={postUrl}>Share</ShareLinkButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
