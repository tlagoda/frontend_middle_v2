import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBeer } from "../context/beerContext";
import "./BeerCard.css";

function BeerCard({ beer }) {
  const { beersOrdered, addBeerToCart, removeBeerFromCart } = useBeer();

  const [quantityOrdered, setQuantityOrdered] = useState(0);

  useEffect(() => {
    let isInCart = false;

    // si la bière est déjà dans le panier, on récupère la quantité commandée

    beersOrdered.forEach((beerOrdered) => {
      if (beerOrdered.id === beer.id) {
        setQuantityOrdered(beerOrdered.quantityOrdered);
        isInCart = true;
      }
    });

    // sinon, on affiche 0

    if (!isInCart) {
      setQuantityOrdered(0);
    }
  }, [beersOrdered]);

  return (
    <div className="beer-card">
      <h2>{beer.name}</h2>
      <span>
        {beer.volume.value} {beer.volume.unit}
      </span>
      <img src={beer.image_url} alt="" />
      {/* On envoie les données de la bière actuelle à travers le Link afin de les utiliser dans la page Détails */}
      <Link to="/details" className="details-link" state={beer}>
        Details
      </Link>
      <div className="add-remove-div">
        <button onClick={() => addBeerToCart(beer.id)}>+</button>
        <span>{quantityOrdered}</span>
        <button onClick={() => removeBeerFromCart(beer.id)}>-</button>
      </div>
    </div>
  );
}

export default BeerCard;
