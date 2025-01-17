import axios from "axios";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [errorLoading, setErrorLoading] = useState(false);
  const navigate = Navigate();

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
        <input type="text" />
        <input type="password" />
        <button className="button-type-2" onClick={handleClick}>
          Se connecter en tant con Fernando
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
