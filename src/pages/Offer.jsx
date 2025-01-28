import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import axios from "axios";

import { useParams, useLocation } from "react-router-dom";

import formatPrice from "../assets/utils/formatPrice";

const Offer = (props) => {
  const location = useLocation();

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        if (response.data === null) {
          throw new Error("L'annonce demandée n'existe pas.");
        }
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setErrorLoading(error.message);
        setIsLoading(false);
      }
    }
    getData();
  }, [id]);

  if (isLoading) {
    return <div className="isLoading">Chargement...</div>;
  }
  if (errorLoading) {
    return (
      <>
        <Link to="/">
          <div className="offer-back-button">
            <button className="button-type-1">Retour</button>
          </div>
        </Link>
        <div className="loading-error">{errorLoading}</div>
      </>
    );
  }
  return (
    <div className="offer-page-container">
      <Link to="/">
        <div className="offer-back-button">
          <button className="button-type-1">Retour</button>
        </div>
      </Link>
      {location.state?.newOffer && <div>Ton annonce est en ligne 😎 !</div>}
      <div className="offer-main-picture">
        <img src={data.product_image.secure_url} alt={data.product_name} />
      </div>
      <div className="offer-information">
        <div className="top">
          <div className="offer-price">{formatPrice(data.product_price)}</div>

          <div className="offer-details-block">
            {data.product_details.map((detail, index) => {
              return (
                <div className="offer-detail" key={Object.keys(detail)[0]}>
                  <div className="offer-detail-key">
                    {Object.keys(detail)[0]}
                  </div>
                  <div className="offer-detail-value">
                    {detail[Object.keys(detail)[0]]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bottom">
          <hr />
          <div className="offer-name">{data.product_name}</div>
          <div className="offer-description">{data.product_description}</div>

          <div className="offer-owner-section">
            <div className="offer-owner-avatar">
              {data.owner.account.avatar && (
                <img src={data.owner.account.avatar.secure_url} alt="" />
              )}
            </div>
            <div className="offer-owner-username">
              {data.owner.account.username}
            </div>
          </div>
        </div>
      </div>
      <div className="offer-buy-button">
        <button className="button-type-2">Acheter</button>
      </div>
    </div>
  );
};

export default Offer;
