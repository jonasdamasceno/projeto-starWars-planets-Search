const getPlanetAPI = async () => {
  try {
    setIsLoading(true);
    const url = await fetch('https://swapi.dev/api/planets');
    if (!url.ok) {
      const fetchError = await url.json();
      throw fetchError.message;
    }
    const planets = await url.json();
    setStarPlanets(planets.results);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export default getPlanetAPI;
