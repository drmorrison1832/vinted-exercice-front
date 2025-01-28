import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import BannerSection from "../comp/BannerSection";
import Pagination from "../comp/Pagination";

import formatPrice from "../assets/utils/formatPrice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = (props) => {
  const { setShowQueryFilters, queryFiltersState } = props;

  const { queryFilters, setQueryFilters, setQueryFilterValue } =
    props.queryFiltersState;

  const { title, priceRange, sort, page, limit } = queryFilters;
  // console.log(queryFilte  rs);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    setShowQueryFilters(true);
    async function getData() {
      console.log("Fetching data...");
      console.log("Query is:", title);
      try {
        let response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${title}&sort=${sort}&page=${page}&limit=${limit}&priceMin=${priceRange[0]}&priceMax=${priceRange[1]}`
        );
        console.log("Data received:", response.data?.count, "offers");

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
      setShowQueryFilters(false);
    };
  }, [setShowQueryFilters, title, page, limit, sort, priceRange]);

  useEffect(() => {
    data && setQueryFilterValue("page", 1);
  }, [title, sort, priceRange, limit]);

  if (errorLoading) {
    return <div className="isLoading-error">Error Loading content</div>;
  }

  if (isLoading) {
    return <div className="isLoading">Loading content...</div>;
  }

  if (data.count === 0) {
    return (
      <div className="no-results">
        <p>Aucun résultat</p>
      </div>
    );
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
        {data.count > limit && (
          <Pagination
            queryFiltersState={queryFiltersState}
            count={data.count}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
