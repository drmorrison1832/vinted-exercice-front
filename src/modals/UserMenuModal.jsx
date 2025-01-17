import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const UserMenuModal = ({ setUserModalVisible, setUserLoginModalVisible }) => {
  const token = Cookie.get("token");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const navigate = useNavigate();
  function handleDisconnect() {
    Cookie.remove("token");
    Cookie.remove("username");
    setUserModalVisible(false);
    navigate("/");
  }

  return (
    <div
      className="user-menu-modal-root"
      onClick={() => {
        setUserModalVisible(false);
      }}
    >
      <div
        className="user-menu-modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {!token && (
          <>
            {/* <Link
              to="/signup"
              onClick={() => {
                setUserModalVisible(false);
              }}
            > */}
            <button className="button-type-2">S'inscrire</button>
            {/* </Link> */}
            {/* <Link
              to="/login"
              onClick={() => {
                setUserModalVisible(false);
              }}
            > */}
            <button
              className="button-type-2"
              onClick={() => {
                setUserModalVisible(false);
                setUserLoginModalVisible(true);
              }}
            >
              Se connecter
            </button>
            {/* </Link> */}
          </>
        )}

        {token && (
          <button className="button-type-3" onClick={handleDisconnect}>
            Se déconnecter
          </button>
        )}
      </div>
    </div>
  );
};

export default UserMenuModal;
