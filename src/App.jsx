import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// <Router> is in main.jsx

import "./styles/App.scss";

import Header from "./Components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";

// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faPlus,
  faSquarePlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faPlus, faSquarePlus, faMagnifyingGlass);

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers/:id" element={<Offer />} />
      </Routes>
    </>
  );
}

export default App;
