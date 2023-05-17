import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from '@chakra-ui/react';

const HistoryTable = props => {
  return (
    <TableContainer>
      <Text align="center" mb={5} fontWeight="600">
        History Input
      </Text>
      <Table colorScheme="black" border="1px solid black">
        <Thead>
          <Tr>
            <Th bg="#919191" color="black">
              Tempat Wisata
            </Th>
            <Th bg="#919191" color="black">
              Tipe Makanan
            </Th>
            <Th bg="#919191" color="black">
              Bahan Utama
            </Th>
            <Th bg="#919191" color="black">
              Berkuah / Tidak Berkuah
            </Th>
            <Th bg="#919191" color="black">
              Penyajian
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{props.place}</Td>
            {props.type ? <Td>{props.type}</Td> : <Td>-</Td>}
            {props.ingredient ? <Td>{props.ingredient}</Td> : <Td>-</Td>}
            {props.broth ? <Td>{props.broth}</Td> : <Td>-</Td>}
            {props.serving ? <Td>{props.serving}</Td> : <Td>-</Td>}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
