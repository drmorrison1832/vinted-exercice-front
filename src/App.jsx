// <Router> is in main.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./styles/App.scss";

import Header from "./comp/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";

import UserConnectionModal from "./modals/UserConnectionModal";

import Cookies from "js-cookie";

// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faPlus,
  faSquarePlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faPlus, faSquarePlus, faMagnifyingGlass);

console.log("rendring App");

function App() {
  const [showSearchFilters, setShowSearchFilters] = useState();
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [mustRefresh, setMustRefresh] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    return setMustRefresh(false);
  }, [setMustRefresh]);

  return (
    <Router>
      <div className="app">
        <Header
          showSearchFilters={showSearchFilters}
          setShowSearchFilters={setShowSearchFilters}
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
          <Route
            path="/publish"
            element={
              token ? (
                <Publish
                  setShowSearchFilters={setShowSearchFilters}
                  userModalVisible={userModalVisible}
                  setUserModalVisible={setUserModalVisible}
                />
              ) : (
                <Home setShowSearchFilters={setShowSearchFilters} />
              )
            }
          />
        </Routes>

        {userModalVisible && (
          <UserConnectionModal
            setUserModalVisible={setUserModalVisible}
            setMustRefresh={setMustRefresh}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
