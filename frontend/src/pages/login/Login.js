import React from "react";
import googleLogo from "../../assets/google_logo.png";
import axios from "axios";

import style from "./Login.module.scss";
import { GoogleLogin } from "react-google-login";

const Login = () => {
  const googleLogin = (accesstoken) => {
    axios
      .post("http://127.0.0.1:8000/auth/convert-token", {
        token: accesstoken,
        backend: "google-oauth2",
        grant_type: "convert_token",
        client_id: "j4jCAW1jy3AszyhU6C4fZnPEQybdzAPZnJQacsRt",
        client_secret:
          "pbkdf2_sha256$320000$MaxuZZIBNP7TKK9UojIcyZ$hh4Iml+1zdrVS3Z8FdbMB0qcdCM84m3eLBlxw40Xxhs=",
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
      });
  };
  async function responseGoogle(response) {
    await googleLogin(response.accessToken);
    await setTimeout(() => window.location.reload(), 1000);
  }

  const failureGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className={style.wrapper}>
      <h1>Login</h1>
      <div className={style.panel}>
        <GoogleLogin
          clientId="178122326241-ga6pmq1c0f6jsa74jnar8mf04okncgnd.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={failureGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

export default Login;
