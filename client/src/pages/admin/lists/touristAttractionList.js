import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  RiEditBoxFill,
  RiDeleteBin2Fill,
  RiAddCircleFill,
} from 'react-icons/ri';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Text,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Box,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

const TouristAttractionList = () => {
  const [places, setPlaces] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedId, setSelectedId] = useState();
  const [updateMessage, setUpdateMessage] = useState();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVERURL + '/marker/getmarker')
      .then(res => {
        setPlaces(res?.data ?? []);
      });
  }, [updateMessage]);

  const handleDeleteButton = id => {
    onOpen();
    setSelectedId(id);
  };

  const handleDelete = async () => {
    await axios
      .post(process.env.REACT_APP_SERVERURL + '/marker/deletemarker', {
        id: selectedId,
      })
      .then(res => {
        setUpdateMessage(res?.data ?? []);
      });
    onClose();
  };

  let tableNumber = 0;
  return (
    <Box bg="black" pt={10}>
      <Box m={5} p={10} bg="#00203D" borderRadius="10px">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          align="center"
          mb={10}
          color="#ADEFD1FF"
        >
          Daftar Tempat Wisata
        </Text>
        <TableContainer maxH="550px" overflowY="scroll">
          <Table variant="striped" bg="white">
            <Thead
              style={{
                position: 'sticky',
                top: '0',
                backgroundColor: 'orange',
                zIndex: '1',
              }}
            >
              <Tr>
                <Th>No</Th>
                <Th>Id</Th>
                <Th>Nama</Th>
                <Th>Posisi (lat, long)</Th>
                <Th>Edit / Hapus</Th>
              </Tr>
            </Thead>
            <Tbody>
              {places &&
                places.map(item => {
                  tableNumber += 1;
                  return (
                    <Tr key={item._id}>
                      <Td>{tableNumber}</Td>
                      <Td>{item._id}</Td>
                      <Td>{item.name}</Td>
                      <Td>{`(${item.position.lat}, ${item.position.lng})`}</Td>
                      <Td>
                        <Link to={`edit/${item._id}`}>
                          <Button variant="solid" colorScheme="blue">
                            <RiEditBoxFill />
                          </Button>
                        </Link>
                        <Button
                          variant="solid"
                          colorScheme="red"
                          ml={2}
                          onClick={() => handleDeleteButton(item._id)}
                        >
                          <RiDeleteBin2Fill />
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
        <Center>
          <Link to="add">
            <Button variant="solid" colorScheme="green" mt={[5, null, 10]}>
              <RiAddCircleFill style={{ marginRight: '5px' }} />
              Tambah Tempat Wisata
            </Button>
          </Link>
        </Center>

        {/* DELETE MODAL */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Remove Place</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Yakin mau hapus tempat ini?</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Tidak
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Hapus
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default TouristAttractionList;
