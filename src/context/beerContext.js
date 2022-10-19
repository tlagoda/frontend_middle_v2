import React, { useContext, useState, useEffect } from "react";

const BeerContext = React.createContext();

export function useBeer() {
  return useContext(BeerContext);
}

const API_URL = "https://api.punkapi.com/v2/beers?page=";
const BEERS_PER_PAGE = 25;

export function BeerProvider({ children }) {
  const [beers, setBeers] = useState([]); //les bières chargées
  const [beersOrdered, setBeersOrdered] = useState([]); // les bières commandées
  const [pageToDisplay, setPageToDisplay] = useState(1); // la page actuellement chargée

  useEffect(() => {
    // récupération de 25 bières via l'api en fonction de la page souhaitée (1 par défaut)
    fetch(API_URL + pageToDisplay)
      .then((res) => res.json())
      .then((data) => {
        setBeers(data);
      });
  }, [pageToDisplay]);

  const addBeerToCart = (id) => {
    let beerAlreadyInCart = false;
    const newCart = beersOrdered.filter((beer) => beer.quantityOrdered > 0);
    // on cherche si la bière est déjà dans le panier, auquel cas on incrémente sa quantité
    newCart.forEach((beer) => {
      if (beer.id === id) {
        beerAlreadyInCart = true; // on confirme que la bière est déjà dans le panier
        beer.quantityOrdered += 1;
      }
    });
    // si la bière n'est pas dans le panier, on l'ajoute, avec une quantité égale à 1
    if (!beerAlreadyInCart) {
      newCart.push({
        ...beers[id - BEERS_PER_PAGE * (pageToDisplay - 1) - 1],
        quantityOrdered: 1,
      }); 
    }
    setBeersOrdered(newCart);
  };

  const removeBeerFromCart = (id) => {
    const newCart = beersOrdered;
    newCart.forEach((beer) => {
      if (beer.id === id) {
        beer.quantityOrdered -= 1;
      }
    });
    // on enlève toutes les bières pour lesquelles la quantité commandée est égale à 0
    setBeersOrdered(newCart.filter((beer) => beer.quantityOrdered > 0));
  };

  const value = {
    beers,
    pageToDisplay,
    setPageToDisplay,
    beersOrdered,
    setBeersOrdered,
    addBeerToCart,
    removeBeerFromCart,
  };

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>;
}
