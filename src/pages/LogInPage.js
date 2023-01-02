import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../components/LoginPage_Style.css";
import mainLogo from "../imgs/SAE_logo_1.png";

function LogInPage({ auth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErrorMessage("Incorrect Email/Password Combination");
      console.log(error);
    }
  };

  return (
    <div className="login_container">
      <img src={mainLogo} className="main_logo" />
      <h1>SAE Studio Booking Manager</h1>
      <p className="error_message">{errorMessage}</p>
      <form className="login_form">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
        />
        <button type="submit" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LogInPage;
