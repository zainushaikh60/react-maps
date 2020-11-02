import React, { useReducer } from 'react';
import axios from 'axios';
import WeatherContext from './weatherContext';
import weatherReducer from './weatherReducer';
import Geocode from 'react-geocode';
import {
  GET_MARKER_LOCATIONS_WEATHER,
  GET_ENTERED_LOCATION_WEATHER,
  CLEAR_LAT_LNG,
  ERROR,
} from './types';

Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);

const WeatherState = (props) => {
  const initialState = {
    latitude: '',
    longitude: '',
    location: [],
    error: '',
  };

  // Get marker location weather

  const getMarkerLocationWeather = async (lat, lng) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;
      const mapLocation = await axios.get(url);
      dispatch({
        type: GET_MARKER_LOCATIONS_WEATHER,
        payload: mapLocation.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Get entered location weather

  const getEnteredLocationWeather = async (query) => {
    try {
      const res = await Geocode.fromAddress(query);
      const { lat, lng } = res.results[0].geometry.location;

      dispatch({
        type: GET_ENTERED_LOCATION_WEATHER,
        payload: { lat, lng },
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Clear lat lng

  const clearLatLng = () =>
    dispatch({
      type: CLEAR_LAT_LNG,
    });

  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <WeatherContext.Provider
      value={{
        latitude: state.latitude,
        longitude: state.longitude,
        location: state.location,
        getMarkerLocationWeather,
        getEnteredLocationWeather,
        clearLatLng,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherState;
