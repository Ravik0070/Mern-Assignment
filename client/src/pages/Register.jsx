import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Errors from "../component/Errors";
import Button from "react-bootstrap/Button";
const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (inputs.password === inputs.confirmpassword) {
        const { confirmpassword, ...others } = inputs;
        let res = await axios.post("/auth/register", others);
        navigate("/login");
      } else {
        setError("Password mismatch");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="auth">
      <div className="authContainer">
        <div className="heading">Register</div>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="username"
                name="username"
                id="username"
                placeholder="some name"
                onChange={handleChange}
                required
              />
            </div>
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
            <div>
              <label htmlFor="confirmpassword">Password</label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="confirmpassword"
                onChange={handleChange}
                required
              />
            </div>
            <Button variant="secondary" type="submit">
              Register
            </Button>
          </form>
          <div className="signupLink">
            Already have an account? &nbsp;
            <Link to="/login">
              Login <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
      {error && <Errors error={error} />}
    </div>
  );
};

export default Register;
