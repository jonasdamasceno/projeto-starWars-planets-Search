import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/starWarscontext';

export default function Table() {
  const data = useContext(StarWarsContext);
  const [search, setSearch] = useState([]);
  const [inputs, setInputs] = useState({
    filterName: '',
  });

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  useEffect(() => {
    setSearch(data);
  }, [data]);

  useEffect(() => {
    setSearch(data.filter((value) => value.name.includes(inputs.filterName)));
  }, [inputs.filterName, data]);
  return (
    <div>
      <label htmlFor="mainFilter">
        <input
          type="text"
          data-testid="name-filter"
          id="filterName"
          name="filterName"
          onChange={ handleChange }
          value={ inputs.filterName }
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {search.map((element, index) => (
            <tr
              data={ element }
              key={ index }
            >
              <td>{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>
                {element.films.map((el) => <p key={ el }>{el}</p>)}
              </td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
