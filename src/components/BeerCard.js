import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBeer } from "../context/beerContext";
import toast, { Toaster } from "react-hot-toast";
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

  const handleAdd = (id) => {
    addBeerToCart(beer.id);
    notify();
  };

  // configuration et création du toast de react-hot-toast

  const notify = () =>
    toast.success("Beer added to cart!", {
      style: {
        backgroundColor: "#8E8D71",
        color: "white",
      },
      icon: "🍺",
      position: "bottom-right",
      duration: 1500,
    });

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
        <button onClick={handleAdd}>+</button>
        <span>{quantityOrdered}</span>
        <button onClick={() => removeBeerFromCart(beer.id)}>-</button>
      </div>
      <Toaster />
    </div>
  );
}

export default BeerCard;
