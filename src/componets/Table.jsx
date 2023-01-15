import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/starWarscontext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';

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
  const [filterAttributes, setfilterAttributes] = useState([...attribitesOfPlanets]);
  const [filters, setFilters] = useState([]);
  const [deletFilters, setDeletFilters] = useState([]);
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
    setfilterAttributes(filterAttributes.filter((el) => el
    !== inputs.filterAttributePlanet));
    setFilters(
      [
        ...filters,
        `${inputs.filterAttributePlanet} ${inputs.filterComparison} ${inputs.qnt}`,
      ],
    );

    switch (inputs.filterComparison) {
    case 'igual a':
      setDeletFilters({
        ...deletFilters,
        [inputs.filterAttributePlanet]:
        search.filter((value) => ((+value[inputs.filterAttributePlanet] !== +inputs.qnt)
        || (value[inputs.filterAttributePlanet] === 'unknown'))),
      });
      setSearch(search.filter((el) => +el[inputs.filterAttributePlanet] === +inputs.qnt));
      break;
    case 'menor que':
      setDeletFilters({
        ...deletFilters,
        [inputs.filterAttributePlanet]:
        search.filter((value) => ((+value[inputs.filterAttributePlanet] >= +inputs.qnt)
        || (value[inputs.filterAttributePlanet] === 'unknown'))),
      });
      setSearch(search.filter((el) => +el[inputs.filterAttributePlanet] < +inputs.qnt));
      break;

    default:
      setDeletFilters({
        ...deletFilters,
        [inputs.filterAttributePlanet]:
        search.filter((value) => ((+value[inputs.filterAttributePlanet] <= +inputs.qnt)
        || (value[inputs.filterAttributePlanet] === 'unknown'))),
      });
      setSearch(search.filter((el) => +el[inputs.filterAttributePlanet] > +inputs.qnt));
      break;
    }
  });

  const deleteAppliedFilters = (str) => {
    const key = str.split(' ')[0];
    setfilterAttributes([...filterAttributes, key]);
    setFilters(filters.filter((el) => !(el.includes(str))));
    setSearch([...search, ...deletFilters[key]]);
  };

  const deleteAllAppliedFilters = () => {
    setfilterAttributes([...filterAttributes]);
    setFilters([]);
    setSearch([...data]);
  };

  useEffect(() => {
    setSearch(...data);
  }, [data]);

  useEffect(() => {
    setInputs({
      filterName: '',
      filterAttributePlanet: filterAttributes[0] || '',
      filterComparison: 'maior que',
      qnt: '0',
    });
  }, [filterAttributes]);

  useEffect(() => {
    setSearch(data.filter((value) => value.name.includes(inputs.filterName)));
  }, [inputs.filterName, data]);
  return (
    <div className="black-syk">
      <h1># Star Wars Search Planets $</h1>
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
          className="form-select form-select-lg sm"
          id="filterAttributePlanet"
          value={ inputs.filterAttributePlanet }
          data-testid="column-filter"
          onChange={ handleChange }
        >
          { filterAttributes.map((el, i) => <option el={ el } key={ i }>{el}</option>)}
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
          className="btn btn-outline-secondary"
          data-testid="button-filter"
          onClick={ handleFilter }
        >
          Filter
        </button>
        {
          filters.map((value, i) => (
            <div key={ i + value } data-testid="filter">
              { value }
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={ () => deleteAppliedFilters(value) }
              >

                Excluir

              </button>
            </div>
          ))
        }
      </div>
      <button
        type="button"
        className="btn btn-outline-secondary"
        data-testid="button-remove-filters"
        onClick={ () => deleteAllAppliedFilters() }
      >

        Remover todos filtros

      </button>
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
