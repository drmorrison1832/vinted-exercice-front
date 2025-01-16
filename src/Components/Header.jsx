import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Cookies from "js-cookie";

import UserMenuModal from "./UserMenuModal";

const Header = () => {
  const [userModalVisible, setUserModalVisible] = useState(false);

  const token = Cookies.get("token");

  return (
    <header className="header">
      <div className="website-logo">
        <Link to="/">Vinted </Link>
      </div>

      <div className="search-zone">
        <div className="search-field">
          <FontAwesomeIcon
            className="icon-user-login icon-place-holder"
            icon="fa-solid fa-magnifying-glass"
          />
          <input type="text" placeholder="Recherche des articles" />
        </div>

        <div className="quick-search-filters">
          <div className="sort-by-price-switch">
            <div>Trier par prix :</div>
            <input type="checkbox" />
          </div>
          <div className="price-range-bar">
            <div>Prix entre :</div>
            <div>———O———————</div>
          </div>
        </div>
      </div>

      <div className="header-icons-zone header-mobile-only">
        <FontAwesomeIcon
          className="icon-user-login icon-type-1"
          icon="fa-solid fa-user"
          onClick={() => {
            setUserModalVisible(!userModalVisible);
          }}
        ></FontAwesomeIcon>

        <FontAwesomeIcon
          className="icon-start-posting icon-type-1"
          icon="fa-solid fa-plus"
          onClick={() => {
            token
              ? window.alert(
                  "normalement, ici tu seras dirigé vers la page des news posts"
                )
              : setUserModalVisible(true);
          }}
        />

        {userModalVisible && (
          <UserMenuModal setUserModalVisible={setUserModalVisible} />
        )}
      </div>

      <div className="header-buttons-zone header-desktop-only">
        <button className="button-type-1">S’inscrire</button>
        <button className="button-type-1">Se connecter</button>
        <button className="button-type-2">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
