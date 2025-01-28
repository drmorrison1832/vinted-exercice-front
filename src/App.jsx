// <Router> is in main.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./styles/App.scss";

import Header from "./comp/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import Payment from "./pages/payment";

import UserConnectionModal from "./modals/UserConnectionModal";

import Cookie from "js-cookie";

// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faPlus,
  faSquarePlus,
  faMagnifyingGlass,
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faUser,
  faPlus,
  faSquarePlus,
  faMagnifyingGlass,
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faArrowUp,
  faArrowDown
);

function App() {
  const [query, setQuery] = useState("");
  const [queryFilters, setQueryFilters] = useState({
    title: "",
    priceRange: [0, 1000],
    sort: "price-asc",
    page: "1",
    limit: "6",
  });
  function setQueryFilterValue(filter, value) {
    // console.log(filter, "is", queryFilters[filter]);
    // console.log("Setting", filter, "to", value);

    const updatedQueryFilters = { ...queryFilters };
    updatedQueryFilters[filter] = value;
    setQueryFilters(updatedQueryFilters);
  }

  const [showQueryFilters, setShowQueryFilters] = useState();
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [mustRefresh, setMustRefresh] = useState(false);

  // const token = Cookie.get("token");
  const userObj = Cookie.get("userObj");

  useEffect(() => {
    return setMustRefresh(false);
  }, [setMustRefresh]);

  return (
    <Router>
      <div className="app">
        <Header
          showQueryFiltersState={{
            showQueryFilters,
            setShowQueryFilters,
            setQueryFilterValue,
          }}
          setUserModalVisible={setUserModalVisible}
          queryFiltersState={{
            queryFilters,
            setQueryFilters,
            setQueryFilterValue,
          }}
          queryState={{ query, setQuery }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setShowQueryFilters={setShowQueryFilters}
                query={query}
                queryFiltersState={{
                  queryFilters,
                  setQueryFilters,
                  setQueryFilterValue,
                }}
              />
            }
          />
          <Route
            path="/offers/:id"
            // element={<Offer setShowQueryFilters={setShowQueryFilters} />}
            element={<Offer />}
          />
          <Route
            path="/publish"
            element={
              userObj ? (
                <Publish
                  setShowQueryFilters={setShowQueryFilters}
                  userModalVisible={userModalVisible}
                  setUserModalVisible={setUserModalVisible}
                />
              ) : (
                <Home
                  setShowQueryFilters={setShowQueryFilters}
                  queryFiltersState={{ queryFilters, setQueryFilters }}
                />
              )
            }
          />
          <Route path="/payment" element={<Payment />}></Route>
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
