import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

import axios from "axios";

const UserConnectionModal = ({ setUserModalVisible }) => {
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
      console.log("error is:", error);

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
          <form>
            <h2 className="connection-form-label">Se connecter</h2>
            <input type="text" placeholder="E-mail ou nom d'utilisateur" />
            <input type="password" placeholder="Mot de passe" />
            <button className="button-type-2" onClick={handleConnection}>
              Se connecter en tant con Fernando
            </button>
            <p>
              Pas encore de compte&nbsp;?
              <span
                onClick={() => {
                  setConnectionModalToRender("Signup");
                }}
              >
                Inscris-toi&nbsp;!
              </span>
            </p>
          </form>
        )}
        {connectionModalToRender === "Signup" && (
          <form>
            <h2 className="signup-form-label">S’inscrire</h2>
            <input type="text" placeholder="Nom d'utilisateur" />
            <input type="email" placeholder="E-mail" />
            <input type="password" placeholder="Mot de passe" />

            <label htmlFor="newsletter">
              <input type="checkbox" id="newsletter" />
              S'inscrire à notre newsletter
            </label>
            <button
              className="button-type-2"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              S'inscrire
            </button>
            <p
              onClick={(event) => {
                event.preventDefault();
                setConnectionModalToRender("Login");
              }}
            >
              Tu as déjà un compte&nbsp;? Connecte-toi&nbsp;!
            </p>
          </form>
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
