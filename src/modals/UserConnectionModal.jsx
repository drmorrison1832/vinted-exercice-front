import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { handleUserCookie } from "../assets/utils/handleUserCookie";

// import Cookie from "js-cookie";

import Login from "./Login";
import Signup from "./Signup";

import axios from "axios";

const UserConnectionModal = ({ setUserModalVisible, setMustRefresh }) => {
  // const userStr = Cookie.get("userObj");
  // const userObj = userStr ? JSON.parse(userStr) : null;
  const userObj = handleUserCookie.get();

  // Possible values: LoginOrSignup, Login, SignupLogout, ErrorUnknown
  const [connectionModalToRender, setConnectionModalToRender] = useState();

  const navigate = useNavigate();

  useEffect(function disableScrolling() {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(
    function setInitialConnectionModalToRender() {
      if (userObj) {
        setConnectionModalToRender("Logout");
      } else {
        setConnectionModalToRender("LoginOrSignup");
      }
    },
    [userObj]
  );

  function handleDisconnect(event) {
    event.preventDefault();
    handleUserCookie.clear();
    setUserModalVisible(false);
    navigate("/");
  }

  return (
    <div
      className="modal-root"
      onClick={() => {
        setUserModalVisible(false);
      }}
    >
      <div
        className="connection-modal-window"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div
          onClick={() => {
            setUserModalVisible(false);
          }}
        >
          X
        </div>
        {connectionModalToRender === "LoginOrSignup" && (
          <>
            <div>Tu as déjà un compte ?</div>
            <button
              className="button-type-2"
              onClick={() => {
                setConnectionModalToRender("Login");
              }}
            >
              Se connecter
            </button>
            <div>Ou inscris-toi dès maintenant :</div>

            <button
              className="button-type-2"
              onClick={() => {
                setConnectionModalToRender("Signup");
              }}
            >
              S'inscrire
            </button>
          </>
        )}
        {connectionModalToRender === "Login" && (
          <Login
            setConnectionModalToRender={setConnectionModalToRender}
            setUserModalVisible={setUserModalVisible}
            setMustRefresh={setMustRefresh}
          />
        )}
        {connectionModalToRender === "Signup" && (
          <Signup
            setConnectionModalToRender={setConnectionModalToRender}
            setUserModalVisible={setUserModalVisible}
            setMustRefresh={setMustRefresh}
          />
        )}
        {connectionModalToRender === "Logout" && (
          <button className="button-type-3" onClick={handleDisconnect}>
            Se déconnecter
          </button>
        )}
        {connectionModalToRender === "ErrorUnknown" && (
          <div className="server-error">
            Erreur de connexion. Essaie plus tard.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserConnectionModal;
