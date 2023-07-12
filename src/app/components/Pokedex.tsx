import { useEffect, useState } from "react";
import constants from "../constants";
import styles from '../pokedex.module.css';
import getColorByType from "../Utils";

export default function Pokedex() {
  const [trainer, setTrainer] = useState({
    picture: '',
    name: '',
    sub: ''
  })
  const [listPokemon, setListPokemon] = useState([])

  const offCanvasEvent = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`${constants.apiUrl}/box`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        user: trainer.sub
      })
    })
    const pokemonJSON = await response.json();
    setListPokemon(pokemonJSON.list)
  }

  useEffect(() => {
    const trainerParse = localStorage.getItem('trainer')
    setTrainer(JSON.parse(trainerParse || '{}'));
    return () => {
      setTrainer({
        picture: '',
        name: '',
        sub: ''
      })
    }
  }, [])

  return(
    <>
      <a className="btn" onClick={offCanvasEvent} data-bs-toggle="offcanvas" href="#pokedex" role="button" aria-controls="offcanvasExample">
        My Box
      </a>
      <div className={`offcanvas offcanvas-start ${styles.trainer_pokedex}`} tabIndex={-1} id="pokedex" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="pokedexLabel">Box</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body container">
          <div className="row justify-content-between">
            <div className="col-5">
              <img src={trainer.picture} className={`${styles.trainer_img}`}/>
              {' '}
              {trainer.name}
            </div>
            <div className="col-4 text-end">
              {listPokemon.length}
            </div>
          </div>
            {!listPokemon.length ? (<div>
            You do not have any pokemon yet.
          </div>) : (<>
            <div className="container" >
              {listPokemon.map((pokemon: any, index: any) => (
                <div key={index} className={`row align-items-center ${styles.row_cell}`} style={{ backgroundColor: getColorByType(pokemon.types)}}>
                  <div className={`col text-center ${styles.f_col}`}>
                    {pokemon.shiny ? (
                      <img src={pokemon.images[1]} className={styles.pokemon_img} />
                    ): (<img src={pokemon.images[0]} className={styles.pokemon_img} />)}
                  </div>
                  <div className="col text-start">
                    #{pokemon.pokemon_id}
                    {' '}
                    <span className="text-capitalize">{pokemon.name}</span>
                    {pokemon.shiny && (
                      <>
                      {' '}
                      <img src="/sparkle.svg" />
                      </>
                    )}
                  </div>

                  <div className="col text-end">
                    {pokemon.types.map((pokemonType: any, index: any) => (
                      <span className={`badge rounded-pill text-bg-light text-capitalize ${styles.type_badge}`} key={index}>{pokemonType}</span>
                    ))}
                  </div>
                </div>
              ))}
             </div>

          </>)}
        </div>
      </div>
    </>
  )
}
