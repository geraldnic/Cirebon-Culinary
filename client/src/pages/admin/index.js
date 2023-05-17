import React from 'react';
import CrudCard from '../../components/admin/CrudCard';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomeAdmin = () => {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    }
  return (
    <div>
      <Box m={[5, null, 20]} className="containerasu">
        <Text fontSize="2xl" fontWeight="bold" align="center" mt={7} mb={10}>
          Hello, Admin!
        </Text>
        <SimpleGrid columns={[1, null, 2]} spacing={[5, null, 10]}>
          <CrudCard
            name={'Makanan'}
            description={'Tampilkan semua menu makanan yang tersedia'}
            imageUrl={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMsgQ3FmLb1YO-jipCwYCfa51o6bnNt2VsQg&usqp=CAU'
            }
            handleNavigate={handleNavigate}
            path={'foodlist'}
          />
          <CrudCard
            name={'Tempat Kuliner'}
            description={'Tampilkan semua tempat kuliner yang tersedia'}
            imageUrl={
              'https://easydrawingguides.com/wp-content/uploads/2022/11/how-to-draw-a-restaurant-featured-image-1200-1024x1024.png'
            }
            handleNavigate={handleNavigate}
            path={'restaurantlist'}
          />
          <CrudCard
            name={'Tempat Wisata'}
            description={'Tampilkan semua tempat wisata yang tersedia'}
            imageUrl={
              'https://img.freepik.com/premium-vector/map-icon-isometric-with-destination-location-pin-pointer-illustration-flat-cartoon_101884-839.jpg?w=2000'
            }
            handleNavigate={handleNavigate}
            path={'touristattractionlist'}
          />
    <CrudCard
            name={'Admin'}
            description={'Manage account'}
            imageUrl={
              'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
            }
            handleNavigate={handleNavigate}
            path={'userlist'}
          />
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default HomeAdmin;
