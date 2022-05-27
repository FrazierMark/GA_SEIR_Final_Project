import React, { useState } from "react";
import "./LoginPage.css";
import userService from "../../utils/userService";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function LoginPage(props) {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userService.login(state);
      // Route to wherever you want!
      props.handleSignUpOrLogin();
      navigate("/");
    } catch (err) {
      // Invalid user data (probably duplicate email)
      setError(err.message);
    }
  }

  return (
    <>
      <Navbar user={props.user} />
      <div class="login-wrapper">
        <form autoComplete="off" class="form" onSubmit={handleSubmit}>
          <img src="https://i.imgur.com/ic7njgq.png" alt="" />
          <h2>Login</h2>
          <div class="input-group">
            <input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
          </div>
          <div class="input-group">
            <input
              className="input-group"
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
          </div>
          <input type="submit" value="Login" className="submit-btn"></input>
          <div class="input-group">
            New to us? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  );
}
