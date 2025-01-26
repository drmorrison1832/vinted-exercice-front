import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Switch from "react-switch";
import { Range, getTrackBackground } from "react-range";

import { useState, useEffect } from "react";

const Header = (props) => {
  const { queryFilters, setQueryFilters } = props.queryFiltersState;
  const { showQueryFilters, setShowQueryFilters, setQueryFilterValue } =
    props.showQueryFiltersState;

  const { setUserModalVisible } = props;
  const [newTitle, setNewTitle] = useState("");

  const [newPriceRange, setNewPriceRange] = useState([0, 1000]);

  const token = Cookies.get("token");
  const username = Cookies.get("username");

  const navigate = useNavigate();

  useEffect(() => {
    const debounceUpdateTitle = setTimeout(() => {
      console.log("Debouncing...");
      const updatedQueryFilters = { ...queryFilters };
      updatedQueryFilters.title = newTitle;
      setQueryFilters(updatedQueryFilters);
    }, 1000);
    return () => {
      clearTimeout(debounceUpdateTitle);
    };
  }, [newTitle, queryFilters.title, setQueryFilters]);

  function handleSwitch() {
    queryFilters.sort === "price-asc" &&
      setQueryFilterValue("sort", "price-desc");
    queryFilters.sort === "price-desc" &&
      setQueryFilterValue("sort", "price-asc");
  }

  function handleRange() {
    // console.log(newPriceRange);
    setQueryFilterValue("priceRange", newPriceRange);
  }

  return (
    <header className="header">
      <div className="haeder-logo-block">
        <p>
          <Link to="/">Vinted </Link>
        </p>
      </div>

      <div className="search-zone">
        <div className="search-field">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          <input
            type="text"
            placeholder="Recherche des articles"
            value={newTitle}
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
          />
        </div>

        {showQueryFilters && (
          <div className="quick-search-filters">
            <div className="sort-by-price-switch">
              <div>Trier par prix</div>
              <div>
                <Switch
                  id="sort"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  handleDiameter={18}
                  offColor="#07a0a8"
                  onColor="#07a0a8"
                  height={20}
                  width={48}
                  onChange={(checked, event, id) => {
                    handleSwitch();
                  }}
                  checked={queryFilters.sort === "price-asc"}
                />
              </div>
              {/* <div>
                  <input
                    name="sort"
                    type="radio"
                    id="asc"
                    checked={queryFilters.sort === "price-asc"}
                    onChange={(event) => {
                      setQueryFilterValue("sort", "price-asc");
                    }}
                  />
                  <label htmlFor="asc">Ascendant</label>
                </div>
                <div>
                  <input
                    name="sort"
                    type="radio"
                    id="desc"
                    checked={queryFilters.sort !== "price-asc"}
                    onChange={() => {
                      setQueryFilterValue("sort", "price-desc");
                    }}
                  />
                  <label htmlFor="desc">Descendant</label>
                </div> */}
            </div>

            <div className="price-range-bar">
              <div>Prix entre :</div>
              <div>
                <Range
                  label="Select your value"
                  step={1}
                  min={0}
                  max={1000}
                  values={newPriceRange}
                  onChange={(values) => {
                    // console.log(values);
                    setNewPriceRange(values);
                  }}
                  onFinalChange={(values) => {
                    // console.log(values);
                    handleRange();
                  }}
                  // renderTrack={({ props, children }) => (
                  //   <div
                  //     {...props}
                  //     style={{
                  //       ...props.style,
                  //       height: "6px",
                  //       width: "100%",
                  //       // backgroundColor: "#07a0a8",
                  //       borderWidth: "0",
                  //     }}
                  //   >
                  //     {children}
                  //   </div>
                  // )}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: "36px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: "5px",
                          width: "100%",
                          borderRadius: "4px",
                          background: getTrackBackground({
                            values: newPriceRange,
                            colors: ["#ccc", "#07a0a8", "#ccc"],
                            min: 1,
                            max: 1000,
                            rtl: false,
                          }),
                          alignSelf: "center",
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ index, props, isDragged }) => (
                    <div
                      {...props}
                      key={props.key}
                      style={{
                        ...props.style,
                        height: "2em",
                        width: "2em",
                        borderRadius: "50%",
                        backgroundColor: " #07a0a8",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0px 2px 6px #AAA",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-28px",
                          color: " #07a0a8",
                          fontWeight: "bold",
                          fontSize: "14px",
                          fontFamily:
                            "Arial,Helvetica Neue,Helvetica,sans-serif",
                          padding: "4px",
                          borderRadius: "4px",
                          backgroundColor: "#var(--bg-color-3a)",
                        }}
                      >
                        {newPriceRange[index].toFixed(0) + " €"}
                      </div>
                      <div
                        style={{
                          height: "16px",
                          width: "5px",
                          backgroundColor: isDragged ? " #07a0a8" : " #07a0a8",
                        }}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="header-user-zone">
        {username ? (
          <div
            className="header-username"
            onClick={() => {
              setUserModalVisible(true);
            }}
          >
            {username}
          </div>
        ) : (
          <div className="header-username">Commence à vendre</div>
        )}
        <div className="header-icons-zone header-mobile-only">
          <FontAwesomeIcon
            className="icon-user-login icon-type-1"
            icon="fa-solid fa-user"
            onClick={() => {
              setUserModalVisible(true);
            }}
          ></FontAwesomeIcon>

          <FontAwesomeIcon
            className="icon-start-posting icon-type-1"
            icon="fa-solid fa-plus"
            onClick={() => {
              if (token) {
                setShowQueryFilters(false);
                navigate("/publish");
              } else setUserModalVisible(true);
            }}
          />
        </div>
      </div>
      <div className="header-buttons-zone header-desktop-only">
        <button className="button-type-1">S’inscrire</button>
        <button className="button-type-1">Se connecter</button>
        <button className="button-type-2">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
