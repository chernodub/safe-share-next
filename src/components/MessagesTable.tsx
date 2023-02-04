import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import type { Message } from '@prisma/client';

interface MessagesTableProps {
  readonly resources: readonly Message[];
}

export function MessagesTable({ resources }: MessagesTableProps) {
  return (
    <TableContainer>
      <Table variant='simple'>
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
          {resources.length === 0 && <p>No messages sent yet</p>}
          {resources.map(resource => (
            <Tr key={resource.id}>
              <Td>
                {resource.createdAt.toUTCString()}
              </Td>
              <Td>
                {resource.id}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
