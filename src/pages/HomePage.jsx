import { Link } from "react-router-dom";

import BannerSection from "../Components/BannerSection";
import ItemsShowcase from "../Components/ItemsShowcase";

const HomePage = ({ catalogue }) => {
  return (
    <div className="">
      <BannerSection />
      <ItemsShowcase catalogue={catalogue} />
    </div>
  );
};

export default HomePage;
