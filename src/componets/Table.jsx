import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/starWarscontext';

export default function Table() {
  const data = useContext(StarWarsContext);
  const [planetGuide, setplanetguide] = useState();
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    setplanetguide(data);
    if (search.length > 0) {
      const searchList = planetGuide.filter((element) => element.name.includes(search));
      setList(searchList);
    } else {
      setList(planetGuide);
    }
  }, [data, search, planetGuide]);

  return (
    <div>
      <label htmlFor="mainFilter">
        <input
          type="text"
          data-testid="name-filter"
          id="mainFilter"
          onChange={ ({ target }) => setSearch(target.value) }
          value={ search }
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
          {data.map((element, index) => (
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
