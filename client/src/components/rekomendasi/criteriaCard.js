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

const CriteriaCard = ({ name, id, description, imageUrl, setCriteria }) => {
  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={imageUrl}
        />

        <Stack>
          <CardBody>
            <Heading size="md" align='left'>{name}</Heading>

            <Text py="2" align='left'>{description}</Text>
          </CardBody>

          <CardFooter>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => setCriteria({ id, name })}
            >
              Pilih
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};

export default CriteriaCard;
