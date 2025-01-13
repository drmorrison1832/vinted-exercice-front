const Header = () => {
  return (
    <header className="header">
      <div className="website-logo">Vinted</div>

      <div className="search-zone">
        <div className="search-field">
          <input type="text" />
        </div>

        <div className="quick-search-filters">
          <div className="sort-by-price-switch">[Switch]</div>
          <div className="price-range-bar">----o--------------</div>
        </div>
      </div>

      <div className="header-buttons-zone">
        <button className="header-button-type-1">Button 1</button>
        <button className="header-button-type-1">Button 2</button>
        <button className="header-button-type-2">Button 3</button>
      </div>
    </header>
  );
};

export default Header;
