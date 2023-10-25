import { useEffect, useState } from "react";
import axios from "axios"

const RandomDrink = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState(null);
  
    useEffect(() => {
      // Fetch a random drink when the component mounts
      getRandomDrink();
    }, []);
  
    const getRandomDrink = async () => {
      setLoading(true);
      setSearchResult(null); // Clear previous search results
  
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  
      try {
        const res = await axios.get(url);
        setData(res.data.drinks[0]);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  
    const searchDrink = async () => {
      setLoading(true);
  
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`;
        const res = await axios.get(url);
  
        if (res.data.drinks) {
          setData(res.data.drinks[0]);
          setSearchResult(null);
        } else {
          setData({});
          setSearchResult("No results found.");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  
    const renderIngredients = () => {
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredient = data[`strIngredient${i}`];
        const measure = data[`strMeasure${i}`];
        if (ingredient) {
          ingredients.push(
            <li key={`ingredient${i}`}>
              {`${measure ? `${measure} of` : ""} ${ingredient}`}
            </li>
          );
        }
      }
      return ingredients;
    }
  
    return (
      <div className="random-drink-container">
        <input
          type="text"
          placeholder="Search for a drink"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchDrink} className="get-drink-button">Search</button>
        <button onClick={getRandomDrink} className="get-drink-button">Random Drink</button>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            {searchResult !== null ? (
              <p>{searchResult}</p>
            ) : (
              <div>
                <p className="drink-name">{data.strDrink}</p>
                <div className="drink-details">
                  <div className="drink-image-container">
                    <div className="aspect-ratio-container">
                      <img
                        src={data.strDrinkThumb}
                        alt={data.strDrink}
                        className="drink-image"
                      />
                    </div>
                  </div>
                  <div className="drink-content">
                    <h2>Ingredients:</h2>
                    <ul className="ingredients-list">{renderIngredients()}</ul>
                    <h2>Instructions:</h2>
                    <p className="drink-instructions">{data.strInstructions}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
                <link rel="stylesheet" href="/App.css"/>

      </div>
    );
  }
  
  export default RandomDrink;