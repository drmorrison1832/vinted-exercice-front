import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookie from "js-cookie";

const Signup = ({
  setConnectionModalToRender,
  setUserModalVisible,
  setMustRefresh,
}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [showError, setShowError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      if (username === "" || email === "" || password === "") {
        setShowError("Merci de remplir tous les champs");
        return;
      } else {
        setShowError("");
      }
      let newUser = {
        username,
        email,
        password,
        newsletter,
      };

      // window.alert(JSON.stringify(newUser));

      let response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        newUser
      );

      console.log(response);

      Cookie.set("token", response.data.token);
      Cookie.set("username", response.data.account.username);
      setUserModalVisible(false);
      navigate("/");
      setMustRefresh(true);
    } catch (error) {
      console.log(error);
      if (error.status === 409) {
        setShowError(
          "Un utilisateur est déjà enregistré avec cette adresse email"
        );
      } else
        setShowError(
          "Au temps pour nous ! Essaie à nouveau dans quelques minutes"
        );
    }
  }

  return (
    <form>
      <h2 className="signup-form-label">S’inscrire</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="email"
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

      <label htmlFor="newsletter">
        <input
          type="checkbox"
          id="newsletter"
          checked={newsletter}
          onChange={(e) => {
            setNewsletter(!newsletter);
          }}
        />
        <span>S'inscrire à notre newsletter</span>
      </label>
      {showError === "" ? (
        <p style={{ visibility: "hidden" }}>&nbsp;</p>
      ) : (
        <p className="error">{showError}</p>
      )}
      <button
        className="button-type-2"
        onClick={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        S'inscrire
      </button>
      <p
        className="form-text link"
        onClick={(event) => {
          event.preventDefault();
          setConnectionModalToRender("Login");
        }}
      >
        Tu as déjà un compte&nbsp;? Connecte-toi&nbsp;!
      </p>
    </form>
  );
};

export default Signup;
