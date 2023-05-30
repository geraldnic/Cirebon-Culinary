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
const RestaurantList = () => {
  const [restaurant, setRestaurant] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedId, setSelectedId] = useState();
  const [updateMessage, setUpdateMessage] = useState();

  useEffect(() => {
    axios.get(process.env.SERVERURL + '/restaurant/getrestaurant').then(res => {
      setRestaurant(res?.data ?? []);
    });
  }, [updateMessage]);

  const handleDeleteButton = id => {
    onOpen();
    setSelectedId(id);
  };

  const handleDelete = async () => {
    await axios
      .post(process.env.SERVERURL + '/restaurant/deleterestaurant', {
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
          Daftar Tempat Kuliner
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
                <Th>Image URL</Th>
                <Th>Posisi (lat, long)</Th>
                <Th>Food ID</Th>
                <Th>Harga</Th>
                <Th>Pelayanan</Th>
                <Th>Rasa</Th>
                <Th>Edit / Hapus</Th>
              </Tr>
            </Thead>
            <Tbody>
              {restaurant &&
                restaurant.map(item => {
                  tableNumber += 1;
                  console.log(item.foodId);
                  return (
                    <Tr key={item._id}>
                      <Td maxW="200px" whiteSpace="initial">
                        {tableNumber}
                      </Td>
                      <Td maxW="200px" whiteSpace="initial">
                        {item._id}
                      </Td>
                      <Td maxW="200px" whiteSpace="initial">
                        {item.name}
                      </Td>
                      <Td maxW="200px" whiteSpace="initial">
                        {item.imageUrl}
                      </Td>
                      <Td
                        maxW="200px"
                        whiteSpace="initial"
                      >{`(${item.position.lat}, ${item.position.lng})`}</Td>
                      <Td maxW="210px" whiteSpace="initial">
                        {item.foodId.map(id => (
                          <p>{id}</p>
                        ))}
                      </Td>
                      <Td maxW="200px" whiteSpace="initial" textAlign="center">
                        {item.price}
                      </Td>
                      <Td maxW="200px" whiteSpace="initial" textAlign="center">
                        {item.service}
                      </Td>
                      <Td maxW="200px" whiteSpace="initial" textAlign="center">
                        {item.taste}
                      </Td>
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
              Tambah Tempat Kuliner
            </Button>
          </Link>
        </Center>

        {/* DELETE MODAL */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Remove Restaurant</ModalHeader>
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

export default RestaurantList;
