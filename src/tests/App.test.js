import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import StarWarsProvider from "../context/starWarsProvider";
import userEvent from "@testing-library/user-event";
import testData from "../../cypress/mocks/testData";

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
    const nameInput = screen.getByTestId(inputFilterName);
    userEvent.type(nameInput, "oo");
    userEvent.click(filterBtn);
    const excludeBtn = await screen.findByText("Excluir");
    userEvent.click(excludeBtn);
    const tatooine = await screen.findByText("Tatooine");
    expect(tatooine).toBeInTheDocument();
  });

  test("Testa o filtro de comparação", async () => {
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

  test("Teste dos botões de excluir", async () => {
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
  it("testa o funcionamento dos botões de excluir e excluir todos os filtros", async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const bntFilter = screen.getByTestId(buttonFilter);
    const inputColumn = screen.getByTestId(inputFilterColumn);
    const inputComparison = screen.getByTestId(inputFilterComparison);
    const inputValue = screen.getByTestId(inputFilterValeu);
    const bntDelet = screen.getByText("Excluir");
    const bntAllDelet = screen.getByTestId(buttonDeleteAllFilters);

    userEvent.selectOptions(inputColumn, "population");
    expect(inputColumn).toBeInTheDocument();
    userEvent.selectOptions(inputComparison, "maior que");
    userEvent.type(inputValue, "2000000");
    userEvent.click(bntFilter);
    userEvent.selectOptions(inputColumn, "diameter");
    userEvent.selectOptions(inputComparison, "maior que");
    userEvent.type(inputValue, "12499");
    userEvent.click(bntFilter);
    userEvent.selectOptions(inputColumn, "orbital_period");
    userEvent.selectOptions(inputComparison, "menor que");
    userEvent.type(inputValue, "365");
    userEvent.click(bntFilter);
    const Alderaan = await screen.findByText("Alderaan");
    expect(Alderaan).toBeInTheDocument();
    userEvent.click(bntDelet);
    userEvent.click(bntFilter);
    userEvent.click(bntAllDelet);
  });
});
