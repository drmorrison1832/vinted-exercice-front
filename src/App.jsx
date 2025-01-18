// <Router> is in main.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import "./styles/App.scss";

import Header from "./comp/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";

import UserConnectionModal from "./modals/UserConnectionModal";

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
  const [showSearchFilters, setShowSearchFilters] = useState();

  const [userModalVisible, setUserModalVisible] = useState(false);

  return (
    <Router>
      <div className="app">
        <Header
          showSearchFilters={showSearchFilters}
          setUserModalVisible={setUserModalVisible}
        />
        <Routes>
          <Route
            path="/"
            element={<Home setShowSearchFilters={setShowSearchFilters} />}
          />
          <Route
            path="/offers/:id"
            element={<Offer setShowSearchFilters={setShowSearchFilters} />}
          />
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>

        {userModalVisible && (
          <UserConnectionModal setUserModalVisible={setUserModalVisible} />
        )}
      </div>
    </Router>
  );
}

export default App;
