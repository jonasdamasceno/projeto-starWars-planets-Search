import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import StarWarsProvider from "../context/starWarsProvider";
import userEvent from "@testing-library/user-event";
import testData from "../../cypress/mocks/testData";

const inputfilterName = "name-filter";
const buttonFilter = "button-filter";
const inputfilterColumn = "column-filter";
const inputfilterComparison = "comparison-filter";
const inputfilterValue = "value-filter";
const ButtonDeleteAllFilters = "button-remove-filters";

describe("testa a renderização da pagina", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  });
  it("testa a renderização dos campos de filtragem", async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const bntFilter = screen.getByTestId(buttonFilter);
    const inputName = screen.getByTestId(inputfilterName);
    const inputColumn = screen.getByTestId(inputfilterColumn);
    const inputComparison = screen.getByTestId(inputfilterComparison);
    const inputValue = screen.getByTestId(inputfilterValue);
    const bntAllDelet = screen.getByTestId(ButtonDeleteAllFilters);

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
  it("testa o funcionamento do filtro de comparação", () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const bntFilter = screen.getByTestId(buttonFilter);
    const inputColumn = screen.getByTestId(inputfilterColumn);
    const inputComparison = screen.getByTestId(inputfilterComparison);
    const inputValue = screen.getByTestId(inputfilterValue);

    userEvent.selectOptions(inputColumn, "rotation_period");
    userEvent.selectOptions(inputComparison, "maior que");
    inputValue.value = "";
    userEvent.type(inputValue, "22");
    userEvent.click(bntFilter);

    userEvent.selectOptions(inputColumn, "orbital_period");
    userEvent.selectOptions(inputComparison, "menor que");
    inputValue.value = "";
    userEvent.type(inputValue, "400");
    userEvent.click(bntFilter);

    userEvent.selectOptions(inputColumn, "surface_water");
    userEvent.selectOptions(inputComparison, "igual a");
    inputValue.value = "";
    userEvent.type(inputValue, "15");
    userEvent.click(bntFilter);
    expect(inputComparison).toBeInTheDocument();
  });

  it("testa o funcionamento dos botões de excluir e excluir todos os filtros", () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const bntFilter = screen.getByTestId(buttonFilter);
    const inputColumn = screen.getByTestId(inputfilterColumn);
    const inputComparison = screen.getByTestId(inputfilterComparison);
    const inputValue = screen.getByTestId(inputfilterValue);
  });
});
