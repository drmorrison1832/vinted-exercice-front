import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

import Login from "./Login";
import Signup from "./Signup";

import axios from "axios";

const UserConnectionModal = ({ setUserModalVisible, setMustRefresh }) => {
  const token = Cookie.get("token");

  // Possible values: LoginOrSignup, Login, SignupLogout, ErrorUnknown
  const [connectionModalToRender, setConnectionModalToRender] = useState();

  const navigate = useNavigate();

  useEffect(function disableScrolling() {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(
    function setInitialConnectionModalToRender() {
      if (!token) {
        setConnectionModalToRender("LoginOrSignup");
      } else {
        setConnectionModalToRender("Logout");
      }
    },
    [token]
  );

  async function handleConnection(event) {
    event.preventDefault();
    try {
      let response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: "fmorri@gmail.com",
          password: "vinted",
        }
      );

      Cookie.set("token", response.data.token);
      Cookie.set("username", response.data.account.username);
      setUserModalVisible(false);
      navigate("/");
    } catch (error) {
      setConnectionModalToRender("ErrorUnknown");
    }
  }

  function handleDisconnect(event) {
    event.preventDefault();
    Cookie.remove("token");
    Cookie.remove("username");
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
