import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/App.scss";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import MainPage from "./pages/MainPage";
import ItemPage from "./pages/ItemPage";

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/items/:id" element={<ItemPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
