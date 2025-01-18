import { Link } from "react-router-dom";
// import ItemCard from "./ItemCard";

const ItemsShowcase = ({ data }) => {
  return (
    <div className="items-showcase">
      {data.offers.map((offer, index) => {
        return (
          <article className="offer-card" key={index}>
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
              <div className="card-price">{offer.product_price} €</div>
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
          </article>
        );
      })}
    </div>
  );
};

export default ItemsShowcase;
