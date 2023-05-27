import React from 'react';

import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Text,
} from '@chakra-ui/react';

const CrudCard = ({ name, description, imageUrl, path, handleNavigate }) => {
  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        bg="#F4B41A" 
      >
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={imageUrl}
        />

        <Stack>
          <CardBody>
            <Heading size="md" color="#00203D">{name}</Heading>

            <Text py="2" color="#00203D">{description}</Text>
          </CardBody>

          <CardFooter>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => handleNavigate(path)}
            >
              Pilih
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};

export default CrudCard;
