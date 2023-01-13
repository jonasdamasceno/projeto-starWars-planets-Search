import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/starWarscontext';

export default function Table() {
  const data = useContext(StarWarsContext);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState([]);
  const [inputs, setInputs] = useState({
    filterName: '',
    cocolumn: 'population',
    comparation: 'maior que',
    num: 0,
  });

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const handleFilter = () => {
    const listFilter = list;
    const values = inputs;
    if (values.comparation === 'maior que' && values.population !== 'unknown') {
      const filtered = listFilter.filter((item) => +item[values.column] > +values.num);
      setList(filtered);
    }
    if (values.comparation === 'menor que' && values.population !== 'unknown') {
      const filtered = listFilter.filter((item) => +item[values.column] < +values.num);
      setList(filtered);
    }
    if (values.comparation === 'igual a' && values.population !== 'unknown') {
      const filtered = listFilter.filter((item) => +item[values.column] === +values.num);
      setList(filtered);
    }
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
      <div>
        <select
          data-testid="column-filter"
          name="column"
          id="column-filter"
          onChange={ handleChange }
          value={ inputs.column }
        >
          <option
            name="population"
            id="population"
            value="population"
          >
            population
          </option>
          <option
            id="orbital_period"
            name="column"
            value="orbital_period"
          >
            orbital_period
          </option>
          <option
            id="diameter"
            name="column"
            value="diameter"
          >
            diameter
          </option>
          <option
            id="rotation_period"
            name="column"
            value="rotation_period"
          >
            rotation_period
          </option>
          <option
            id="surface_water"
            name="column"
            value="surface_water"
          >
            surface_water
          </option>
        </select>
      </div>
      <div>
        <select
          name="comparation"
          id="comparation"
          data-testid="comparison-filter"
          onChange={ handleChange }
          value={ inputs.comparation }
        >
          <option
            name="comparation"
            id="comparation"
            value="maior que"
          >
            maior que
          </option>

          <option
            name="comparation"
            id="comparation"
            value="menor que"
          >
            menor que
          </option>

          <option
            name="comparation"
            id="comparation"
            value="igual a"
          >
            igual a
          </option>
        </select>
      </div>
      <div>
        <input
          data-testid="value-filter"
          name="num"
          id="num"
          type="number"
          onChange={ handleChange }
          value={ inputs.num }
        />
      </div>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilter() }
      >
        Filtrar
      </button>
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
