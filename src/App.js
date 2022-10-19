import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BeerList from "./pages/BeerList";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import { useEffect, useState } from "react";
import { useBeer } from "./context/beerContext";

function App() {
  const [itemsOrdered, setItemsOrdered] = useState(3);
  const { beersOrdered } = useBeer();

  useEffect(() => {
    let count = 0;
    beersOrdered.forEach((beer) => {
      count += beer.quantityOrdered;
    });
    setItemsOrdered(count);
  }, [beersOrdered]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" className="nav-link"> 
                Our Beers
              </Link>
            </li>
            <li>
              <Link to="/cart" className="nav-link">
                {/* Afficage du nombre total d'items commandés */}
                Your Cart {itemsOrdered > 0 && `(${itemsOrdered})`}
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/details" element={<Details />} />
          <Route path="/" element={<BeerList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
