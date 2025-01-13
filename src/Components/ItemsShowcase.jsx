import { Link } from "react-router-dom";

const ItemsShowcase = () => {
  return (
    <div className="item-showcase">
      <h2>Lorem ipsum</h2>

      <Link to="/items/item-1">
        <p>item 1</p>
      </Link>
      <Link to="/items/item-2">
        <p>item 2</p>
      </Link>
      <Link to="/items/item-3">
        <p>item 3</p>
      </Link>
      <Link to="/items/item-4">
        <p>item 4</p>
      </Link>
      <Link to="/items/item-5">
        <p>item 5</p>
      </Link>
    </div>
  );
};

export default ItemsShowcase;
