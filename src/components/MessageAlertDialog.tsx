import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Icon } from '@chakra-ui/react';
import type { Post } from '@prisma/client';
import { useCallback, useRef } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

import { Date } from './shared/Date';

interface MessageAlertDialogProps {
  readonly message: Post;
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
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
