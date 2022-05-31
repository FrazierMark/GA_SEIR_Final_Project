import "./index.css";
import App from "./pages/App/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client"
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="m-mark-frazier.us.auth0.com"
    clientId="4utSseMGHNgBptj1teS3OkBYxylKMPk8"
    redirectUri={window.location.origin}
  >
  <Router>
    <App />
    </Router>
  </Auth0Provider>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
