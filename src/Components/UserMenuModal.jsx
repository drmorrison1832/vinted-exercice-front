import { Link } from "react-router-dom";

const UserMenuModal = ({ setUserModalVisible }) => {
  return (
    <>
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
          <Link
            to="/signup"
            onClick={() => {
              setUserModalVisible(false);
            }}
          >
            <button className="button-type-2">S'inscrire</button>
          </Link>

          <Link
            to="/login"
            onClick={() => {
              setUserModalVisible(false);
            }}
          >
            <button className="button-type-2">Se connecter</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserMenuModal;
