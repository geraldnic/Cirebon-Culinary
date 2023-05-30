import React, { useState, useEffect } from 'react';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  Circle,
} from '@chakra-ui/react';

import axios from 'axios';

import AuthModal from '../../../components/auth/modal';

import { GiHotMeal } from 'react-icons/gi';

const AddFood = () => {
  // Temp State
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [typeId, setTypeId] = useState();
  const [ingredientId, setIngredientId] = useState();
  const [brothId, setBrothId] = useState();
  const [servingId, setServingId] = useState();
  const [addedSomething, setAddedSomething] = useState();
  const [addName, setAddName] = useState();
  const [addDescription, setAddDescription] = useState();
  const [addImageUrl, setAddImageUrl] = useState();
  const [addTypeId, setAddTypeId] = useState();
  const [addIngredientId, setAddIngredientId] = useState();
  const [addBrothId, setAddBrothId] = useState();
  const [addServingId, setAddServingId] = useState();

  // Fetch State
  const [type, setType] = useState();
  const [ingredient, setIngredient] = useState();
  const [broth, setBroth] = useState();
  const [serving, setServing] = useState();

  const [modalProps, setModalProps] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [cancel, setCancel] = useState(false);
  const [cancel2, setCancel2] = useState(false);

  const cancelHandler = () => {
    setIsOpen1(false);
    setCancel(true);
    setIngredientId('');
  };

  const cancelHandler2 = () => {
    setIsOpen2(false);
    setCancel2(true);
    setServingId('');
  };

  useEffect(() => {
    axios.get(process.env.SERVERURL + '/food/gettype').then(res => {
      setType(res?.data ?? []);
    });
    axios.get(process.env.SERVERURL + '/food/getallingredient').then(res => {
      setIngredient(res?.data ?? []);
    });
    axios.get(process.env.SERVERURL + '/food/getallbroth').then(res => {
      setBroth(res?.data ?? []);
    });
    axios.get(process.env.SERVERURL + '/food/getallserving').then(res => {
      setServing(res?.data ?? []);
    });
  }, [addedSomething]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addIngredientHandler = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(
        process.env.SERVERURL + '/food/addingredient',
        {
          name: addName,
          description: addDescription,
          imageUrl: addImageUrl,
          typeId: addTypeId,
        }
      );
      setIsOpen1(true);
      const res = {
        messageTitle: response.data.messageTitle,
        messageContent: response.data.messageContent,
        closeCaption: response.data.closeCaption,
        link: response.data.link,
        success: response.data.success,
      };
      openModal();
      setModalProps(res);
      setCancel(true);
      if (res.success === true) {
        setAddedSomething(addName);
      }
    } catch (err) {
      console.error(err);
    }
    setAddIngredientId('');
    setAddName('');
    setAddDescription('');
    setAddImageUrl('');
    setAddTypeId('');
    setIsOpen1(false);
  };

  const addServingHandler = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(
        process.env.SERVERURL + '/food/addserving',
        {
          name: addName,
          description: addDescription,
          imageUrl: addImageUrl,
          ingredientId: addIngredientId,
          brothId: addBrothId,
        }
      );
      setIsOpen2(true);
      const res = {
        messageTitle: response.data.messageTitle,
        messageContent: response.data.messageContent,
        closeCaption: response.data.closeCaption,
        link: response.data.link,
        success: response.data.success,
      };
      openModal();
      setModalProps(res);
      setCancel2(true);
      if (res.success === true) {
        setAddedSomething(addName);
      }
    } catch (err) {
      console.error(err);
    }
    setAddServingId('');
    setAddName('');
    setAddDescription('');
    setAddImageUrl('');
    setAddIngredientId('');
    setAddBrothId('');
    setIsOpen2(false);
  };

  const onSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(
        process.env.SERVERURL + '/food/addfood',
        {
          name,
          description,
          imageUrl,
          typeId,
          ingredientId,
          brothId,
          servingId,
        }
      );

      openModal();
      const res = {
        messageTitle: response.data.messageTitle,
        messageContent: response.data.messageContent,
        closeCaption: response.data.closeCaption,
        link: response.data.link,
      };
      setModalProps(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (ingredientId === 'addingredient') {
      setIsOpen1(true);
      setCancel(false);
    }
  }, [ingredientId]);

  useEffect(() => {
    if (servingId === 'addserving') {
      setIsOpen2(true);
      setCancel2(false);
    }
  }, [servingId]);

  console.log(name);
  console.log(description);
  console.log(imageUrl);
  console.log(typeId);
  console.log(ingredientId);
  console.log(brothId);
  console.log(servingId);
  return (
    <>
      <form onSubmit={onSubmit}>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <Stack align={'center'} m={'5'}>
                  <Center>
                    <Circle size={14} border="1px" borderColor="black">
                      <GiHotMeal />
                    </Circle>
                  </Center>
                  <Heading fontSize={'4xl'} textAlign="center">
                    Tambah Menu Makanan
                  </Heading>
                </Stack>
                <FormControl id="name" isRequired>
                  <FormLabel>Nama</FormLabel>
                  <Input
                    type="text"
                    onChange={event => setName(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="description" isRequired>
                  <FormLabel>Deskripsi</FormLabel>
                  <Input
                    type="text"
                    onChange={event => setDescription(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="imageUrl" isRequired>
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    type="text"
                    onChange={event => setImageUrl(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="foodtype" isRequired>
                  <FormLabel>Tipe Makanan</FormLabel>
                  <Select
                    placeholder="Pilih Tipe"
                    onChange={event => setTypeId(() => event.target.value)}
                  >
                    {type &&
                      type.map(item => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <FormControl id="foodingredient" isRequired>
                  <FormLabel>Bahan Utama</FormLabel>
                  <Select
                    onChange={event =>
                      setIngredientId(() => event.target.value)
                    }
                  >
                    {cancel ? (
                      <option key="bahanph" value="" selected>
                        Pilih Bahan
                      </option>
                    ) : (
                      <option key="bahanph" value="">
                        Pilih Bahan
                      </option>
                    )}

                    {ingredient &&
                      ingredient.map(item => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    <option key="addingredient" value="addingredient">
                      + Tambahkan Bahan...
                    </option>
                  </Select>
                </FormControl>
                <FormControl id="foodbroth" isRequired>
                  <FormLabel>Berkuah / Tidak Berkuah</FormLabel>
                  <Select
                    placeholder="Pilih Opsi"
                    onChange={event => setBrothId(() => event.target.value)}
                  >
                    {broth &&
                      broth.map(item => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <FormControl id="foodserving" isRequired>
                  <FormLabel>Penyajian</FormLabel>
                  <Select
                    onChange={event => setServingId(() => event.target.value)}
                  >
                    {cancel2 ? (
                      <option key="servingph" value="" selected>
                        Pilih Penyajian
                      </option>
                    ) : (
                      <option key="servingph" value="">
                        Pilih Penyajian
                      </option>
                    )}
                    {serving &&
                      serving.map(item => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    <option key="addserving" value="addserving">
                      + Tambahkan Penyajian...
                    </option>
                  </Select>
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type="submit"
                  >
                    Tambah
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
      <AuthModal
        messageTitle={modalProps.messageTitle}
        messageContent={modalProps.messageContent}
        closeCaption={modalProps.closeCaption}
        link={modalProps.link}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* ADD INGREDIENT MODAL */}
      <Modal isOpen={isOpen1} onClose={cancelHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Bahan</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={addIngredientHandler}>
              <FormControl isRequired>
                <FormLabel>Nama</FormLabel>
                <Input
                  placeholder="Nama bahan"
                  onChange={event => setAddName(() => event.target.value)}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Deskripsi</FormLabel>
                <Input
                  placeholder="Deskripsi"
                  onChange={event =>
                    setAddDescription(() => event.target.value)
                  }
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Image URL</FormLabel>
                <Input
                  placeholder="Image URL"
                  onChange={event => setAddImageUrl(() => event.target.value)}
                />
              </FormControl>

              <FormControl mt={4} id="foodtype" isRequired>
                <FormLabel>Tipe Makanan</FormLabel>
                <Select
                  placeholder="Pilih Tipe"
                  onChange={event => setAddTypeId(() => event.target.value)}
                >
                  {type &&
                    type.map(item => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <ModalFooter>
                <Button colorScheme="green" mr={3} type="submit">
                  Add
                </Button>
                <Button onClick={cancelHandler}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* ADD SERVING MODAL */}
      <Modal isOpen={isOpen2} onClose={cancelHandler2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Bahan</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={addServingHandler}>
              <FormControl isRequired>
                <FormLabel>Nama</FormLabel>
                <Input
                  placeholder="Nama penyajian"
                  onChange={event => setAddName(() => event.target.value)}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Deskripsi</FormLabel>
                <Input
                  placeholder="Deskripsi"
                  onChange={event =>
                    setAddDescription(() => event.target.value)
                  }
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Image URL</FormLabel>
                <Input
                  placeholder="Image URL"
                  onChange={event => setAddImageUrl(() => event.target.value)}
                />
              </FormControl>

              <FormControl mt={4} id="foodingredient" isRequired>
                <FormLabel>Bahan Utama</FormLabel>
                <Select
                  placeholder="Pilih Bahan Utama"
                  onChange={event =>
                    setAddIngredientId(() => event.target.value)
                  }
                >
                  {ingredient &&
                    ingredient.map(item => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <FormControl mt={4} id="foodbroth" isRequired>
                <FormLabel>Berkuah / Tidak Berkuah</FormLabel>
                <Select
                  placeholder="Pilih Opsi"
                  onChange={event => setAddBrothId(() => event.target.value)}
                >
                  {broth &&
                    broth.map(item => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <ModalFooter>
                <Button colorScheme="green" mr={3} type="submit">
                  Add
                </Button>
                <Button onClick={cancelHandler2}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFood;
