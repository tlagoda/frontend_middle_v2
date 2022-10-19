import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Details.css";

function Details() {
  // récupération des données envoyées via le Link d'une BeerCard
  const location = useLocation();
  const beer = location.state;

  useEffect(() => {
    // changement du titre du document
    document.title = `Beer Market | ${beer.name}`
  }, [])

  return (
    <div className="details-wrapper">
      <h1>{beer.name}</h1>
      <div className="main-content">
        <h3>Description :</h3>
        <br />
        <p>{beer.description}</p>
        <img src={beer.image_url} alt="" />
        <span>
          Volume : {beer.volume.value} {beer.volume.unit}
        </span>

        <div className="brewers-div">
          <h4>Brewers Tips :</h4>
          <br />
          <p>{beer.brewers_tips}</p>
        </div>
        <div className="ingredients-div">
          <h3>Ingredients</h3>
          <br />
          <ul>
            {Object.keys(beer.ingredients).map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Details;
