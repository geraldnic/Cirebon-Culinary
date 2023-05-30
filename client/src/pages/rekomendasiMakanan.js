import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Box,
  Button,
  Text,
  SimpleGrid,
  Center,
  Flex,
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Image,
} from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import CriteriaCard from '../components/rekomendasi/criteriaCard';

import HistoryTable from '../components/rekomendasi/historyTable';

const RekomendasiMakanan = () => {
  const [type, setType] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [broth, setBroth] = useState([]);
  const [serving, setServing] = useState([]);
  const [food, setFood] = useState([]);

  const [selectedType, setSelectedType] = useState({
    id: '',
    name: '',
  });
  const [selectedIngredient, setSelectedIngredient] = useState({
    id: '',
    name: '',
  });
  const [selectedBroth, setSelectedBroth] = useState({
    id: '',
    name: '',
  });
  const [selectedServing, setSelectedServing] = useState({
    id: '',
    name: '',
  });
  const [selectedFood, setSelectedFood] = useState({
    id: '',
    name: '',
  });

  //FETCH FOOD TYPE
  useEffect(() => {
    axios.get(process.env.SERVERURL + '/food/gettype').then(res => {
      setType(res?.data ?? []);
    });
  }, []);

  //FETCH FOOD INGREDIENT
  useEffect(() => {
    if (selectedType.id) {
      const getIngredient = async () => {
        try {
          await axios
            .post(process.env.SERVERURL + '/food/getingredient', {
              typeId: selectedType.id,
            })
            .then(res => {
              setIngredient(res?.data ?? []);
            });
        } catch (err) {
          console.log('ingredient err', err);
        }
      };
      getIngredient();
    }
  }, [selectedType]);

  //FETCH FOOD BROTH
  useEffect(() => {
    if (selectedIngredient.id) {
      const getBroth = async () => {
        try {
          await axios
            .post(process.env.SERVERURL + '/food/getbroth', {
              ingredientId: selectedIngredient.id,
            })
            .then(res => {
              setBroth(res?.data ?? []);
            });
        } catch (err) {
          console.log('broth err', err);
        }
      };
      getBroth();
    }
  }, [selectedIngredient]);

  //FETCH FOOD SERVING
  useEffect(() => {
    if (selectedBroth.id) {
      const getServing = async () => {
        try {
          await axios
            .post(process.env.SERVERURL + '/food/getserving', {
              ingredientId: selectedIngredient.id,
              brothId: selectedBroth.id,
            })
            .then(res => {
              setServing(res?.data ?? []);
            });
        } catch (err) {
          console.log('serving err', err);
        }
      };
      getServing();
    }
  }, [selectedBroth]);

  //FETCH FOOD RESULT
  useEffect(() => {
    if (selectedServing.id) {
      const getFood = async () => {
        try {
          await axios
            .post(process.env.SERVERURL + '/food/getfoodresult', {
              typeId: selectedType.id,
              ingredientId: selectedIngredient.id,
              brothId: selectedBroth.id,
              servingId: selectedServing.id,
            })
            .then(res => {
              setFood(res?.data ?? []);
            });
        } catch (err) {
          console.log('food err', err);
        }
      };
      getFood();
    }
  }, [selectedServing]);

  const reset = () => {
    setSelectedType({});
    setSelectedIngredient({});
    setSelectedBroth({});
    setSelectedServing({});
  };

  console.log(type);
  console.log(ingredient);
  console.log(broth);
  console.log(serving);
  console.log(food);

  const renderTypeCard = () => {
    if (!selectedType.id) {
      return (
        <Box mx={5}>
          <Box
            maxW="1100px"
            align="center"
            mx="auto"
            bg="#00203D"
            px={10}
            pb={10}
            pt={5}
            borderRadius="10px"
            mt={[5, null, null]}
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              align="center"
              mt={[5, null, null]}
              mb={10}
              color="#ADEFD1FF"
            >
              Silahkan Pilih Tipe Makanan yang Diinginkan
            </Text>
            <SimpleGrid columns={[1, null, 2]} spacing={[5, null, 10]}>
              {type.map(item => (
                <CriteriaCard
                  key={item._id}
                  category="type"
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  setCriteria={setSelectedType}
                />
              ))}
            </SimpleGrid>
            <Box mt={10} align="center">
              <HistoryTable
                type={selectedType.name}
                ingredient={selectedIngredient.name}
                broth={selectedBroth.name}
                serving={selectedServing.name}
              />
            </Box>
          </Box>
        </Box>
      );
    }
    return null;
  };

  const renderIngredientCard = () => {
    if (selectedType.id && !selectedIngredient.id) {
      return (
        <>
          <Box mx={5}>
            <Button colorScheme="yellow" onClick={() => setSelectedType({})}>
              <BiArrowBack /> Back
            </Button>
            <Box
              maxW="1100px"
              align="center"
              mx="auto"
              bg="#00203D"
              px={10}
              pb={10}
              pt={5}
              borderRadius="10px"
              mt={[5, null, null]}
            >
              <Text
                fontSize="2xl"
                fontWeight="bold"
                align="center"
                mt={[5, null, null]}
                mb={10}
                color="#ADEFD1FF"
              >
                Silahkan Pilih Bahan Utama
              </Text>
              <SimpleGrid columns={[1, null, 2]} spacing={[5, null, 10]}>
                {ingredient.map(item => (
                  <CriteriaCard
                    key={item._id}
                    category="ingredient"
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    setCriteria={setSelectedIngredient}
                  />
                ))}
              </SimpleGrid>
              <Box mt={10} align="center">
                <HistoryTable
                  type={selectedType.name}
                  ingredient={selectedIngredient.name}
                  broth={selectedBroth.name}
                  serving={selectedServing.name}
                />
              </Box>
            </Box>
          </Box>
        </>
      );
    }
    return null;
  };

  const renderBrothCard = () => {
    if (selectedIngredient.id && !selectedBroth.id) {
      return (
        <>
          <Box mx={5} className="container">
            <Button
              colorScheme="yellow"
              onClick={() => setSelectedIngredient({})}
            >
              <BiArrowBack /> Back
            </Button>
            <Box
              maxW="1100px"
              align="center"
              mx="auto"
              bg="#00203D"
              px={10}
              pb={10}
              pt={5}
              borderRadius="10px"
              mt={[5, null, null]}
            >
              <Text
                fontSize="2xl"
                fontWeight="bold"
                align="center"
                mt={[5, null, null]}
                mb={10}
                color="#ADEFD1FF"
              >
                Apakah Kamu Mau Makanan Kamu Berkuah / Tidak berkuah?
              </Text>
              <SimpleGrid columns={[1, null, 2]} spacing={[5, null, 10]}>
                {broth.map(item => (
                  <CriteriaCard
                    key={item._id}
                    category="broth"
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    setCriteria={setSelectedBroth}
                  />
                ))}
              </SimpleGrid>
              <Box mt={10} align="center">
                <HistoryTable
                  type={selectedType.name}
                  ingredient={selectedIngredient.name}
                  broth={selectedBroth.name}
                  serving={selectedServing.name}
                />
              </Box>
            </Box>
          </Box>
        </>
      );
    }
    return null;
  };

  const renderServingCard = () => {
    if (selectedIngredient.id && selectedBroth.id && !selectedServing.id) {
      return (
        <>
          <Box mx={5} className="container">
            <Button colorScheme="yellow" onClick={() => setSelectedBroth({})}>
              <BiArrowBack /> Back
            </Button>
            <Box
              maxW="1100px"
              align="center"
              mx="auto"
              bg="#00203D"
              px={10}
              pb={10}
              pt={5}
              borderRadius="10px"
              mt={[5, null, null]}
            >
              <Text
                fontSize="2xl"
                fontWeight="bold"
                align="center"
                mt={[5, null, null]}
                mb={10}
                color="#ADEFD1FF"
              >
                Silahkan Pilih Penyajian yang Diinginkan
              </Text>
              <SimpleGrid columns={[1, null, 2]} spacing={[5, null, 10]}>
                {serving.map(item => (
                  <CriteriaCard
                    key={item._id}
                    category="serving"
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    setCriteria={setSelectedServing}
                  />
                ))}
              </SimpleGrid>
              <Box mt={10} align="center">
                <HistoryTable
                  type={selectedType.name}
                  ingredient={selectedIngredient.name}
                  broth={selectedBroth.name}
                  serving={selectedServing.name}
                />
              </Box>
            </Box>
          </Box>
        </>
      );
    }
    return null;
  };

  const renderFoodCard = () => {
    if (selectedServing.id && food && !selectedFood.id) {
      return (
        <Box mx={5} className="container">
          <Button colorScheme="yellow" onClick={() => setSelectedServing({})}>
            <BiArrowBack /> Back
          </Button>
          <Box maxW="1100px" align="center" mx="auto">
            <Center>
              <Flex>
                <Box className="container">
                  {food.map(item => (
                    <Card maxW="sm" align="center" mx="auto" bg="#00203D">
                      <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        align="center"
                        mt={5}
                        color="#FF3521"
                      >
                        Makanan Sesuai Kriteriamu
                      </Text>
                      <CardBody>
                        <Image src={item.imageUrl} borderRadius="lg" />
                        <Stack mt="6" spacing="3">
                          <Text
                            color={'green.500'}
                            textTransform={'uppercase'}
                            fontWeight={800}
                            fontSize={'sm'}
                            letterSpacing={1.1}
                          >
                            {selectedType.name +
                              ' - ' +
                              selectedIngredient.name +
                              ' - ' +
                              selectedBroth.name +
                              ' - ' +
                              selectedServing.name}
                          </Text>
                        </Stack>
                        <Stack mt="6" spacing="3">
                          <Heading size="md" color="#FF3521">
                            {item.name}
                          </Heading>
                          <Text color="#E7A238">{item.description}</Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter w="100%" maxW="300px">
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          w="100%"
                          onClick={reset}
                        >
                          Cari Menu Lain
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </Box>
              </Flex>
            </Center>
            <Box mt={10} align="center">
              <HistoryTable
                type={selectedType.name}
                ingredient={selectedIngredient.name}
                broth={selectedBroth.name}
                serving={selectedServing.name}
              />
            </Box>
          </Box>
        </Box>
      );
    }
  };
  return (
    <Box bg="black" pt={10}>
      {renderTypeCard()}
      {renderIngredientCard()}
      {renderBrothCard()}
      {renderServingCard()}
      {renderFoodCard()}
    </Box>
  );
};

export default RekomendasiMakanan;
