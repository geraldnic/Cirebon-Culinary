import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Center,
  Box,
  Button,
} from '@chakra-ui/react';
import { IoLogoInstagram, IoLogoWhatsapp } from 'react-icons/io';
import { HiOutlineMail } from 'react-icons/hi';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import about from '../assets/about.jpg';

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600} color="#ADEFD1FF">
        {text}
      </Text>
    </Stack>
  );
};

export default function About() {
  return (
    <Center py={10}>
      <Box height="100vh" bg="black">
        <Heading
          color="#14213D"
          align="center"
          mb={10}
          width="100vw"
          bg="#ADEFD1FF"
          py={2}
        >
          This website was developed by
        </Heading>
        <Box bg="black">
          <Container maxW={'5xl'} bg="#14213D" p={10} borderRadius="10px">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Stack spacing={4}>
                <Text
                  textTransform={'uppercase'}
                  color={'blue.400'}
                  fontWeight={600}
                  fontSize={'sm'}
                  bg={useColorModeValue('blue.50', 'blue.900')}
                  p={2}
                  alignSelf={'flex-start'}
                  rounded={'md'}
                >
                  Contact
                </Text>
                <Heading color="#FCA311">Gerald Nicholas Chandra</Heading>
                <Text color={'gray.500'} fontSize={'lg'}>
                  Web Developer
                </Text>
                <Stack
                  spacing={4}
                  divider={
                    <StackDivider
                      borderColor={useColorModeValue('gray.100', 'gray.700')}
                    />
                  }
                >
                  <Feature
                    icon={
                      <Icon
                        as={HiOutlineMail}
                        color={'yellow.500'}
                        w={5}
                        h={5}
                      />
                    }
                    iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                    text={'geraldnicholas.hp@gmail.com'}
                  />
                  <Feature
                    icon={
                      <Icon
                        as={IoLogoWhatsapp}
                        color={'green.500'}
                        w={5}
                        h={5}
                      />
                    }
                    iconBg={useColorModeValue('green.100', 'green.900')}
                    text={'085890525555'}
                  />
                  <Feature
                    icon={
                      <Icon
                        as={IoLogoInstagram}
                        color={'purple.500'}
                        w={5}
                        h={5}
                      />
                    }
                    iconBg={useColorModeValue('purple.100', 'purple.900')}
                    text={'@geraldnic'}
                  />
                </Stack>
              </Stack>
              <Flex>
                <Image
                  rounded={'md'}
                  alt={'feature image'}
                  src={
                    about
                  }
                  objectFit={'cover'}
                />
              </Flex>
            </SimpleGrid>
          </Container>
        </Box>
        <Center py={5} bg="black">
          <Link to="/">
            <Button colorScheme="blue" maxW="350px" width="90vw">
              Back to home
            </Button>
          </Link>
        </Center>
      </Box>
    </Center>
  );
}
