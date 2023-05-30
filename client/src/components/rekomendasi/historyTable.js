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
    <>
      <Text align="center" mb={5} fontWeight="600" color="#ADEFD1FF">
        History Input
      </Text>
      <TableContainer>
        <Table colorScheme="black" border="1px solid black">
          <Thead>
            <Tr>
              {props.place && (
                <Th bg="#919191" color="black">
                  Tempat Wisata
                </Th>
              )}
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
              {props.place && <Td bg="white">{props.place}</Td>}
              {props.type ? (
                <Td bg="white">{props.type}</Td>
              ) : (
                <Td bg="white">-</Td>
              )}
              {props.ingredient ? (
                <Td bg="white">{props.ingredient}</Td>
              ) : (
                <Td bg="white">-</Td>
              )}
              {props.broth ? (
                <Td bg="white">{props.broth}</Td>
              ) : (
                <Td bg="white">-</Td>
              )}
              {props.serving ? (
                <Td bg="white">{props.serving}</Td>
              ) : (
                <Td bg="white">-</Td>
              )}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HistoryTable;
