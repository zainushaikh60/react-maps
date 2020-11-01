import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import axios from 'axios';

const Map = () => {
  const [latLng, setLatLng] = useState({ lat: '', lng: '' });
  const [location, setLocation] = useState([]);
  const [weatherCard, setWeatherCard] = useState(false);

  const onSetLatLng = (e) => {
    setLatLng({
      lat: (latLng.lat = parseFloat(e.latLng.lat())),
      lng: (latLng.lng = parseFloat(e.latLng.lng())),
    });
  };

  const onShowWeatherCard = () => {
    setWeatherCard((weatherCard) => !weatherCard);
  };

  const { lat, lng } = latLng;

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;

    const getCurrentWeather = async () => {
      try {
        const mapLocation = await axios.get(url);
        setLocation(mapLocation.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getCurrentWeather();
  }, [lat, lng]);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 25.395969, lng: 68.357773 }}
      onClick={onSetLatLng}
    >
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
