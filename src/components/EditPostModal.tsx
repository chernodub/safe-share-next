import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import type { Post } from '@prisma/client';
import { useCallback, useId } from 'react';

import { MdSave } from 'react-icons/md';

import { api } from '../utils/api';

import type { PostFormValue } from './PostForm';
import { PostForm } from './PostForm';

import { useLoadingToast, useSuccessToast } from './hooks/toastHooks';
import { DateTime } from './shared/DateTime';

interface EditPostModalProps {
  readonly post: Post;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function EditPostModal({ isOpen, onClose, post }: EditPostModalProps) {
  const loadingToast = useLoadingToast();
  const successToast = useSuccessToast();
  const formId = useId();
  const utils = api.useContext();
  const { mutate, isLoading } = api.post.edit.useMutation({
    onSuccess() {
      loadingToast.closeAll();
      successToast({
        title: <>Post from <DateTime value={post.updatedAt} /> was updated!</>,
      });
      void utils.post.getPage.invalidate();
    },
    onMutate: () => loadingToast(),
  });

  const handleSubmit = useCallback((data: PostFormValue) => {
    mutate({
      id: post.id,
      content: data.content,
    });

    onClose();
  }, [mutate, post.id, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Edit Post from <DateTime value={post.updatedAt}/>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PostForm formId={formId} defaultValue={{ content: post.text }} onSubmit={handleSubmit}></PostForm>
        </ModalBody>
        <ModalFooter>
          <Button
            leftIcon={<Icon as={MdSave} />}
            isLoading={isLoading}
            colorScheme="blue"
            mr={3}
            form={formId}
            type="submit">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
