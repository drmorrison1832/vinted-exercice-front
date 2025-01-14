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

  const [data, setData] = useState();
  const [mustRetrieve, setMustRetrieve] = useState(true);
  const [retrieveError, setRetrieveError] = useState(false);

  async function getData() {
    try {
      let newData = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      if (newData) {
        setData(newData);
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
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items/:id" element={<ItemPage />} />
      </Routes>
    </>
  );
}

export default App;
