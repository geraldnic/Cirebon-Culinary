import React, { useEffect, useState } from 'react';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Circle,
} from '@chakra-ui/react';

import { MdRestaurantMenu } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';

import axios from 'axios';

import AuthModal from '../../../components/auth/modal';
import { useParams } from 'react-router-dom';

const EditRestaurant = () => {
  const [name, setName] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [foodId, setFoodId] = useState([]);
  const [price, setPrice] = useState();
  const [service, setService] = useState();
  const [taste, setTaste] = useState();
  const [modalProps, setModalProps] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState();

  const { id } = useParams();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchSpecificRestaurant = async () => {
      await axios
        .post(process.env.SERVERURL + '/restaurant/getspecificrestaurant', {
          id,
        })
        .then(res => {
          setCurrentRestaurant(res?.data ?? []);
        });
    };
    fetchSpecificRestaurant();
  }, []);

  useEffect(() => {
    if (currentRestaurant) {
      setName(currentRestaurant.name);
      setImageUrl(currentRestaurant.imageUrl);
      setLatitude(currentRestaurant.position.lat);
      setLongitude(currentRestaurant.position.lng);
      setFoodId(currentRestaurant.foodId);
      setPrice(currentRestaurant.price);
      setService(currentRestaurant.service);
      setTaste(currentRestaurant.taste);
    }
  }, [currentRestaurant]);

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.put(
        process.env.SERVERURL + '/restaurant/editrestaurant',
        {
          id,
          name,
          imageUrl,
          position: {
            lat: latitude,
            lng: longitude,
          },
          foodId,
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
                    Edit Tempat Kuliner
                  </Heading>
                </Stack>
                <FormControl id="name" isRequired>
                  <FormLabel>Nama</FormLabel>
                  <Input
                    type="text"
                    defaultValue={name}
                    onChange={event => setName(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="imageUrl" isRequired>
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    type="text"
                    defaultValue={imageUrl}
                    onChange={event => setImageUrl(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="latitude" isRequired>
                  <FormLabel>Position (Latitude)</FormLabel>
                  <Input
                    type="number"
                    defaultValue={latitude}
                    step="0.0000001"
                    onChange={event => setLatitude(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="longitude" isRequired>
                  <FormLabel>Position (Longitude)</FormLabel>
                  <Input
                    type="number"
                    defaultValue={longitude}
                    step="0.0000001"
                    onChange={event => setLongitude(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="foodId" isRequired>
                  <FormLabel>
                    Food ID(s)
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
                      <Input
                        key={index}
                        type="text"
                        value={id}
                        mt={2}
                        onChange={event => {
                          const updatedFoodId = [...foodId];
                          updatedFoodId[index] = event.target.value;
                          setFoodId(updatedFoodId);
                        }}
                      />
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
                    defaultValue={price}
                    step="0.1"
                    onChange={event => setPrice(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="service" isRequired>
                  <FormLabel>Pelayanan</FormLabel>
                  <Input
                    type="number"
                    defaultValue={service}
                    step="0.1"
                    onChange={event => setService(() => event.target.value)}
                  />
                </FormControl>
                <FormControl id="taste" isRequired>
                  <FormLabel>Rasa</FormLabel>
                  <Input
                    type="number"
                    defaultValue={taste}
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
                    Edit
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

export default EditRestaurant;
