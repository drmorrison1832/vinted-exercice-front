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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);

  const navigate = useNavigate();

  const token = Cookies.get("token");

  useEffect(() => {
    setShowSearchFilters(false);
  }, [setShowSearchFilters]);

  useEffect(() => {
    function isAuthentified() {
      if (!token) {
        navigate("/");
        // setUserModalVisible(true);
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
        <h2>Vends ton article</h2>
        <div className="form-inner-section">
          <label htmlFor="picture">Photo</label>
          <input
            type="file"
            id="picture"
            onChange={(event) => {
              console.log(event.target.files);
            }}
          />
        </div>
        <div className="form-inner-section">
          <label htmlFor="title" className="publish-form-desktop-only">
            Titre
          </label>
          <input
            className="publish-form-minimalist-input"
            placeholder="Titre"
            type="text"
            id="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <label htmlFor="description" className="publish-form-desktop-only">
            Décris ton article
          </label>
          <textarea
            className="publish-form-minimalist-input"
            placeholder="Description"
            id="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
        </div>
        <div className="form-inner-section">
          <label htmlFor="brand" className="publish-form-desktop-only">
            Marque
          </label>
          <input
            className="publish-form-minimalist-input"
            placeholder="Marque"
            type="text"
            id="brand"
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <label htmlFor="size" className="publish-form-desktop-only">
            Taille
          </label>
          <input
            className="publish-form-minimalist-input"
            placeholder="Taille"
            type="text"
            id="size"
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
          <label htmlFor="color" className="publish-form-desktop-only">
            Couleur
          </label>
          <input
            className="publish-form-minimalist-input"
            placeholder="Couleur"
            type="text"
            id="color"
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
          <label htmlFor="condition" className="publish-form-desktop-only">
            État
          </label>
          <input
            className="publish-form-minimalist-input"
            placeholder="État"
            type="text"
            id="condition"
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
          <label htmlFor="city" className="publish-form-desktop-only">
            Lieu
          </label>
          <input
            className="publish-form-minimalist-input"
            placeholder="Lieu : p. ex. Paris"
            type="text"
            id="city"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>
        <div className="form-inner-section">
          <label htmlFor="price">
            Prix
            <input
              className="publish-form-minimalist-input price-input"
              placeholder="0"
              type="number"
              min="0"
              id="price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />{" "}
            €
          </label>

          <span>
            <input
              type="checkbox"
              id="exchange"
              value={exchange}
              onChange={() => {
                setExchange(!exchange);
              }}
            />
            <label htmlFor="exchange">
              Je suis intéressé•e pour les échanges
            </label>
          </span>
        </div>
        <div className="publish-button">
          <button
            className="button-type-2"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              console.log({
                title,
                description,
                brand,
                size,
                color,
                condition,
                city,
                price,
                exchange,
              });
            }}
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Publish;
