import {
  GET_MARKER_LOCATIONS_WEATHER,
  GET_ENTERED_LOCATION_WEATHER,
  CLEAR_LAT_LNG,
  ERROR,
  CLEAR_ERRORS,
} from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_MARKER_LOCATIONS_WEATHER:
      return {
        ...state,
        location: action.payload,
      };
    case GET_ENTERED_LOCATION_WEATHER:
      return {
        ...state,
        latitude: action.payload.lat,
        longitude: action.payload.lng,
      };
    case CLEAR_LAT_LNG:
      return {
        ...state,
        latitude: null,
        longitude: null,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
