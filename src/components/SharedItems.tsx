import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { api } from '../utils/api';

import { MessagesTable } from './MessagesTable';

export function SharedItems() {
  const messages = api.message.getPage.useQuery({
    page: 0,
    pageSize: 10,
  });

  return (
    <Tabs isFitted w="full">
      <TabList>
        <Tab>Messages</Tab>
        <Tab>Files</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <MessagesTable messages={messages.data ?? []} />
        </TabPanel>
        <TabPanel>
          TODO
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
