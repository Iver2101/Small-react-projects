import { useState } from "react";
import "./App.css";


const CurrencyConverter = () => {
    const [currOne, setCurrOne] = useState("EUR")
    const [currTwo, setCurrTwo] = useState("EUR")
    const [amount, setAmount] = useState(0)
    const [convertedAmounts, setConvertedAmounts] = useState(["0","0"])
    const [convertedCurrs, setConvertedCurrs] = useState(["",""])

    //http://api.exchangeratesapi.io/v1/latest?access_key=463e3a2f3462f2efd5a0fd4613cd9200&symbols=USD,AUD,CAD,PLN,
    const access_key = "463e3a2f3462f2efd5a0fd4613cd9200"

    const getCurrData = async () => {

        
        const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${access_key}&base=${currOne}&symbols=${currTwo}`
        fetch(url).then(response => response.json())
            .then(data => {
                setConvertedCurrs([currOne, currTwo])
                setConvertedAmounts([amount,Object.values(data.rates)[0]*amount])
            })

    };

    const handleSubmit = (e) => {
        e.preventDefault()
        getCurrData()
      


    }

    const handleChangeOne = (e) => {
       setCurrOne(e.target.value);
    }
    const handleChangeTwo = (e) => {
        setCurrTwo(e.target.value);
    }

    const handleChangeNum = (e) => {
        setAmount(e.target.value)

    }

    const formatNumber = (value) => {
        return parseFloat(value).toFixed(2);
      };

    return (
        <div className="currency-container">
        <form className="currency-form" onSubmit={handleSubmit}>
          <input type="number" onChange={handleChangeNum} className="currency-input" />
          <select id="curr1" name="Currency1" onChange={handleChangeOne} className="currency-select">
            <option value="EUR">EUR</option>
          </select>
          <select id="curr2" name="Currency2" onChange={handleChangeTwo} className="currency-select">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="NOK">NOK</option>
            <option value="MXN">MXN</option>
            <option value="PLN">PLN</option>
            <option value="JPY">JPY</option>
          </select>
          <input type="submit" className="currency-input" />
        </form>
        {convertedAmounts[0] > 1 && (
          <label className="currency-label">
            {convertedAmounts[0]} {convertedCurrs[0]} = {formatNumber(convertedAmounts[1])} {convertedCurrs[1]}
          </label>
        )}
      </div>
        
    );
}

export default CurrencyConverter;