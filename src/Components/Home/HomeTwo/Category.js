import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://backend.dslcommerce.com/api/category/")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <ul className="slider-categories">
      {categories?.map((eachCategory) => (
        <li>
          <Link
            to={`/shop/cat/${eachCategory?._id}/page/1`}
            className="nav-link"
          >
            {/* <i className="flaticon-camera"></i> */}
            {eachCategory?.name}
          </Link>
        </li>
      ))}

      {/* <li>
        <Link
          to="/shop/cat/634dbff29f477aab3d45d3ec/page/1"
          className="nav-link"
        >
          <i className="flaticon-camera"></i>
          Cameras
        </Link>
      </li> */}

      {/* <li>
        <Link
          to="/shop/cat/634835bca20a55c0675ab4ce/page/1"
          className="nav-link"
        >
          <i className="flaticon-desktop-computer"></i>
          Computers & Accessories
        </Link>
      </li>

      <li>
        <Link
          to="/shop/cat/634941db2cfb54eb164110c6/page/1"
          className="nav-link"
        >
          <i className="flaticon-trimmer"></i>
          Electronics
        </Link>
      </li> */}

      {/* <li>
        <Link to="/shop/cat/634835cfa20a55c0675ab4d4/page/1" className="nav-link">
          <i className="flaticon-stereo"></i>
          Audio & Home Theater
        </Link>
      </li>

      <li>
        <Link to="/shop/cat/634835d8a20a55c0675ab4d7/page/1" className="nav-link">
          <i className="flaticon-laptop"></i>
          Laptop
        </Link>
      </li>

      <li>
        <Link to="/shop/cat/634936d190708eb090100494/page/1" className="nav-link">
          <i className="flaticon-tv-box"></i>
          TV & Accessories
        </Link>
      </li>

      <li>
        <Link to="/shop/cat/63493fdd2cfb54eb1641109c/page/1" className="nav-link">
          <i className="flaticon-smartphone"></i>
          Mobiles & Tablets
        </Link>
      </li>

      <li>
        <Link to="/shop/cat/634941242cfb54eb164110bc/page/1" className="nav-link">
          <i className="flaticon-headphones"></i>
          Headphone & Earphone
        </Link>
      </li>

      <li>
        <Link to="/shop/cat/6357d5943b1acfc9609ecab0/page/1" className="nav-link">
          <i className="flaticon-battery-charge"></i>
          Battery & Accessories
        </Link>
      </li>

      <li>
        <Link to="/shop/cat/634940262cfb54eb164110a8/page/1" className="nav-link">
          <i className="flaticon-smart-watch"></i>
          Watches
        </Link>
      </li> */}
    </ul>
  );
}

export default Category;
