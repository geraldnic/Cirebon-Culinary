import { GoogleApiWrapper } from 'google-maps-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
import FindRestaurant from '../components/rekomendasi/findRestaurant';

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
  const [selectedCriteria, setSelectedCriteria] = useState({
    id: '',
    name: '',
  });
  const [selectedPlace, setSelectedPlace] = useState();

  const [priceToService, setPriceToService] = useState();
  const [serviceToPrice, setServiceToPrice] = useState();
  const [priceToTaste, setPriceToTaste] = useState();
  const [tasteToPrice, setTasteToPrice] = useState();
  const [priceToDistance, setPriceToDistance] = useState();
  const [distanceToPrice, setDistanceToPrice] = useState();
  const [serviceToTaste, setServiceToTaste] = useState();
  const [tasteToService, setTasteToService] = useState();
  const [serviceToDistance, setServiceToDistance] = useState();
  const [distanceToService, setDistanceToService] = useState();
  const [tasteToDistance, setTasteToDistance] = useState();
  const [distanceToTaste, setDistanceToTaste] = useState();
  const [priceToPrice, setPriceToPrice] = useState();
  const [serviceToService, setServiceToService] = useState();
  const [tasteToTaste, setTasteToTaste] = useState();
  const [distanceToDistance, setDistanceToDistance] = useState();

  console.log(priceToService);
  console.log(serviceToPrice);
  console.log(priceToTaste);
  console.log(tasteToPrice);
  console.log(priceToDistance);
  console.log(distanceToPrice);
  console.log(serviceToTaste);
  console.log(tasteToService);
  console.log(serviceToDistance);
  console.log(distanceToService);
  console.log(tasteToDistance);
  console.log(distanceToTaste);
  console.log(serviceToService);
  console.log(tasteToTaste);
  console.log(distanceToDistance);

  //FETCH MARKER AND FOOD TYPE
  useEffect(() => {
    axios.get('http://localhost:3001/marker/getmarker').then(res => {
      setMarker(res?.data ?? []);
    });

    axios.get('http://localhost:3001/food/gettype').then(res => {
      setType(res?.data ?? []);
    });
  }, []);

  //FETCH FOOD INGREDIENT
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

  //FETCH FOOD BROTH
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

  //FETCH FOOD SERVING
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

  //FETCH FOOD RESULT
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

  //AHP
  const calcValue = (price, service, taste, distance) => {
    let pts, stp, ptt, ttp, ptd, dtp, stt, tts, std, dts, ttd, dtt;
    let ptp = 1;
    let sts = 1;
    let ttt = 1;
    let dtd = 1;

    if (price < service) {
      pts = 1 / ((price - service) * -1 + 1);
      stp = (price - service) * -1 + 1;
    } else if (price > service) {
      pts = price - service + 1;
      stp = 1 / (price - service + 1);
    } else {
      pts = 1;
      stp = 1;
    }

    if (price < taste) {
      ptt = 1 / ((price - taste) * -1 + 1);
      ttp = (price - taste) * -1 + 1;
    } else if (price > taste) {
      ptt = price - taste + 1;
      ttp = 1 / (price - taste + 1);
    } else {
      ptt = 1;
      ttp = 1;
    }

    if (price < distance) {
      ptd = 1 / ((price - distance) * -1 + 1);
      dtp = (price - distance) * -1 + 1;
    } else if (price > distance) {
      ptd = price - distance + 1;
      dtp = 1 / (price - distance + 1);
    } else {
      ptd = 1;
      dtp = 1;
    }

    if (service < taste) {
      stt = 1 / ((service - taste) * -1 + 1);
      tts = (service - taste) * -1 + 1;
    } else if (service > taste) {
      stt = service - taste + 1;
      tts = 1 / (service - taste + 1);
    } else {
      stt = 1;
      tts = 1;
    }

    if (service < distance) {
      std = 1 / ((service - distance) * -1 + 1);
      dts = (service - distance) * -1 + 1;
    } else if (service > distance) {
      std = service - distance + 1;
      dts = 1 / (service - distance + 1);
    } else {
      std = 1;
      dts = 1;
    }

    if (taste < distance) {
      ttd = 1 / ((taste - distance) * -1 + 1);
      dtt = (taste - distance) * -1 + 1;
    } else if (taste > distance) {
      ttd = taste - distance + 1;
      dtt = 1 / (taste - distance + 1);
    } else {
      ttd = 1;
      dtt = 1;
    }

    //Matrix Berpasangan Kriteria
    let c1 = [ptp, pts, ptt, ptd];
    let c2 = [stp, sts, stt, std];
    let c3 = [ttp, tts, ttt, ttd];
    let c4 = [dtp, dts, dtt, dtd];
    let total = [];
    for (let i = 0; i < 4; i++) {
      total[i] = c1[i] + c2[i] + c3[i] + c4[i];
    }

    //Matrix Ternormalisasi
    for (let i = 0; i < 4; i++) {
      c1[i] = c1[i] / total[i];
      c2[i] = c2[i] / total[i];
      c3[i] = c3[i] / total[i];
      c4[i] = c4[i] / total[i];
    }

    //Jumlah tiap kolom pada matrix
    let jumlah = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      jumlah[0] = jumlah[0] + c1[i];
    }
    for (let i = 0; i < 4; i++) {
      jumlah[1] = jumlah[1] + c2[i];
    }
    for (let i = 0; i < 4; i++) {
      jumlah[2] = jumlah[2] + c3[i];
    }
    for (let i = 0; i < 4; i++) {
      jumlah[3] = jumlah[3] + c4[i];
    }

    //Mencari bobot tiap kriteria (Eigen Vector) 
    let eigen = [];
    for (let i = 0; i < 4; i++) {
      eigen[i] = jumlah[i] / 4;
    }

    //Mengukur konsistensi
    let lambdaMax = 0;
    for (let i = 0; i < 4; i++) {
      lambdaMax = lambdaMax + (eigen[i] * total[i]);
    }

    let CI = 0;
    CI = (lambdaMax-4) / 3;

    let CR = 0;
    CR = CI / 0.9; //CR <= 0.1 === konsisten

    console.log(jumlah);
    console.log(eigen);
    console.log(lambdaMax);
    console.log(CI);
    console.log(CR);

    setPriceToService(pts);
    setServiceToPrice(stp);
    setPriceToTaste(ptt);
    setTasteToPrice(ttp);
    setPriceToDistance(ptd);
    setDistanceToPrice(dtp);
    setServiceToTaste(stt);
    setTasteToService(tts);
    setServiceToDistance(std);
    setDistanceToService(dts);
    setTasteToDistance(ttd);
    setDistanceToTaste(dtt);
    setPriceToPrice(ptp);
    setServiceToService(sts);
    setTasteToTaste(ttt);
    setDistanceToDistance(dtd);
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
                          <Button
                            variant="solid"
                            colorScheme="blue"
                            onClick={() =>
                              setSelectedFood({ id: item._id, name: item.name })
                            }
                          >
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
  const renderRestaurant = () => {
    if (selectedFood.id && !selectedCriteria.id) {
      return (
        <>
          <FindRestaurant calcValue={calcValue} />
        </>
      );
    }
    return null;
  };
  return (
    <div className="container">
      {renderMapComponent()}
      {renderTypeCard()}
      {renderIngredientCard()}
      {renderBrothCard()}
      {renderServingCard()}
      {renderFoodCard()}
      {renderRestaurant()}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDoQbL_paQvMmzGLuKhOLjqiOgaaXeOxDw',
})(Rekomendasi);
