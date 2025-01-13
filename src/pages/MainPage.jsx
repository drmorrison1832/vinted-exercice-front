import { Link } from "react-router-dom";

import BannerSection from "../Components/BannerSection";
import ItemsShowcase from "../Components/ItemsShowcase";

const MainPage = () => {
  return (
    <div className="generic-component">
      <BannerSection />
      <ItemsShowcase />
    </div>
  );
};

export default MainPage;
