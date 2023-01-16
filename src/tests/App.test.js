import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import StarWarsProvider from "../context/starWarsProvider";
import userEvent from "@testing-library/user-event";
import testData from "../../cypress/mocks/testData";
import getPlanetAPI from "../services/planetApi";

const inputFilterName = "name-filter";
const buttonFilter = "button-filter";
const inputFilterComparison = "comparison-filter";
const inputFilterValeu = "value-filter";
const buttonDeleteAllFilters = "button-remove-filters";
const inputFilterColumn = "column-filter";

describe("testa a renderização da pagina", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  });

  test("Testa a renderização", async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const filterBtn = screen.getByTestId(buttonFilter);
    const searchNamePlanet = screen.getByTestId(inputFilterName);
    userEvent.type(searchNamePlanet, "oo");
    expect(searchNamePlanet).toHaveValue("oo");
    userEvent.click(filterBtn);
    const excludeBtn = await screen.findByText("Excluir");
    userEvent.click(excludeBtn);
    const tatooine = await screen.findByText("Tatooine");
    expect(tatooine).toBeInTheDocument();
  });

  test("Testa os botões de 'Excluir' e 'Excluir todos os filtros'", async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const comparison = screen.getByTestId(inputFilterComparison);
    const filterBtn = screen.getByTestId(buttonFilter);
    const column = screen.getByTestId(inputFilterColumn);
    const valueFilter = screen.getByTestId(inputFilterValeu);
    const remove = screen.getByTestId("button-remove-filters");
    userEvent.selectOptions(column, "population");
    expect(column).toBeInTheDocument();
    userEvent.selectOptions(comparison, "menor que");
    userEvent.type(valueFilter, "1000000");
    userEvent.click(filterBtn);
    userEvent.selectOptions(column, "diameter");
    userEvent.type(valueFilter, "10200");
    const tatooine = await screen.findByText("Tatooine");
    expect(tatooine).toBeInTheDocument();

    userEvent.selectOptions(column, "orbital_period");
    const excludeBtn = screen.getByText("Excluir");
    const yavin = await screen.findByText("Yavin IV");
    expect(yavin).toBeInTheDocument();
    userEvent.click(excludeBtn);
    userEvent.click(filterBtn);
    userEvent.click(remove);
  });
  // test("Testa o filtro de comparação", async () => {
  //   render(
  //     <StarWarsProvider>
  //       <App />
  //     </StarWarsProvider>
  //   );

  //   const column = screen.getByTestId(inputFilterColumn);
  //   const comparison = screen.getByTestId(inputFilterComparison);
  //   const valueFilter = screen.getByTestId(inputFilterValeu);
  //   const filterBtn = screen.getByTestId(buttonFilter);

  //   userEvent.selectOptions(column, "diameter");
  //   userEvent.selectOptions(comparison, "igual a");
  //   valueFilter.value = "";
  //   userEvent.type(valueFilter, "7200");
  //   userEvent.click(filterBtn);
  //   const searchResult = await screen.getByTestId("planet-name");
  //   expect(searchResult).toEqual("Hoth");
  // });

  test("Testa o filtro de comparação", async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );

    const column = screen.getByTestId(inputFilterColumn);
    const comparison = screen.getByTestId(inputFilterComparison);
    const valueFilter = screen.getByTestId(inputFilterValeu);
    const filterBtn = screen.getByTestId(buttonFilter);

    userEvent.selectOptions(column, "rotation_period");
    userEvent.selectOptions(comparison, "maior que");
    valueFilter.value = "";
    userEvent.type(valueFilter, "22");
    userEvent.click(filterBtn);

    userEvent.selectOptions(column, "orbital_period");
    userEvent.selectOptions(comparison, "menor que");
    valueFilter.value = "";
    userEvent.type(valueFilter, "400");
    userEvent.click(filterBtn);

    userEvent.selectOptions(column, "diameter");
    userEvent.selectOptions(comparison, "menor que");
    valueFilter.value = "";
    userEvent.type(valueFilter, "10500");
    userEvent.click(filterBtn);

    userEvent.selectOptions(column, "surface_water");
    userEvent.selectOptions(comparison, "igual a");
    valueFilter.value = "";
    userEvent.type(valueFilter, "15");
    userEvent.click(filterBtn);
    userEvent.click(filterBtn);
    const searchResult = screen.getByTestId("planet-name");
    expect(searchResult).toEqual("Tatooine");
    expect(comparison).toBeInTheDocument();
  });
  it("testa a renderização dos campos de filtragem", async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const bntFilter = screen.getByTestId(buttonFilter);
    const inputName = screen.getByTestId(inputFilterName);
    const inputColumn = screen.getByTestId(inputFilterColumn);
    const inputComparison = screen.getByTestId(inputFilterComparison);
    const inputValue = screen.getByTestId(inputFilterValeu);
    const bntAllDelet = screen.getByTestId(buttonDeleteAllFilters);

    expect(bntFilter).toBeInTheDocument();
    expect(inputColumn).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputComparison).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(bntAllDelet).toBeInTheDocument();
    userEvent.type(inputName, "aa");
    userEvent.click(bntFilter);
    const bntExcluir = await screen.findByText("Excluir");
    const searchAnswer = await screen.findByText("Alderaan");
    expect(bntExcluir).toBeInTheDocument();
    expect(searchAnswer).toBeInTheDocument();
  });
  it("test filter", async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const filterBtn = screen.getByTestId("button-filter");
    expect(filterBtn).toBeInTheDocument();

    expect(
      screen.getAllByRole("option", { id: "population" })[0].selected
    ).toBe(true);
    expect(screen.getByRole("option", { name: "maior que" }).selected).toBe(
      true
    );

    const valueFilter = screen.getByTestId("value-filter");

    let columnFilter = await screen.findByTestId("column-filter");
    expect(columnFilter).toHaveLength(5);

    const comparisonFilter = await screen.findByTestId("comparison-filter");

    userEvent.selectOptions(columnFilter, "diameter");
    userEvent.selectOptions(comparisonFilter, "maior que");
    userEvent.type(valueFilter, "10000");
    userEvent.click(filterBtn);

    let table2 = await screen.findAllByTestId("planet-name");
    expect(table2).not.toHaveLength(7);
    let filters = await screen.findAllByTestId("filter");
    expect(filters).toHaveLength(1);

    userEvent.selectOptions(columnFilter, "orbital_period");
    userEvent.selectOptions(comparisonFilter, "menor que");
    userEvent.type(valueFilter, "500");
    userEvent.click(filterBtn);

    table2 = await screen.findAllByTestId("planet-name");
    expect(table2).toHaveLength(7);
    filters = await screen.findAllByTestId("filter");
    expect(filters).toHaveLength(2);

    // const delBtn = screen.getByRole('button', {name: 'Excluir' })
    // userEvent.click(delBtn);
    // expect(delBtn).not.toBeInTheDocument();

    userEvent.selectOptions(columnFilter, "surface_water");
    userEvent.selectOptions(comparisonFilter, "igual a");
    userEvent.type(valueFilter, "40");
    userEvent.click(filterBtn);

    table2 = await screen.findAllByTestId("planet-name");
    expect(table2).toHaveLength(1);
    filters = await screen.findAllByTestId("filter");
    expect(filters).toHaveLength(2);

    const delAllBtn = screen.getByTestId("button-remove-filters");
    expect(delAllBtn).toBeInTheDocument();
    userEvent.click(delAllBtn);
    table2 = await screen.findAllByTestId("planet-name");
    expect(table2).toHaveLength(10);
  });
});
describe("getPlanetAPI", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
  });

  it("testa o trato do erro no bloco catch", async () => {
    const errorMessage = "Error: Failed to fetch";
    global.fetch.mockRejectedValue(new Error(errorMessage));

    try {
      await getPlanetAPI();
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
    }
  });
});
