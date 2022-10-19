import React, { useEffect } from "react";
import BeerCard from "../components/BeerCard";
import { useBeer } from "../context/beerContext";
import "./Cart.css";

function Cart() {
  const { beersOrdered } = useBeer();

  useEffect(() => {
    // changement du titre du document
    document.title = "Beer Market | Cart";
  }, []);

  // gestion d'un panier vide
  if (beersOrdered.length < 1) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-list">
      {beersOrdered.map((beer) => (
        <BeerCard beer={beer} key={beer.id} />
      ))}
    </div>
  );
}

export default Cart;
