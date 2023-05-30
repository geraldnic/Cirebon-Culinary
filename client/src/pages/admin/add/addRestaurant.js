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

import AuthModal from '../../../components/auth/modal';

import axios from 'axios';

import { MdRestaurantMenu } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';

const AddRestaurant = () => {
  // Temp State
  const [name, setName] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [foodId, setFoodId] = useState(['']);
  const [price, setPrice] = useState();
  const [service, setService] = useState();
  const [taste, setTaste] = useState();

  // Fetch State
  const [food, setFood] = useState();

  const [modalProps, setModalProps] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(process.env.SERVERURL + '/food/getfood').then(res => {
      setFood(res?.data ?? []);
    });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async event => {
    event.preventDefault();

    try {
      const nonEmptyFoodId = foodId.filter(id => id.trim() !== '');
      const response = await axios.post(
        process.env.SERVERURL + '/restaurant/addrestaurant',
        {
          name,
          imageUrl,
          position: {
            lat: latitude,
            lng: longitude,
          },
          foodId: nonEmptyFoodId,
          price,
          service,
          taste,
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
                      <MdRestaurantMenu />
                    </Circle>
                  </Center>
                  <Heading fontSize={'4xl'} textAlign="center">
                    Tambah Tempat Kuliner
                  </Heading>
                </Stack>
                <FormControl id="name" isRequired>
                  <FormLabel>Nama</FormLabel>
                  <Input
                    type="text"
                    onChange={event => setName(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="imageUrl" isRequired>
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    type="text"
                    onChange={event => setImageUrl(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="latitude" isRequired>
                  <FormLabel>Position (Latitude)</FormLabel>
                  <Input
                    type="number"
                    step="0.0000001"
                    onChange={event => setLatitude(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="longitude" isRequired>
                  <FormLabel>Position (Longitude)</FormLabel>
                  <Input
                    type="number"
                    step="0.0000001"
                    onChange={event => setLongitude(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="foodId" isRequired>
                  <FormLabel>
                    Food(s)
                    <Button
                      size="sm"
                      ml={2}
                      onClick={() =>
                        setFoodId(prevFoodId => [...prevFoodId, ''])
                      }
                    >
                      <BsPlus />
                    </Button>
                  </FormLabel>
                  {foodId.map((id, index) => (
                    <Flex key={index} alignItems="center" mb={2}>
                      <Select
                        key={index}
                        placeholder="Pilih Tipe"
                        value={id}
                        onChange={event => {
                          const updatedFoodId = [...foodId];
                          updatedFoodId[index] = event.target.value;
                          setFoodId(updatedFoodId);
                        }}
                      >
                        {food &&
                          food.map(item => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                      </Select>
                      {index !== 0 && (
                        <Button
                          size="sm"
                          ml={2}
                          onClick={() => {
                            const updatedFoodId = [...foodId];
                            updatedFoodId.splice(index, 1);
                            setFoodId(updatedFoodId);
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </Flex>
                  ))}
                </FormControl>
                <FormControl id="price" isRequired>
                  <FormLabel>Harga</FormLabel>
                  <Input
                    type="number"
                    step="0.1"
                    onChange={event => setPrice(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="service" isRequired>
                  <FormLabel>Pelayanan</FormLabel>
                  <Input
                    type="number"
                    step="0.1"
                    onChange={event => setService(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="taste" isRequired>
                  <FormLabel>Rasa</FormLabel>
                  <Input
                    type="number"
                    step="0.1"
                    onChange={event => setTaste(() => event.target.value)}
                  />
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
    </>
  );
};

export default AddRestaurant;
