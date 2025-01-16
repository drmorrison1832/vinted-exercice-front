import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// <Router> is in main.jsx

import "./styles/App.scss";

import Header from "./Components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

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
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
