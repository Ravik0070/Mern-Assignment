import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import Errors from "../component/Errors";
import Button from "react-bootstrap/Button";
import rootUrl from "../RootUrl";
const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await login(inputs);
      if (res.success === false) {
        setError(res.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Something went wrong !");
    }
  };
  return (
    <div className="auth">
      <div className="authContainer">
        <div className="heading">Login</div>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="abc@hmail.com"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={handleChange}
                required
              />
            </div>
            <Button variant="secondary" type="submit">
              Login
            </Button>
          </form>
          <div className="signupLink">
            Don't have an account? &nbsp;
            <Link to="/register">
              Sign Up <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
      {error && <Errors error={error} />}
    </div>
  );
};

export default Login;
