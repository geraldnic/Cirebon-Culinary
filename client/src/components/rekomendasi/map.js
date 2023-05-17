import { Map, Marker } from 'google-maps-react';
import { Text } from '@chakra-ui/react';
import React from 'react';
import axios from 'axios';

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

const MapComponent = props => {

  const center = {
    lat: -6.731329609339904,
    lng: 108.55223863249364,
  };

  const styledMap = new props.google.maps.StyledMapType(styles, {
    name: 'Styled Map',
  });

  return (
    <div className="container">
          <Text fontSize="2xl" fontWeight="bold" align="center" mt={7} mb={3}>
            Silahkan Pilih Tempat Wisata yang Dikunjungi
          </Text>
          <Map
            google={props.google}
            initialCenter={center}
            center={center}
            onClick={props.handleClick}
            zoom={12}
            style={{
              width: '80%',
              height: '450px',
              display: 'block',
              margin: '0 auto',
            }}
            className="map"
            onReady={(mapProps, map) => {
              map.mapTypes.set('styled_map', styledMap);
              map.setMapTypeId('styled_map');
            }}
            mapTypeControl={false}
          >
            {props.marker.map(item => {
              return (
                <Marker
                  key={`${item._id} + keyextractor`}
                  onClick={props.handleMarkerClick}
                  name={item.name}
                  position={{ lat: item.position.lat, lng: item.position.lng }}
                  label={{
                    text: item.name,
                    color: '#133A1B',
                  }}
                />
              );
            })}
          </Map>
    </div>
  );
};

export default MapComponent;
