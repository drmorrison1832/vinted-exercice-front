import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";

const ItemsShowcase = ({ catalogue }) => {
  console.log(catalogue);
  return (
    <div className="items-showcase">
      {catalogue.map((item, index) => {
        return <ItemCard item={item} />;
      })}
    </div>
  );
};

export default ItemsShowcase;
