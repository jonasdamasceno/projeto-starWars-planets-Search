import React, { useState } from 'react';

function Table() {
  const [search, setSearch] = useState('');
  const head = ['Nome',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Filmes',
    'Created',
    'Edited',
    'URL'];
  const handleChange = ({ target }) => {
    setSearch(target.value);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
        <input
          type="number"
          name="filter-value"
          data-testid="value-filter"
          onChange={ handleChange }
        />
        <button data-testid="button-filter" type="button">Filtrar</button>
        <thead>
          <tr>
            {head.map((element) => (
              <th key={ element }>{element}</th>
            ))}
          </tr>
        </thead>
      </thead>
      <tbody>
        {values.filter((planet) => planet.name.toLowerCase().includes(search))
          .map((planet) => (
            <tr key={ planet.name }>
              <th>{planet.name}</th>
              <th>{planet.rotation_period}</th>
              <th>{planet.orbital_period}</th>
              <th>{planet.diameter}</th>
              <th>{planet.climate}</th>
              <th>{planet.gravity}</th>
              <th>{planet.terrain}</th>
              <th>{planet.surface_water}</th>
              <th>{planet.population}</th>
              <th>{planet.films}</th>
              <th>{planet.created}</th>
              <th>{planet.edited}</th>
              <th>{planet.url}</th>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
