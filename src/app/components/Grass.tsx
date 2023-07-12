import { useEffect, useState } from "react"
import constants from "../constants";
import WildPokemon from "./WildPokemon";

export default function Grass() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    fetch(`${constants.apiUrl}/pokeapi`)
    .then((resp) => resp.json())
    .then((data) => {
      setPokemonList(data);
      setLoading(false);
    })
  }, [])
  return (
    <>
      {loading ? <>
      High grass...
      </> : <>
      <div className="container">
        <div className="row">
          {pokemonList.map((pokemon: any) => (
            <WildPokemon pokemon={pokemon} key={pokemon.id}/>
          ))}
        </div>
      </div>
    </>}
  </>)
}
