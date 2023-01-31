
import type { ShareableMessage } from '../../../types/message';
import { createTRPCRouter, protectedProcedure } from '../trpc';

// TODO remove mocked data
const temp: ShareableMessage[] = [
  { id: '$1', name: 'Message 1', status: 'Sent' },
  { id: '$2', name: 'Message 1', status: 'Sent' },
  { id: '$3', name: 'Message 1', status: 'Sent' },
  { id: '$4', name: 'Message 1', status: 'Sent' },
];

export const messageRouter = createTRPCRouter({
  getAll: protectedProcedure.query(() => Promise.resolve(temp)),
});
