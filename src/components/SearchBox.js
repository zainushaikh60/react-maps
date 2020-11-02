import React, { Fragment, useState, useRef, useContext } from 'react';
import WeatherContext from '../context/weatherContext';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);

const SearchBox = () => {
  const weatherContext = useContext(WeatherContext);
  const { getEnteredLocationWeather } = weatherContext;

  const [query, setQuery] = useState('');
  const clearInput = useRef();

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onClick = () => {
    getEnteredLocationWeather(query);
    setQuery('');
    onClearInput();
  };

  const onClearInput = () => {
    clearInput.current.value = '';
  };

  return (
    <Fragment>
      <div className='search-box'>
        <input
          type='text'
          placeholder='Search here'
          onChange={onChange}
          ref={clearInput}
        />
        <button onClick={onClick} className='btn-search'>
          Search
        </button>
      </div>
    </Fragment>
  );
};

export default SearchBox;
