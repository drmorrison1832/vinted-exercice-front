import { Link } from "react-router-dom";

import BannerSection from "../Components/BannerSection";
import ItemsShowcase from "../Components/ItemsShowcase";

const HomePage = () => {
  return (
    <div className="">
      <BannerSection />
      <ItemsShowcase />
    </div>
  );
};

export default HomePage;
