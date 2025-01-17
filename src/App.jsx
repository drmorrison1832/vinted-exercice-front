// <Router> is in main.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import "./styles/App.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserMenuModal from "./modals/UserMenuModal";
import UserLoginModal from "./modals/UserLoginModal";

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
  const [account, setAccount] = useState();
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [userLoginModalVisible, setUserLoginModalVisible] = useState(false);

  return (
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login account={account} />} />
      </Routes>

      {userModalVisible && (
        <UserMenuModal
          setUserModalVisible={setUserModalVisible}
          setUserLoginModalVisible={setUserLoginModalVisible}
        />
      )}

      {userLoginModalVisible && (
        <UserLoginModal setUserLoginModalVisible={setUserLoginModalVisible} />
      )}
    </div>
  );
}

export default App;
