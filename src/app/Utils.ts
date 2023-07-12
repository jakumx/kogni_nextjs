import constants from "./constants";
export default function getColorByType (pokemonTypes: [string]) {
  const basePokemonType = pokemonTypes[0];
  let color = constants.gray;
  switch (basePokemonType) {
    case 'fighting':
    case 'fire':
      color = constants.red;
      break;
    case 'flying':
    case 'poison':
    case 'ghost':
    case 'dragon':
      color = constants.purple;
      break;
    case 'ground':
    case 'rock':
      color = constants.brown;
      break;
    case 'bug':
    case 'grass':
      color = constants.green;
      break;
    case 'water':
    case 'ice':
      color = constants.blue;
      break;
    case 'electric':
      color = constants.yellow;
      break;
    case 'psychic':
    case 'fairy':
      color = constants.pink;
      break;
    case 'dark':
      color = constants.black;
      break;
    default:
      break;
  }
  return color
}