import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App'
import StarWarsProvider from '../context/starWarsProvider'
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';

  const inputfilterName = "name-filter"
  const inputfilterColumn = "column-filter"
  const inputfilterComparison = "comparison-filter"
  const inputfilterValue = "value-filter"
describe('testa a renderização da pagina', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(testData) });
  });
  it('testa a renderização dos campos de filtragem', async() => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const bntFilter = screen.getByRole('button', {name: 'Filter'})
    const inputName = screen.getByTestId(inputfilterName)
    const inputColumn = screen.getByTestId(inputfilterColumn)
    const inputComparison = screen.getByTestId(inputfilterComparison)
    const inputValue = screen.getByTestId(inputfilterValue) 
    const bntExcluir = screen.getByRole('button',{name: 'Excluir'})
    const bntAllDelet = screen.getByRole('button', {name: 'Remover todos filtros'})
    const searchAnswer = screen.findByText('Alderaan')

    expect(bntFilter).toBeInTheDocument()
    expect(inputColumn).toBeInTheDocument()
    expect(inputName).toBeInTheDocument()
    expect(inputComparison).toBeInTheDocument()
    expect(inputValue).toBeInTheDocument();
    expect(bntAllDelet).toBeInTheDocument();
    userEvent.type(inputName, 'aa');
    userEvent.click(bntFilter)
    expect(bntExcluir).toBeInTheDocument()
    expect(searchAnswer).toBeInTheDocument()
  })
});