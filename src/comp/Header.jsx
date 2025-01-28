import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Switch from "react-switch";
import { Range, getTrackBackground } from "react-range";

import { useState, useEffect } from "react";

import { handleUserCookie } from "../assets/utils/handleUserCookie";

const Header = (props) => {
  const { queryFilters, setQueryFilters } = props.queryFiltersState;
  const { showQueryFilters, setShowQueryFilters, setQueryFilterValue } =
    props.showQueryFiltersState;

  const { setUserModalVisible } = props;
  const [newTitle, setNewTitle] = useState("");

  const [newPriceRange, setNewPriceRange] = useState([0, 1000]);

  const userObj = handleUserCookie.get();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Debouncing...");
    const debounceUpdateTitle = setTimeout(() => {
      console.log("Debounced");
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
            <div className="sort-by-price-switch-container">
              <div>Trier par prix</div>
              <div className="switch">
                <Switch
                  id="sort"
                  uncheckedIcon={null}
                  checkedIcon={null}
                  handleDiameter={18}
                  offColor="#07a0a8"
                  onColor="#07a0a8"
                  height={20}
                  width={48}
                  onChange={(checked, event, id) => {
                    handleSwitch();
                  }}
                  checked={queryFilters.sort === "price-asc"}
                  uncheckedHandleIcon={
                    <div className="arrow-up">
                      <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
                    </div>
                  }
                  checkedHandleIcon={
                    <div className="arrow-up">
                      <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
                    </div>
                  }
                />
              </div>
            </div>

            <div className="price-range-bar-container">
              <div>Prix entre :</div>
              <div className="range">
                <Range
                  label=""
                  step={1}
                  min={0}
                  max={1000}
                  values={newPriceRange}
                  onChange={(values) => {
                    setNewPriceRange(values);
                  }}
                  onFinalChange={() => {
                    setQueryFilterValue("priceRange", newPriceRange);
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={() => {}}
                      style={{
                        height: "30px",
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
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                        backgroundColor: " #07a0a8",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0px 2px 6px #d3d3d3",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-2.1em",
                          color: " #ffffff",
                          // fontWeight: "bold",
                          // fontSize: "14px",
                          fontFamily:
                            "Arial,Helvetica Neue,Helvetica,sans-serif",
                          padding: "0.2em 0.4em",
                          borderRadius: "4px",
                          backgroundColor: "#07a0a8",
                          width: "fit-content",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
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
        {userObj ? (
          <div
            className="header-username"
            onClick={() => {
              setUserModalVisible(true);
            }}
          >
            {userObj.username}
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
              if (userObj) {
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

{
  /* <div>
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
                </div> */
}
