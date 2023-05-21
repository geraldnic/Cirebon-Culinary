import CaptionCarousel from '../components/carousel';
import { getDistance } from 'geolib';

const Home = () => {
    const place1 = {
        latitude: -6.7263,
        longitude: 108.571
      };
      
      const place2 = {
        latitude: -6.6978,
        longitude: 108.5561
      };

      const distance = getDistance(
        { latitude: place1.latitude, longitude: place1.longitude },
        { latitude: place2.latitude, longitude: place2.longitude }
      );

      console.log(distance + " meters");
  return <CaptionCarousel />;
};

export default Home;
