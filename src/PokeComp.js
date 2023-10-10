import Modal from "react-modal";
import { useEffect, useState } from "react";

const Poke = () => {
  const [pokemon, setPokemon] = useState("ditto")
  const [pokemonData, setPokemonData] = useState([])
  const [type, setType] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [selectedAbility, setSelectedAbility] = useState("")
  const [showShiny, setShowShiny] = useState(false)

  useEffect(() => {
    // Fetch data when the component mounts
    getPokemonData()
  }, []);


  const getPokemonData = async () => {
    const toArray = []
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          toArray.push(data)
          setPokemonData(toArray); // Update the state with fetched data
          setType(data.types[0].type.name)
        });
    } catch (e) {
      console.log(e)
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemonData()
  }

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }

  const handleModalOpen = async (url) => {
    fetch(url).then(response => response.json())
      .then(data => {
        console.log(data)
        setSelectedAbility(data)
        setShowModal(true)
      }
      ).catch(e => console.log(e))

  }

  const handleModalClose = () => {
    setSelectedAbility("")
    setShowModal(false)
  }

  return (<div className="rootDiv">

    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" onChange={handleChange} />
      </label>

    </form>
    {pokemonData.map((data) => {
      return (
        <div className="divTable">
          <div className="divBody">
            <div className="divBodyRow">
              <div className="divBodyCellValue">{data.name}</div>
            </div>
            

            <img onClick={() => setShowShiny(!showShiny)} src={(showShiny ? data.sprites.front_shiny : data.sprites.front_default)} />
            
          </div>
          <div className="divRow">
          {showShiny &&
              <p>shiny</p>
            } 
          </div>
          <div className="divRow">
            <div className="divCellLabel">Type</div>
            <div className="divCellValue">{type}</div>
          </div>
          <div className="divRow">
            <div className="divCellLabel">Height</div>
            <div className="divCellValue">{Math.round(data.height * 10)} {"cm"}</div>
          </div>
          <div className="divRow">
            <div className="divCellLabel">Weight</div>
            <div className="divCellValue">{Math.round(data.weight / 10)} {"kg"}</div>
          </div>
          <div className="divRow divStatAbilities">
            <div className="divStatAbilitiesTitle">Stats and Abilities</div>

            <div className="divStatRow">
              <div className="divStatLabel">Stats:</div>
              <div className="divStatValue">
                {data.stats.map((stat) => (
                  <div key={stat.stat.name} className="divStatName">
                    {stat.stat.name}: {stat.base_stat}
                  </div>
                ))}
              </div>
            </div>

            <div className="divStatRow">
              <div className="divStatLabel">Abilities:</div>
              <div className="divStatValue">
                <div className="divAbilityList">
                  {data.abilities.map((ability) => (
                    <div key={ability.ability.name} className="divAbilityName">
                      <button onClick={() => handleModalOpen(ability.ability.url)}>{ability.ability.name}</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })}

    {showModal && <Modal isOpen={showModal} className="modalBox">
      <button onClick={handleModalClose}>Close</button>
      {selectedAbility.effect_entries.map((a) => {
        if (a.language.name === "en") {
          return (
            <p>
              {a.effect}
            </p>
          )
        }
        return null
      })}

    </Modal>}

  </div>);
}

export default Poke;