import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useCallback, useId } from 'react';

import { MdAdd } from 'react-icons/md';

import { api } from '../utils/api';

import type { MessageFormValue } from './MessageFormValue';
import { MessageForm } from './MessageFormValue';
import { useLoadingToast, useSuccessToast } from './hooks/toastHooks';

interface CreateMessageModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function CreateMessageModal({ isOpen, onClose }: CreateMessageModalProps) {
  const loadingToast = useLoadingToast();
  const successToast = useSuccessToast({ title: 'Message created!' });
  const utils = api.useContext();
  const formId = useId();
  const { mutate, isLoading } = api.message.create.useMutation({
    onSuccess() {
      loadingToast.closeAll();
      void utils.message.getPage.invalidate();
      successToast();
    },
    onMutate: () => loadingToast(),
  });

  const handleSubmit = useCallback((data: MessageFormValue) => {
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
          Add New Message
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <MessageForm formId={formId} onSubmit={handleSubmit} defaultValue={{ content: '' }}></MessageForm>
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
