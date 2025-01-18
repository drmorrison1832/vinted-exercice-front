import bannerImage from "../assets/banner-image.jpg";

const BannerSection = () => {
  return (
    <div className="banner-section">
      <img src={bannerImage} alt="banner image" />
    </div>
  );
};

export default BannerSection;
