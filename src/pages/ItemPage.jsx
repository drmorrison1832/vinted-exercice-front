import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const ItemPage = () => {
  const { id } = useParams();

  return (
    <div className="item-page">
      <p>item, param is {id}</p>
      <Link to="/">
        <p>back home</p>
      </Link>
    </div>
  );
};

export default ItemPage;
