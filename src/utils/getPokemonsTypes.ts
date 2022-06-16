const getPokemonsTypes = async (pokemonArray:any[], pokemonTypes:any[], setPokemonTypes:any) => {
  await Promise.all(
    pokemonArray.map(async (pokemon: any) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }
        const data = await response.json();
        setPokemonTypes((currentList: any) => [...currentList, data.types]);
        await pokemonTypes.sort((a, b) => a.id - b.id);
      } catch (error) {
        console.log(error);
      }
    })
  );
};
export default getPokemonsTypes;
