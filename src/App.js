import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Poke from './PokeComp';
import RandomDrink from './Drinks';
import "./App.css";



function App() {
  return (
    <Router>
      <div className="App">
      <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/poke" className="nav-link">Poke</Link>
            </li>
            <li className="nav-item">
              <Link to="/random-drink" className="nav-link">Random Drink</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/poke" element={<Poke />} />
          <Route path="/random-drink" element={<RandomDrink />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;