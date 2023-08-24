import { useEffect, useState } from "react";

const Poke = () => {
    const [pokemon, setPokemon] = useState("ditto")
    const [pokemonData, setPokemonData] = useState([])
    const [type, setType] = useState("")

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

    return (<div>
        <form onSubmit={handleSubmit}>
            <label>
                <input type="text" onChange={handleChange} />
            </label>

        </form>
        {pokemonData.map((data) => {
            return(
                <div className="divTable">
                <div className="divBody">
                <div className="divBodyRow">
                    <div className="divBodyCellValue">{data.name}</div>
                </div>
                <img src={data.sprites.front_shiny}/>
                </div>
                <div className="divRow">
                    
                </div>
                <div className="divRow">
                    <div className="divCellLabel">Type</div>
                    <div className="divCellValue">{type}</div>
                </div>
                <div className="divRow">
                    <div className="divCellLabel">Height</div>
                    <div className="divCellValue">{data.height}</div>
                </div>
                <div className="divRow">
                    <div className="divCellLabel">Weight</div>
                    <div className="divCellValue">{data.weight}</div>
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
            {ability.ability.name}
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
            </div>
            )
        })}
       


    </div>);
}

export default Poke;