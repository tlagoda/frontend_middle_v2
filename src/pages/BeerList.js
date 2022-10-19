import React, { useEffect } from "react";
import "./BeerList.css";
import BeerCard from "../components/BeerCard";
import { useBeer } from "../context/beerContext";

function BeerList() {
  const { beers, pageToDisplay, setPageToDisplay } = useBeer();

  useEffect(() => {
    // changement du titre du document
    document.title = "Beer Market | Our beers";
  }, []);

  // retour en haut de page et affichage de la page précédente
  const handlePrevious = () => {
    if (pageToDisplay > 1) {
      window.scrollTo(0, 0);
      setPageToDisplay(pageToDisplay - 1);
    }
    return;
  };

  // retour en haut de page et affichage de la page suivante
  const handleNext = () => {
    if (pageToDisplay < 13) {
      window.scrollTo(0, 0);
      setPageToDisplay(pageToDisplay + 1);
    }
    return;
  };

  if (beers.length < 1) {
    return <h1>No beers</h1>;
  }

  return (
    <div>
      <div className="pagination-div">
        <span>Page {pageToDisplay}</span>
      </div>
      <div className="list-div">
        {beers.map((beer) => (
          <BeerCard beer={beer} key={beer.id} />
        ))}
      </div>
      <div className="pagination-div">
        <button disabled={pageToDisplay === 1} onClick={handlePrevious}>
          Previous
        </button>
        <span>Page {pageToDisplay} / 13</span>
        <button disabled={pageToDisplay === 13} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default BeerList;
