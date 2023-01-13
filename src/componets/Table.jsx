import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/starWarscontext';
import 'bootstrap/dist/css/bootstrap.min.css';

const attribitesOfPlanets = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function Table() {
  const data = useContext(StarWarsContext);
  const [search, setSearch] = useState([]);
  const [filterAttributesOp, setfilterAttributesOp] = useState([...attribitesOfPlanets]);

  const [inputs, setInputs] = useState({
    filterName: '',
    filterAttributePlanet: 'population',
    filterComparison: 'maior que',
    qnt: '0',
  });

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  // creditos ao bruno govea por me ajudar com essa função
  const handleFilter = (() => {
    setfilterAttributesOp(filterAttributesOp.filter((el) => el
    !== inputs.filterAttributePlanet));
    inputs.filterAttributePlanet = filterAttributesOp[0] || '';

    switch (inputs.filterComparison) {
    case 'igual a':
      setSearch(search.filter((el) => +el[inputs.filterAttributePlanet] === +inputs.qnt));
      break;
    case 'menor que':
      setSearch(search.filter((el) => +el[inputs.filterAttributePlanet] < +inputs.qnt));
      break;

    default:
      setSearch(search.filter((el) => +el[inputs.filterAttributePlanet] > +inputs.qnt));
      break;
    }
  });

  useEffect(() => {
    setSearch(data);
  }, [data]);

  useEffect(() => {
    setSearch(data.filter((value) => value.name.includes(inputs.filterName)));
  }, [inputs.filterName, data]);
  return (
    <div>
      <div
        className="container-fluid"
      >
        <input
          id="filterName"
          type="text"
          name="filterName"
          placeholder="pesquise aqui"
          value={ inputs.filterName }
          data-testid="name-filter"
          onChange={ handleChange }
        />
        <select
          name="filterAttributePlanet"
          id="filterAttributePlanet"
          value={ inputs.filterAttributePlanet }
          data-testid="column-filter"
          onChange={ handleChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          name="filterComparison"
          id="filterComparison"
          value={ inputs.filterComparison }
          data-testid="comparison-filter"
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          name="qnt"
          value={ inputs.qnt }
          data-testid="value-filter"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilter }
        >
          Filter
        </button>
      </div>
      <table
        className="table table-dark table-striped"
      >
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
