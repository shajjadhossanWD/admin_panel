import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/bootstrap.min.css";
import "./assets/css/flaticon.min.css";
import "./assets/css/boxicon.min.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/Store";
import App from "./App";
import AdminProvider from "./contexts/AdminContext";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminProvider>            
          <Provider store={store}>
            <App />
          </Provider>
        </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
);

