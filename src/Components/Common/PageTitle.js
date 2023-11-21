import { Link } from "react-router-dom";

import logo from "./kccb_logo.png"

function PageTitle({ title }) {
  return (
    <div className="page-title-area">
      <div className="container">
        <div className="page-title-content">
          <h2 >{title}</h2>
          <ul>
            <li>
            <img
              className="logoKccb"
              src={logo}
              alt="kccb-logo"
            />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PageTitle;