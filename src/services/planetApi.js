const getPlanetAPI = async () => {
  try {
    const url = 'https://swapi.dev/api/planets';
    const request = await fetch(url);
    const answer = await request.json();
    answer.results.forEach((e) => delete e.residents);
    return answer.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getPlanetAPI;
