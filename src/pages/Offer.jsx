import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setErrorLoading(true);
        setIsLoading(false);
      }
    }
    getData();
  }, [id]);

  console.log(data);

  if (errorLoading) {
    return <div className="isLoading-error">Error isLoading content</div>;
  }

  if (isLoading) {
    return <div className="isLoading">Loading content...</div>;
  }

  return (
    <div className="item-page">
      <p>offer is {data.product_name}</p>
      <Link to="/">
        <p>back home</p>
      </Link>
    </div>
  );
};

export default Offer;
