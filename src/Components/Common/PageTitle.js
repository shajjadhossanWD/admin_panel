import { Link } from "react-router-dom";

function PageTitle({ title }) {
  return (
    <div className="page-title-area">
      <div className="container">
        <div className="page-title-content">
          <h2 >{title}</h2>
          <ul>
            <li>
              <Link to={"/admin"}>Dashboard</Link>
            </li>
            <li className="text-left">{title}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PageTitle;