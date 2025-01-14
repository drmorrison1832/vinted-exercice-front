import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/App.scss";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";

// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faPlus,
  faSquarePlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faPlus, faSquarePlus, faMagnifyingGlass);

import axios from "axios";

function App() {
  // <Router> is in main.jsx

  const [catalogue, setCatalogue] = useState();
  const [mustRetrieve, setMustRetrieve] = useState(true);
  const [retrieveError, setRetrieveError] = useState(false);

  async function getData() {
    try {
      let response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      if (response.data) {
        // Ici, je construis un objet plus potable

        const newCatalogue = response.data.offers.map((offer, index) => {
          return {
            owner: {
              id: offer.owner._id,
              username: offer.owner.account.username,
              avatar:
                offer.owner.account.avatar &&
                offer.owner.account.avatar.secure_url,
            },
            product: {
              name: offer.product_name,
              id: offer._id,
              description: offer.proudct_description,
              price: offer.product_price,
              brand: offer.product_details.MARQUE,
              size: offer.product_details.TAILLE,
              condition: offer.product_details.ETAT,
              color: offer.product_details.COULEUR,
              location: offer.product_details.EMPLACEMENT,
              main_picture: offer.product_image.secure_url,
              pictures: offer.product_pictures,
            },
          };
        });

        setCatalogue(newCatalogue);
        setMustRetrieve(false);
      }
    } catch (error) {
      console.log(error);
      setMustRetrieve(false);
      setRetrieveError(true);
    }
  }

  useEffect(() => {
    mustRetrieve && getData();
  }, [mustRetrieve]);

  if (retrieveError) {
    return <div className="loading-error">Error loading content</div>;
  }

  if (mustRetrieve) {
    return <div className="loading">Loading content...</div>;
  }

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage catalogue={catalogue} />} />
        <Route path="/items/:id" element={<ItemPage />} />
      </Routes>
    </>
  );
}

export default App;
