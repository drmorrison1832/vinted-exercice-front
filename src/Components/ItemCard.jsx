const ItemCard = ({ item }) => {
  return (
    <div className="item" key={item.id}>
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
      {/* <div>{item.product.pictures}</div> */}
      <br></br>
    </div>
  );
};

export default ItemCard;
