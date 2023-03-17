import React from "react";
import axios from "axios";
import endPoints from "../config/endPoints";
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {
  const [registerState, setRegisterState] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [errorState, setErrorState] = React.useState({
    login: "",
    register: "",
  });

  const navigate = useNavigate();

  const [loginState, setLoginState] = React.useState({
    email: "",
    password: "",
  });
  return (
    <div className="login-comp">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (registerState.confirmPassword === registerState.password) {
                axios
                  .post(endPoints.register, registerState)
                  .then((r) => {
                    localStorage.setItem("token", r.data.results.token);
                    navigate("/glossary");
                  })
                  .catch((e) =>
                    setErrorState({
                      ...errorState,
                      register: "Try Again",
                    })
                  );
              } else {
                setErrorState({
                  ...errorState,
                  register: "Password mismatch",
                });
              }
            }}
          >
            <h1>Create Account</h1>
            {errorState.register && (
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Error! {errorState.register}{" "}
              </span>
            )}
            <input
              type="text"
              placeholder="User Name"
              required
              value={registerState.username}
              onChange={(e) => {
                setRegisterState({
                  ...registerState,
                  username: e.target.value,
                });

                setErrorState({
                  login: "",
                  register: "",
                });
              }}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={registerState.email}
              onChange={(e) => {
                setRegisterState({
                  ...registerState,
                  email: e.target.value,
                });

                setErrorState({
                  login: "",
                  register: "",
                });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={registerState.password}
              onChange={(e) => {
                setRegisterState({
                  ...registerState,
                  password: e.target.value,
                });

                setErrorState({
                  login: "",
                  register: "",
                });
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerState.confirmPassword}
              onChange={(e) => {
                setRegisterState({
                  ...registerState,
                  confirmPassword: e.target.value,
                });

                setErrorState({
                  login: "",
                  register: "",
                });
              }}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post(endPoints.signIn, loginState)
                .then((r) => {
                  localStorage.setItem("token", r.data.results.token);
                  navigate("/glossary");
                })
                .catch((e) =>
                  setErrorState({
                    ...errorState,
                    login: "Email or Password is incorrect",
                  })
                );
            }}
          >
            <h1>Sign in</h1>
            {errorState.login && (
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Error! {errorState.login}
              </span>
            )}
            <input
              type="email"
              placeholder="Email"
              value={loginState.email}
              onChange={(e) => {
                setLoginState({
                  ...loginState,
                  email: e.target.value,
                });
                setErrorState({
                  login: "",
                  register: "",
                });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginState.password}
              onChange={(e) => {
                setLoginState({
                  ...loginState,
                  password: e.target.value,
                });

                setErrorState({
                  login: "",
                  register: "",
                });
              }}
            />
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={(e) => {
                  const container = document.getElementById("container");
                  container.classList.remove("right-panel-active");
                }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={(e) => {
                  const container = document.getElementById("container");

                  container.classList.add("right-panel-active");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
