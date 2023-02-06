import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useCallback, useId } from 'react';

import { MdAdd } from 'react-icons/md';

import { api } from '../utils/api';

import type { PostFormValue } from './PostForm';
import { PostForm } from './PostForm';
import { useLoadingToast, useSuccessToast } from './hooks/toastHooks';

interface CreatePostModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const loadingToast = useLoadingToast();
  const successToast = useSuccessToast({ title: 'Post created!' });
  const utils = api.useContext();
  const formId = useId();
  const { mutate, isLoading } = api.post.create.useMutation({
    onSuccess() {
      loadingToast.closeAll();
      void utils.post.getPage.invalidate();
      successToast();
    },
    onMutate: () => loadingToast(),
  });

  const handleSubmit = useCallback((data: PostFormValue) => {
    mutate({
      content: data.content,
    });
    onClose();
  }, [mutate, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Add New Post
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PostForm formId={formId} onSubmit={handleSubmit} defaultValue={{ content: '' }}></PostForm>
        </ModalBody>
        <ModalFooter>
          <Button
            leftIcon={<Icon as={MdAdd} />}
            isLoading={isLoading}
            colorScheme="blue"
            mr={3}
            form={formId}
            type="submit">
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
