import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import axios from "axios";

const Publish = ({
  setShowQueryFilters,
  userModalVisible,
  setUserModalVisible,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [data, setData] = useState();

  const [params, setParams] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    city: "",
    brand: "",
    size: "",
    color: "",
  });

  // const [picture, setPicture] = useState(new File([], "foo.txt"));
  const [picture, setPicture] = useState();

  const navigate = useNavigate();

  const token = Cookies.get("token");

  if (!token) {
    navigate("/");
  }

  useEffect(() => {
    setShowQueryFilters(false);
  }, [setShowQueryFilters]);

  function handleChange(param, value) {
    const newParams = { ...params };
    newParams[param] = value;
    setParams(newParams);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (params.title === "" || params.price === "" || picture === "") {
      let emptyKeys = [];
      Object.keys(params).forEach((key) => {
        if (params[key] === "") {
          emptyKeys.push(key);
        }
      });
      window.alert("Tu n'as pas rempli les champs suivants :\n" + emptyKeys);
      return;
    }

    const formData = new FormData();

    formData.append("picture", picture);

    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        { headers: { authorization: `Bearer ${token}` } }
      );
      setData(response.data);
      setIsLoading(false);
      navigate(`/offers/${response.data._id}`, { state: { newOffer: true } });
    } catch (error) {
      if (error.status === 401) {
        setUserModalVisible(true);
        return;
      }
      setErrorLoading(true);
      setIsLoading(false);
    }
  }

  return (
    <div className="publish-page-container">
      <form className="publish-form">
        <h2>Vends ton article</h2>
        <div className="form-inner-section">
          {picture && (
            <div
              onClick={() => {
                setPicture(null);
              }}
            >
              X
            </div>
          )}
          <label htmlFor="picture" id="picture-label">
            {!picture ? (
              <div>Ajouter une photo...</div>
            ) : (
              <div>
                <img src={URL.createObjectURL(picture)} alt="" />
              </div>
            )}
          </label>
          <input
            type="file"
            id="picture"
            accept="image/*"
            onChange={(event) => {
              // console.log(event.target.files);
              setPicture(event.target.files[0]);
            }}
          />
        </div>
        <div className="form-inner-section">
          <input
            className="publish-form-minimalist-input"
            placeholder="Titre"
            type="text"
            id="title"
            value={params.title}
            onChange={(event) => {
              // setTitle(event.target.value);
              handleChange("title", event.target.value);
            }}
          />

          <textarea
            className="publish-form-minimalist-input"
            placeholder="Description"
            id="description"
            value={params.description}
            onChange={(event) => {
              // setDescription(event.target.value);
              handleChange("description", event.target.value);
            }}
          ></textarea>
        </div>
        <div className="form-inner-section">
          <input
            className="publish-form-minimalist-input"
            placeholder="Marque"
            type="text"
            id="brand"
            onChange={(event) => {
              // setBrand(event.target.value);
              handleChange("brand", event.target.value);
            }}
          />

          <input
            className="publish-form-minimalist-input"
            placeholder="Taille"
            type="text"
            id="size"
            onChange={(event) => {
              // setSize(event.target.value);
              handleChange("size", event.target.value);
            }}
          />

          <input
            className="publish-form-minimalist-input"
            placeholder="Couleur"
            type="text"
            id="color"
            onChange={(event) => {
              // setColor(event.target.value);
              handleChange("color", event.target.value);
            }}
          />

          <input
            className="publish-form-minimalist-input"
            placeholder="État"
            type="text"
            id="condition"
            onChange={(event) => {
              // setCondition(event.target.value);
              handleChange("condition", event.target.value);
            }}
          />

          <input
            className="publish-form-minimalist-input"
            placeholder="Lieu : p. ex. Paris"
            type="text"
            id="city"
            onChange={(event) => {
              // setCity(event.target.value);
              handleChange("city", event.target.value);
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
              value={params.price}
              onChange={(event) => {
                // setPrice(event.target.value);
                handleChange("price", event.target.value);
              }}
            />{" "}
            €
          </label>

          <span>
            <input
              type="checkbox"
              id="exchange"
              value={params.exchange}
              onChange={() => {
                // setExchange(!exchange);
                handleChange("exchange", !params.exchange);
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
              // event.preventDefault();
              handleSubmit(event);
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

// const [title, setTitle] = useState("");
// const [description, setDescription] = useState("");
// const [brand, setBrand] = useState("");
// const [size, setSize] = useState("");
// const [color, setColor] = useState("");
// const [condition, setCondition] = useState("");
// const [city, setCity] = useState("");
// const [price, setPrice] = useState("");
// const [exchange, setExchange] = useState(false);

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

// useEffect(() => {
//   function isAuthentified() {
//     if (!token) {
//       navigate("/");
//     }
//   }
//   isAuthentified();
// }, [token, navigate, setUserModalVisible, userModalVisible]);

// let { title, description, price, condition, city, brand, size, color } =
//   params;
//
// if (Object.values(params).includes("")) {
//   let emptyKeys = [];
//   Object.keys(params).forEach((key) => {
//     if (params[key] === "") {
//       emptyKeys.push(key);
//     }
//   });
//   window.alert("Tu n'as pas rempli les champs suivants :\n" + emptyKeys);
//   return;
// }
