import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./contextapi/productcontext";
import { FilterContextProvider } from "./contextapi/Filter_Context";
import { CartProvider } from "./contextapi/Cart_Context";
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-5uttk4bb7dln1i8s.us.auth0.com"
    clientId="BMt8Q8PjXwwwQuelztqhLvNu17m2XAds"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >

  <AppProvider>
    <FilterContextProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FilterContextProvider>
  </AppProvider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
