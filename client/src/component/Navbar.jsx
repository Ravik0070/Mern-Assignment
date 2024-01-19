import { PowerCircle } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    logout();
    navigate("/login");
  };
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="heading">
        <Link to="/">NotesApp</Link>
      </div>
      {currentUser && (
        <div className="logoutBtn">
          <button onClick={handleLogout}>
            Logout &nbsp;
            <PowerCircle color="red" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
