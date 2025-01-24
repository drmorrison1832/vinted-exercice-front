import { Link } from "react-router-dom";
import BannerSection from "../comp/BannerSection";
import axios from "axios";
import { useState, useEffect } from "react";
import formatPrice from "../assets/tools/formatPrice";

const Home = ({ setShowSearchFilters }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    setShowSearchFilters(true);
    async function getData() {
      try {
        let response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setErrorLoading(true);
        setIsLoading(false);
      }
    }
    getData();

    return () => {
      setShowSearchFilters(false);
    };
  }, [setShowSearchFilters]);

  if (errorLoading) {
    return <div className="isLoading-error">Error Loading content</div>;
  }

  if (isLoading) {
    return <div className="isLoading">Loading content...</div>;
  }

  return (
    <div className="">
      <BannerSection />

      <div className="main-container">
        <div className="items-showcase">
          {data.offers.map((offer) => {
            return (
              <article className="offer-card" key={offer._id}>
                <Link to={`/offers/${offer._id}`}>
                  <div className="card-owner">
                    {offer.owner.account.avatar && (
                      <div className="card-avatar">
                        <img
                          src={offer.owner.account.avatar.secure_url}
                          alt="Avatar"
                        />
                      </div>
                    )}
                    <div className="card-username">
                      {offer.owner.account.username}
                    </div>
                  </div>
                  <div className="card-image">
                    <img
                      src={offer.product_image.secure_url}
                      alt={offer.product_name}
                    />
                  </div>
                  <div className="card-info">
                    <div className="card-price">
                      {formatPrice(offer.product_price)}
                    </div>
                    {offer.product_details.map((detail, index) => {
                      return (
                        Object.keys(detail)[0] === "MARQUE" && (
                          <div key={index} className="card-brand">
                            {detail[Object.keys(detail)[0]]}
                          </div>
                        )
                      );
                    })}

                    {offer.product_details.map((detail, index) => {
                      return (
                        Object.keys(detail)[0] === "TAILLE" && (
                          <div key={index} className="card-size">
                            {Object.keys(detail)[0]} :{" "}
                            {detail[Object.keys(detail)[0]]}
                          </div>
                        )
                      );
                    })}
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
