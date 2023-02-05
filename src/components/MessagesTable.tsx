
import { Button, Icon, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import type { Message } from '@prisma/client';
import { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';

import { api } from '../utils/api';

import { CreateMessageModal } from './CreateMessageModalProps';
import { EditMessageModal } from './EditMessageModal';

import { MessageAlertDialog } from './MessageAlertDialog';
import { Date } from './shared/Date';

import { useLoadingToast, useSuccessToast } from './hooks/toastHooks';
import { SharedItemsHeader } from './SharedItemsHeader';

interface MessagesTableProps {
  readonly messages: readonly Message[];
}

// TODO: Refactor this component into a page + table for better readability
export function MessagesTable({ messages }: MessagesTableProps) {
  const [selectedMessageId, setCurrentMessageId] = useState<string | null>(null);
  const selectedMessage = messages.find(message => message.id === selectedMessageId) ?? null;
  const createModal = useDisclosure();
  const editModal = useDisclosure();
  const loadingToast = useLoadingToast();
  const successToast = useSuccessToast();

  const utils = api.useContext();
  const { mutate } = api.message.delete.useMutation({
    onSuccess(removedMessage) {
      loadingToast.closeAll();
      successToast({
        title: <>Message from <Date value={removedMessage.createdAt} /> was removed!</>,
      });
      void utils.message.getPage.invalidate();
    },
    onMutate: () => loadingToast(),
  });
  const handleDelete = useCallback(() => {
    if (selectedMessage == null) {
      return;
    }
    mutate(selectedMessage);
    setCurrentMessageId(null);
  }, [mutate, selectedMessage]);

  return (
    <>
      <SharedItemsHeader>
        <Button leftIcon={<Icon as={MdAdd}/>} onClick={createModal.onOpen}>New Message</Button>
      </SharedItemsHeader>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                Name
              </Th>
              <Th>
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {messages.length === 0 && <Tr><Td colSpan={2}>No messages sent yet</Td></Tr>}
            {messages.map(resource => (
              <Tr key={resource.id} onClick={() => setCurrentMessageId(resource.id)}>
                <Td>
                  <Date value={resource.createdAt} />
                </Td>
                <Td>
                  {resource.id}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {
        selectedMessage &&
        <MessageAlertDialog
          isOpen={true}
          message={selectedMessage}
          onClose={setCurrentMessageId.bind(null, null)}
          onEdit={editModal.onOpen}
          onDelete={handleDelete}
        />
      }

      <CreateMessageModal isOpen={createModal.isOpen} onClose={createModal.onClose} />
      {
        selectedMessage &&
        <EditMessageModal isOpen={editModal.isOpen} onClose={editModal.onClose} message={selectedMessage} />
      }
    </>
  );
}
