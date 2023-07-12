import { useEffect, useState } from "react";
import constants from "../constants";
import styles from '../wildPokemon.module.css';
import getColorByType from "../Utils";

export default function WildPokemon({ pokemon }: {pokemon: any}) {
  const [showHover, setShowHover] = useState(false);

  const handleMouseEnter = () => setShowHover(true);
  const handleMouseLeave = () => setShowHover(false);

  const trainer = JSON.parse(localStorage.getItem('trainer') || '{}');

  const pokeimage = pokemon.shiny ? pokemon.images[1] : pokemon.images[0];

  const modalEvent = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    await fetch(`${constants.apiUrl}/catch`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        user: trainer.sub,
        pokemon: pokemon.id,
        shiny: pokemon.shiny
      })
    });
  }
  
  return (
    <div className={`col-2 ${styles.col_relative}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>

      {showHover && (
        <div className={`container ${styles.wild_container}`}>
          <div className={`row ${styles.row_f}`}>
            <div className="col align-self-center">
              <div className="row">
                <div className="col-12">
                  What do you want to do?
                </div>
                <div className="col-12">
                  <hr />
                </div>
                <div className="col-12">
                  <button onClick={modalEvent} type="button" className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target={`#${pokemon.id}-pokemodal`}>
                    Throw pokeball
                  </button>
                  <div className="modal fade" id={`${pokemon.id}-pokemodal`} tabIndex={-1} aria-labelledby="pokemodal" aria-hidden="true">
                    <div className="modal-dialog  modal-dialog-centered">
                      <div className="modal-content">
                        <div className={`modal-body ${styles.modal_catch}`}>
                          <div className="container">
                            <div className="row align-items-center">
                              <div className={`col ${styles.f_col}`}>
                                <img src={pokeimage} className={styles.pokemon_img}/>
                              </div>
                              <div className={`col text-capitalize ${styles.pokemon_name}`}>
                                {pokemon.name}
                              </div>
                              <div className={`col text-end ${styles.pokemon_catch}`}>
                                <span>Catch</span>{' '}
                                <img src="/pokeball.svg" />
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                <button type="button" className="btn" style={{color: constants.white}}>Run away</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`container ${styles.pokemon_card}`} style={{ backgroundColor: getColorByType(pokemon.types)}}>
        <div className="row justify-content-between">
          <div className="col-4 text-start">
            {`#${pokemon.pokemon_id}`}
          </div>
          {pokemon.shiny && (
            <div className="col-4 text-end">
              <img src="/sparkle.svg" />
            </div>
          )}
        </div>
        <div className="row">
          <div className="col text-center">
            <img src={pokeimage} className={styles.wild_pokemon_img}/>
          </div>
        </div>
        <div className="row">
          <div className="col text-start text-capitalize" style={{ color: constants.superBlack, fontSize: '24px'}}>
            {pokemon.name}
          </div>
        </div>
        <div className="row">
          <div className="col text-start">
            {pokemon.types.map((pokemonType: any, index: any) => (
              <span className={`badge rounded-pill text-bg-light text-capitalize ${styles.type_badge}`} key={index}>{pokemonType}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}