import axios from "axios";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";

const UserLoginModal = ({ setUserLoginModalVisible }) => {
  const [errorLoading, setErrorLoading] = useState(false);
  // const navigate = Navigate();

  // ===> À FAIRE: token && redirect vers Home
  // ===> FINIR FORMULAIRE

  async function handleClick(event) {
    event.preventDefault();
    try {
      let response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: "fmorri@gmail.com",
          password: "vinted",
        }
      );
      console.log(response);

      Cookie.set("token", response.data.token);
      Cookie.set("username", response.data.account.username);
      setUserLoginModalVisible(false);
    } catch (error) {
      console.log("error is:", error);

      setErrorLoading(true);
    }
  }

  useState(() => {});

  // ===> À FAIRE: token && RETURN redirecting...

  return (
    <div
      className="user-menu-modal-root"
      onClick={() => {
        setUserModalVisible(false);
      }}
    >
      <div
        className="user-menu-modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <form>
          <button className="button-type-2" onClick={handleClick}>
            Se connecter en tant que fmorri@gmail.com
          </button>
        </form>

        {errorLoading && (
          <div className="server-error">
            Erreur de connexion. Essaie plus tard.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLoginModal;
