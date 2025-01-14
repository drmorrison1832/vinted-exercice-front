import bannerImage from "../assets/banner-image.jpg";

const BannerSection = () => {
  return (
    <div className="banner-section">
      <img src={bannerImage} alt="banner image" />
      <p>Lorem Ipsum</p>
    </div>
  );
};

export default BannerSection;
