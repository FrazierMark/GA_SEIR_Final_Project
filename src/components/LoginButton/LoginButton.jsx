import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="login" onClick={() => loginWithRedirect()} >Log In</button>;
};

export default LoginButton;


// "[Error] Please implement the Get User script for this database connection at https://manage.auth0.com/#/connections/database"