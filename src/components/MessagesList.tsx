
import { Button, Flex, Heading, Icon, ListItem, SkeletonText, Text, UnorderedList, useDisclosure } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';

import type { Post } from '@prisma/client';

import { useAutoAnimate } from '@formkit/auto-animate/react';

import { api } from '../utils/api';

import { CreateMessageModal } from './CreateMessageModalProps';
import { EditMessageModal } from './EditMessageModal';

import { MessageAlertDialog } from './MessageAlertDialog';
import { Date } from './shared/Date';

import { useLoadingToast, useSuccessToast } from './hooks/toastHooks';

function useDeleteMutation() {
  const utils = api.useContext();
  const loadingToast = useLoadingToast();
  const successToast = useSuccessToast();

  return api.post.delete.useMutation({
    onSuccess(removedMessage) {
      loadingToast.closeAll();
      successToast({
        title: <>Message from <Date value={removedMessage.createdAt} /> was removed!</>,
      });
      void utils.post.getPage.invalidate();
    },
    onMutate: () => loadingToast(),
  }).mutate;
}

export function MessagesList() {
  const [animatedElement] = useAutoAnimate();
  const { data: messages } = api.post.getPage.useQuery({ page: 0, pageSize: 10 });
  const [selectedMessageId, setCurrentMessageId] = useState<string | null>(null);
  const selectedMessage = messages?.find(message => message.id === selectedMessageId) ?? null;
  const createModal = useDisclosure();
  const editModal = useDisclosure();
  const handleMessageClick = useCallback(({ id }: Post) => setCurrentMessageId(id), []);
  const deleteMessage = useDeleteMutation();
  const handleDelete = useCallback(() => {
    if (selectedMessage == null) {
      return;
    }
    deleteMessage(selectedMessage);
    setCurrentMessageId(null);
  }, [deleteMessage, selectedMessage]);

  return (
    <Flex p={3} direction="column" w="full">
      <header>
        <Flex p={3} justifyContent="space-between" alignItems="center">
          <Heading size="md">Your Messages</Heading>
          <Button leftIcon={<Icon as={MdAdd}/>} onClick={createModal.onOpen}>New Message</Button>
        </Flex>
      </header>

      <UnorderedList p={3} m={0} ref={animatedElement}>
        {messages == null && <MessageItemsSkeleton />}
        {messages && messages.length > 0 && <MessageItems messages={messages} onClick={handleMessageClick} />}
      </UnorderedList>
      {messages && messages.length === 0 && <EmptyListPrompt/>}

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
    </Flex>
  );
}

interface MessageRowsProps {
  readonly messages: Post[];
  readonly onClick: (message: Post) => void;
}

function MessageItems({ messages, onClick }: MessageRowsProps) {
  return (
    <>
      {messages.map(message => (
        <MessageItem key={message.id} onClick={() => onClick(message)}>
          <Date value={message.createdAt} />
        </MessageItem>
      ))}
    </>
  );
}

function EmptyListPrompt() {
  return <Text align="center" color="gray.40">No sent messages</Text>;
}

function MessageItemsSkeleton() {
  const SKELETON_ITEMS_AMOUNT = 10;
  return (
    <>
      {Array(SKELETON_ITEMS_AMOUNT).map((_, i) =>
        <MessageItem key={i}>
          <SkeletonText noOfLines={1} w="full" />
        </MessageItem>)}
    </>
  );
}

interface MessageItemProps extends PropsWithChildren {
  readonly onClick?: () => void;
}

function MessageItem({ children, onClick }: MessageItemProps) {
  return (
    <ListItem listStyleType="none">
      <Button w="full" justifyContent="flex-start" variant="ghost" isDisabled={onClick == null} onClick={onClick}>
        {children}
      </Button>
    </ListItem>
  );
}
