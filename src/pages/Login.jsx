import axios from "axios";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";

const Login = () => {
  const [errorLoading, setErrorLoading] = useState(false);

  Cookie.get("token");

  // ===> À FAIRE: token && redirect vers Home
  // ===> FINIR FORMULAIRE

  async function handleClick(event) {
    event.preventDefault();
    console.log(event);
    try {
      console.log("Trying to login");
      let response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: "fmorri@gmail.com",
          password: "vinted",
        }
      );

      console.log("received token", response.data.token);

      Cookie.set("token", response.data.token);
    } catch (error) {
      console.log("error is:", error);

      setErrorLoading(true);
    }
  }

  useState(() => {});

  // ===> À FAIRE: token && RETURN redirecting...

  return (
    <div className="main-container">
      <div>Login Window</div>
      <form>
        <button className="button-type-2" onClick={handleClick}>
          Se connecter
        </button>
      </form>

      {errorLoading && (
        <div className="server-error">
          Erreur de connexion. Essaie plus tard.
        </div>
      )}
    </div>
  );
};

export default Login;
