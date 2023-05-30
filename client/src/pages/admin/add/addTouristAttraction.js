import React, { useState } from 'react';

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
} from '@chakra-ui/react';

import axios from 'axios';

import AuthModal from '../../../components/auth/modal';

const AddTouristAttraction = () => {
  const [name, setName] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [modalProps, setModalProps] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVERURL + '/marker/addmarker',
        {
          name,
          position: {
            lat: latitude,
            lng: longitude,
          },
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
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Tambah Tempat Wisata</Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="name">
                  <FormLabel>Nama</FormLabel>
                  <Input
                    type="text"
                    onChange={event => setName(event.target.value)}
                  />
                </FormControl>
                <FormControl id="latitude">
                  <FormLabel>Position (Latitude)</FormLabel>
                  <Input
                    type="number"
                    step="0.0000001"
                    onChange={event => setLatitude(event.target.value)}
                  />
                </FormControl>
                <FormControl id="longitude">
                  <FormLabel>Position (Longitude)</FormLabel>
                  <Input
                    type="number"
                    step="0.0000001"
                    onChange={event => setLongitude(event.target.value)}
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

export default AddTouristAttraction;
