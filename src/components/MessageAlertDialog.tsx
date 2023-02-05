import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';
import type { Message } from '@prisma/client';
import { useCallback, useRef } from 'react';

import { Date } from './shared/Date';

interface MessageAlertDialogProps {
  readonly message: Message;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}
export function MessageAlertDialog({ message, isOpen, onClose, onEdit, onDelete }: MessageAlertDialogProps) {
  const ref = useRef(null);

  const handleEdit = useCallback(() => {
    onEdit();
  }, [onEdit]);

  const handleDelete = useCallback(() => {
    onDelete();
  }, [onDelete]);

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={ref}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogHeader>
            <Date value={message.createdAt} />
          </AlertDialogHeader>

          <AlertDialogBody>
            {message.text}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="blue" ref={ref} onClick={handleEdit}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
