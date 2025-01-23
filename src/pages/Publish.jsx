import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import axios from "axios";

// import formatPrice from "../assets/tools/formatPrice";

const Publish = ({
  setShowSearchFilters,
  userModalVisible,
  setUserModalVisible,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [data, setData] = useState();

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [marque, setMarque] = useState("");
  const [taille, setTaille] = useState("");
  const [couleur, setCouleur] = useState("");
  const [etat, setEtat] = useState("");
  const [lieu, setLieu] = useState("");
  const [prix, setPrix] = useState("");

  const navigate = useNavigate();

  const token = Cookies.get("token");
  setShowSearchFilters(false);

  useEffect(() => {
    function isAuthentified() {
      if (!token) {
        setUserModalVisible(true);
      }
    }
    isAuthentified();
  }, [token, navigate, setUserModalVisible, userModalVisible]);

  useEffect(() => {
    async function getData() {
      try {
        const params = {};
        const response = { data: "test" };
        // const response = await axios.post(
        //   "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        //   params,
        //   { headers: { authorization: `Bearer ${token}` } }
        // );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        // console.log(error);
        if (error.status === 401) {
          setUserModalVisible(true);
          return;
        }
        setErrorLoading(true);
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  // if (errorLoading) {
  //   return (
  //     <div className="isLoading-error">
  //       Oups ! Quelque chose n'a pas fonctionné...
  //     </div>
  //   );
  // }

  // if (isLoading) {
  //   return <div className="isLoading">Chargement...</div>;
  // }

  return (
    <div className="publish-page-container">
      <form className="publish-form">
        <div className="form-inner-section">
          <input type="file" />
        </div>
        <div className="form-inner-section">
          <label htmlFor="titre">Titre</label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={(event) => {
              setTitre(event.target.value);
            }}
          />
          <label htmlFor="description">Décris ton article</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
        </div>
        <div className="form-inner-section">
          <label htmlFor="marque">Marque</label>
          <input
            type="text"
            id="marque"
            onChange={(event) => {
              setMarque(event.target.value);
            }}
          />
          <label htmlFor="taille">Taille</label>
          <input
            type="text"
            id="taille"
            onChange={(event) => {
              setTaille(event.target.value);
            }}
          />
          <label htmlFor="couleur">Couleur</label>
          <input
            type="text"
            id="couleur"
            onChange={(event) => {
              setCouleur(event.target.value);
            }}
          />
          <label htmlFor="etat">État</label>
          <input
            type="text"
            id="etat"
            onChange={(event) => {
              setEtat(event.target.value);
            }}
          />
          <label htmlFor="lieu">Lieu</label>
          <input
            type="text"
            id="lieu"
            onChange={(event) => {
              setLieu(event.target.value);
            }}
          />
        </div>
        <div className="form-inner-section">
          <label
            htmlFor="prix"
            onChange={(event) => {
              setPrix(event.target.value);
            }}
          >
            Prix
          </label>
          <input type="number" id="prix" />
          <span>
            <input type="checkbox" id="exchange" />
            <label htmlFor="exchange">
              Je suis intéressé•e pour les échanges
            </label>
          </span>
        </div>
        <input
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            console.log("titre", titre);
            console.log(description);
            console.log(marque);
            console.log(taille);
            console.log(couleur);
            console.log(etat);
            console.log(lieu);
            console.log(prix);
          }}
        />
      </form>
    </div>
  );
};

export default Publish;
