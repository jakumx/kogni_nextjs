import Grass from "./Grass";
import Pokedex from "./Pokedex";

export default function Dashboard({windowHeight}: {windowHeight: any}) {
  const handleClick = () => {
    localStorage.removeItem('trainer');
    window.location.href = '/';
  }

  return (
    <div className="container text-center">
      <div className="row" style={{ minHeight: `${windowHeight - (windowHeight*.05)}px`}}>
        <div className="col align-self-center">
          <Grass />
        </div>
      </div>
      <div className="col align-self-end">
        <div className="row justify-content-between">
          <div className="col-4 text-start">
            <Pokedex />
          </div>
          <div className="col-4 text-end">
            <a className="btn" onClick={handleClick}>Log out</a>
          </div>
        </div>
      </div>
    </div>
  )
}
