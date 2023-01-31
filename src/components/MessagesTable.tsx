import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import type { ShareableMessage } from '../types/message';

interface MessagesTableProps {
  readonly resources: readonly ShareableMessage[];
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
          {resources.map(resource => (
            <Tr key={resource.id}>
              <Td>
                {resource.name}
              </Td>
              <Td>
                {resource.status}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
