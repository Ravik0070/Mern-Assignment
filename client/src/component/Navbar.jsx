import { PowerCircle } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
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
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout &nbsp;
            <PowerCircle color="red" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
