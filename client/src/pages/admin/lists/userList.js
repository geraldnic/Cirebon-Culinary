import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Center,
  Circle,
  Heading,
  FormControl,
  Input,
  Button,
  FormLabel,
  Flex,
  Box,
} from '@chakra-ui/react';

import { FaLock } from 'react-icons/fa';
import AuthModal from '../../../components/auth/modal';

const UserList = () => {
  const [username, setUsername] = useState('');
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalProps, setModalProps] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const item = localStorage.getItem('username');
    if (item) {
      setUsername(item);
    }
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
      const response = await axios.put(
        process.env.REACT_APP_SERVERURL + '/auth/changepassword',
        {
          username,
          currPassword,
          newPassword,
        }
      );

      if (response.data.code === 200) {
        navigate('/admin');
      }

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
    <Flex minH={'90vh'} align={'center'} justify={'center'} bg="black">
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg="#ADEFD1FF"
          boxShadow={'lg'}
          p={8}
          maxW="450px"
          w="90vw"
        >
          <form onSubmit={onSubmit}>
            <Stack spacing={4} color="#00203D" borderColor="#00203D">
              <Center>
                <Circle size={14} border="1px" borderColor="black">
                  <FaLock />
                </Circle>
              </Center>
              <Heading fontSize={'4xl'} pb={5} align="center">
                Manage Admin
              </Heading>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  onChange={event => setUsername(event.target.value)}
                  style={{
                    borderColor: '#00203D',
                    '&:focus': {
                      borderColor: '#0059A9',
                    },
                  }}
                  defaultValue={username}
                  disabled
                />
              </FormControl>
              <FormControl id="currentpassword">
                <FormLabel>Current Password</FormLabel>
                <Input
                  type="password"
                  onChange={event => setCurrPassword(event.target.value)}
                  style={{
                    borderColor: '#00203D',
                    '&:focus': {
                      borderColor: '#0059A9',
                    },
                  }}
                />
              </FormControl>
              <FormControl id="newpassword">
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  onChange={event => setNewPassword(event.target.value)}
                  style={{
                    borderColor: '#00203D',
                    '&:focus': {
                      borderColor: '#0059A9',
                    },
                  }}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  size="lg"
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Change Password
                </Button>
              </Stack>
            </Stack>
          </form>
          <AuthModal
            messageTitle={modalProps.messageTitle}
            messageContent={modalProps.messageContent}
            closeCaption={modalProps.closeCaption}
            link={modalProps.link}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </Box>
      </Stack>
    </Flex>
  );
};

export default UserList;
