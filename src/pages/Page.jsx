import { useParams } from "react-router-dom";

const Item = (props) => {
  const { Link } = props;
  const { id } = useParams();

  return (
    <div className="generic-component">
      <h1>param is {id}</h1>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default Item;
