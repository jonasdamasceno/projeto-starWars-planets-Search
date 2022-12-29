import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import StarWarsContext from './starWarscontext';
import getPlanetAPI from '../services/planetApi';

export default function StarWarsProvider({ children }) {
  const [planetsData, setPlanetsData] = useState([]);

  const planetFetch = async () => {
    const data = await getPlanetAPI();
    setPlanetsData(data);
  };

  useEffect(() => {
    planetFetch();
  }, []);

  return (
    <StarWarsContext.Provider value={ planetsData }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
