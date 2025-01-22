import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookie from "js-cookie";

const Login = ({
  setConnectionModalToRender,
  setEmailModalVisible,
  setMustRefresh,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");

  const navigate = useNavigate();

  async function handleConnection() {
    try {
      if (email === "" || password === "") {
        setShowError("Merci de renseigner tous les champs");
        return;
      } else {
        setShowError("");
      }

      let response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );

      Cookie.set("token", response.data.token);
      Cookie.set("username", response.data.account.username);
      setEmailModalVisible(false);
      navigate("/");
      setMustRefresh(true);
    } catch (error) {
      // setShowError(error.response.data.message);
      setShowError("Email ou mot de passe incorrect");
    }
  }

  return (
    <form>
      <h2 className="connection-form-label">Se connecter</h2>
      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      {showError === "" ? (
        <p style={{ visibility: "hidden" }}>&nbsp;</p>
      ) : (
        <p className="error">{showError}</p>
      )}
      <button
        className="button-type-2"
        onClick={(event) => {
          event.preventDefault();
          handleConnection();
        }}
      >
        Se connecter
      </button>
      <p
        className="form-text link"
        onClick={() => {
          setConnectionModalToRender("Signup");
        }}
      >
        Pas encore de compte&nbsp;? Inscris-toi&nbsp;!
      </p>
    </form>
  );
};

export default Login;
