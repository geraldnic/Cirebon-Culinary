import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

import { BiArrowBack } from 'react-icons/bi';

import CriteriaCard from '../components/rekomendasi/criteriaCard';
import MapComponent from '../components/rekomendasi/map';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Center,
  Image,
  Stack,
  Heading,
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  CardFooter,
  ButtonGroup,
  Flex,
} from '@chakra-ui/react';
import HistoryTable from '../components/rekomendasi/historyTable';

const styles = [
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

const Rekomendasi = props => {
  const [marker, setMarker] = useState([]);
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

  const [selectedPlace, setSelectedPlace] = useState();

  useEffect(() => {
    axios.get('http://localhost:3001/marker/getmarker').then(res => {
      setMarker(res?.data ?? []);
    });

    axios.get('http://localhost:3001/food/gettype').then(res => {
      setType(res?.data ?? []);
    });
  }, []);

  useEffect(() => {
    if (selectedType.id) {
      const getIngredient = async () => {
        try {
          await axios
            .post('http://localhost:3001/food/getingredient', {
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

  useEffect(() => {
    if (selectedIngredient.id) {
      const getBroth = async () => {
        try {
          await axios
            .post('http://localhost:3001/food/getbroth', {
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

  useEffect(() => {
    if (selectedBroth.id) {
      const getServing = async () => {
        try {
          await axios
            .post('http://localhost:3001/food/getserving', {
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

  useEffect(() => {
    if (selectedServing.id) {
      const getFood = async () => {
        try {
          await axios
            .post('http://localhost:3001/food/getfoodresult', {
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

  console.log(food);

  const styledMap = new props.google.maps.StyledMapType(styles, {
    name: 'Styled Map',
  });

  const handleClick = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    console.log(`Clicked at (${lat}, ${lng})`);
  };

  const handleMarkerClick = e => {
    console.log('Marker Clicked!', e);
    const place = e.name;
    const location = e.position;
    setSelectedPlace({
      name: place,
      location: {
        lat: location.lat,
        lng: location.lng,
      },
    });
  };

  const reset = () => {
    setSelectedType({});
    setSelectedIngredient({});
    setSelectedBroth({});
    setSelectedServing({});
  };

  const renderMapComponent = () => {
    if (!selectedPlace) {
      return (
        <MapComponent
          google={props.google}
          handleClick={handleClick}
          marker={marker}
          handleMarkerClick={handleMarkerClick}
        />
      );
    }
    return null;
  };

  const renderTypeCard = () => {
    if (selectedPlace && !selectedType.id) {
      return (
        <Box m={5}>
          <Button colorScheme="yellow" onClick={() => setSelectedPlace()}>
            <BiArrowBack /> Back
          </Button>
          <Box maxW="1100px" align="center" mx="auto">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              align="center"
              mt={[5, null, null]}
              mb={10}
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
            <Box mt={20} align="center">
              <HistoryTable
                place={selectedPlace.name}
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
          <Box m={5}>
            <Button colorScheme="yellow" onClick={() => setSelectedType({})}>
              <BiArrowBack /> Back
            </Button>
            <Box maxW="1100px" align="center" mx="auto">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                align="center"
                mt={[5, null, null]}
                mb={10}
              >
                Silahkan Pilih Tipe Makanan yang Diinginkan
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
                  place={selectedPlace.name}
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
          <Box m={5} className="container">
            <Button
              colorScheme="yellow"
              onClick={() => setSelectedIngredient({})}
            >
              <BiArrowBack /> Back
            </Button>
            <Box maxW="1100px" align="center" mx="auto">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                align="center"
                mt={[5, null, null]}
                mb={10}
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
                  place={selectedPlace.name}
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
          <Box m={5} className="container">
            <Button colorScheme="yellow" onClick={() => setSelectedBroth({})}>
              <BiArrowBack /> Back
            </Button>
            <Box maxW="1100px" align="center" mx="auto">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                align="center"
                mt={[5, null, null]}
                mb={10}
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
                  place={selectedPlace.name}
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
        <Box m={5} className="container">
          <Button colorScheme="yellow" onClick={() => setSelectedServing({})}>
            <BiArrowBack /> Back
          </Button>
          <Box maxW="1100px" align="center" mx="auto">
          <Center>
            <Flex>
              <Box className="container">
                {food.map(item => (
                  <Card maxW="sm" align="center" mx="auto">
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      align="center"
                      mt={5}
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
                        <Heading size="md">{item.name}</Heading>
                        <Text>{item.description}</Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Button variant="solid" colorScheme="blue">
                          Cari Tempat Kuliner
                        </Button>
                        <Button
                          variant="ghost"
                          colorScheme="blue"
                          onClick={reset}
                        >
                          Cari menu lain
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                ))}
              </Box>
            </Flex>
          </Center>
          <Box mt={10} align="center">
            <HistoryTable
              place={selectedPlace.name}
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
    <div className="container">
      {renderMapComponent()}
      {renderTypeCard()}
      {renderIngredientCard()}
      {renderBrothCard()}
      {renderServingCard()}
      {renderFoodCard()}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDoQbL_paQvMmzGLuKhOLjqiOgaaXeOxDw',
})(Rekomendasi);
