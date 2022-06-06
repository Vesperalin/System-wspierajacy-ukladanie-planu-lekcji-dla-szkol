import React from "react";
import axios from "axios";

import style from "./Login.module.scss";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();

  const googleLogin = (accesstoken) => {
    axios
      .post("http://127.0.0.1:8000/auth/convert-token", {
        token: accesstoken,
        backend: "google-oauth2",
        grant_type: "convert_token",
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret:
          "pbkdf2_sha256$320000$MaxuZZIBNP7TKK9UojIcyZ$hh4Iml+1zdrVS3Z8FdbMB0qcdCM84m3eLBlxw40Xxhs=",
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        nav("/");
      });
  };

  const responseGoogle = (response) => {
    googleLogin(response.accessToken);
  };

  const failureGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className={style.wrapper}>
      <h1>Login</h1>
      <div className={style.panel}>
        <div className={style.action}>
          <h3>Log in to app:</h3>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={failureGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className={style.action}>
          <h3>Don't have an account? Sign up!</h3>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign up"
            onSuccess={responseGoogle}
            onFailure={failureGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
