import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import type { Message } from '@prisma/client';
import { useCallback, useId } from 'react';

import { api } from '../utils/api';

import type { MessageFormValue } from './MessageFormValue';
import { MessageForm } from './MessageFormValue';

import { Date } from './shared/Date';
import { useLoadingToast, useSuccessToast } from './hooks/toastHooks';

interface EditMessageModalProps {
  readonly message: Message;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function EditMessageModal({ isOpen, onClose, message }: EditMessageModalProps) {
  const loadingToast = useLoadingToast();
  const successToast = useSuccessToast();
  const formId = useId();
  const utils = api.useContext();
  const { mutate, isLoading } = api.message.edit.useMutation({
    onSuccess() {
      loadingToast.closeAll();
      successToast({
        title: <>Message from <Date value={message.createdAt} /> was updated!</>,
      });
      void utils.message.getPage.invalidate();
    },
    onMutate: () => loadingToast(),
  });

  const handleSubmit = useCallback((data: MessageFormValue) => {
    mutate({
      id: message.id,
      content: data.content,
    });

    onClose();
  }, [mutate, message.id, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Edit Message from <Date value={message.createdAt}/>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <MessageForm formId={formId} defaultValue={{ content: message.text }} onSubmit={handleSubmit}></MessageForm>
        </ModalBody>
        <ModalFooter>
          <Button isLoading={isLoading} colorScheme="blue" mr={3} form={formId} type="submit">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
