import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <article className="item-card" key={item.id}>
      <Link to="/items/">
        {item.owner.avatar && (
          <img className="avatar" src={item.owner.avatar} alt="Avatar" />
        )}
        <div>{item.owner.username}</div>
        <div>{item.product.name}</div>
        <div>{item.product.description}</div>
        product.
        <div>{item.product.price}</div>
        <div>{item.product.brand}</div>
        <div>{item.product.size}</div>
        <div>{item.product.condition}</div>
        <div>{item.product.color}</div>
        <div>{item.product.location}</div>
        <div>{item.product.main_picture}</div>
      </Link>
    </article>
  );
};

export default ItemCard;
