import React from 'react';
import WrappedMap from './components/WrappedMap';
import SearchBox from './components/SearchBox';
import WeatherState from './context/WeatherState';
import './App.css';

function App() {
  return (
    <WeatherState>
      <div className='map-container'>
        <SearchBox />
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAPS_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </WeatherState>
  );
}

export default App;
