import React, { useState, useEffect, useContext, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import WeatherContext from '../context/weatherContext';

const Map = () => {
  const weatherContext = useContext(WeatherContext);

  const {
    getMarkerLocationWeather,
    location,
    latitude,
    longitude,
    clearLatLng,
  } = weatherContext;

  const [weatherCard, setWeatherCard] = useState(false);

  const [latLng, setLatLng] = useState({ lat: '', lng: '' });

  const onSetLatLng = () => {
    setLatLng({
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    });
  };

  const onReset = (e) => {
    clearLatLng();
    setLatLng({
      lat: (latLng.lat = parseFloat(e.latLng.lat())),
      lng: (latLng.lng = parseFloat(e.latLng.lng())),
    });
  };

  const onShowWeatherCard = () => {
    setWeatherCard((weatherCard) => !weatherCard);
  };

  const { lat, lng } = latLng;

  const mapRef = useRef();

  const onMapRef = () => {
    mapRef.current.panTo({
      lat: !lat ? 25.395969 : lat,
      lng: !lng ? 68.357773 : lng,
    });
  };

  useEffect(() => {
    getMarkerLocationWeather(lat, lng);
    if (latitude !== null && longitude !== null) {
      onSetLatLng();
    }
    if (weatherCard === false) {
      onMapRef();
    }
  }, [lat, lng, latitude, longitude]);

  return (
    <GoogleMap defaultZoom={10} ref={mapRef} onClick={onReset}>
      <Marker
        position={{
          lat: lat,
          lng: lng,
        }}
        onClick={onShowWeatherCard}
      >
        {weatherCard && (
          <InfoWindow onCloseClick={onShowWeatherCard}>
            <div>
              <p>Location Name: {location.name}</p>
              <p>Temperature: {location.main.temp} C</p>
              <p>Temperature Max: {location.main.temp_max} C</p>
              <p>Temperature Min: {location.main.temp_min} C</p>
              <p>Feels Like: {location.main.feels_like} C</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  );
};

export default Map;
