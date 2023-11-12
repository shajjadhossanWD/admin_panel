import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/bootstrap.min.css";
import "./assets/css/flaticon.min.css";
import "./assets/css/boxicon.min.css";
import "./index.css";
import "./assets/css/responsive.min.css";
import { Provider } from "react-redux";
import store from "./redux/Store";
import App from "./App";
// import DslProvider from "./contexts/DSLCommerceContext";
import AdminProvider from "./contexts/AdminContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminProvider>
        {/* <DslProvider> */}
            
                <Provider store={store}>
                  <App />
                </Provider>
              
        {/* </DslProvider> */}
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
