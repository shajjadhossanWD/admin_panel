import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import companyLogo from "../../../assets/img/logoDSL.jpeg";
import { DSLCommerceContext } from "../../../contexts/DSLCommerceContext";
import ProductDetails from "./ProductDetails";

const KycMyProduct = () => {
  const navigate = useNavigate();
  const [productDetailModal, setProductDetailsModal] = useState(false);
  const [modalData, setModalData] = useState("");

  const handleModal = (product) => {
    // console.log(data)
    setModalData(product);
  };

  const [getCategory, setGetCategory] = useState([]);
  // console.log(allProduct)

  useEffect(() => {
    fetch("https://backend.dslcommerce.com/api/category/")
      .then((res) => res.json())
      .then((data) => setGetCategory(data));
  }, []);

  const [myProducts, setMyProducts] = useState([]);
  const { user } = useContext(DSLCommerceContext);
  // console.log(user?.walletAddress);

  useEffect(() => {
    fetch(
      `https://backend.dslcommerce.com/api/product/get/${user?.walletAddress}`
    )
      .then((res) => res.json())
      .then((data) => setMyProducts(data.result));
  }, []);

  // console.log(myProducts, 'emtiazzzzzzz');

  const logout = () => {
    localStorage.removeItem("kycUserToken");
    navigate("/");
  };

  return (
    <>
      {/* Top Header ************************ */}
      <div style={{ background: "rgb(38, 38, 38)" }}>
        <div className="container px-4 ">
          <div className="pt-2 pb-3 d-flex px-2 px-md-0 px-lg-0 align-items-center justify-content-between">
            <Link to="/" className="d-flex align-items-center">
              <img src={companyLogo} id="dslKycLogo" alt="dsl logo" />
              <span className="dslFs ">DSLCOMMERCE.COM</span>
            </Link>
            <button
              onClick={logout}
              className="ColorBg border border-0 btn btn-primary "
              style={{ fontSize: "14px" }}
            >
              <img
                src={companyLogo}
                alt="dsl logo"
                style={{ width: "25px", marginRight: "5px" }}
              />
              <span className="pl-1">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <main
        className="kycMainArea"
        style={{ background: "#6f6f6f", minHeight: "100vh", color: "white" }}
      >
        {/************************* Middle Header ************************ */}
        <div className="container px-4">
          <div className="pt-3 mb-4 d-flex flex-column flex-lg-row align-items-center justify-content-between">
            <span className="fs-4 fw-bold text-uppercase text-white ">
              DSLCOMMERCE
            </span>

            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              <span
                onClick={() => navigate("/kyc/profile/my-product")}
                className="fs-4 text-decoration-underline text-white "
                style={{ cursor: "pointer" }}
              >
                My Products
              </span>
              <button
                className="border-0 p-2 fw-bold rounded-2 fs-5"
                onClick={() => navigate("/kyc/profile")}
              >
                My Profile
              </button>
            </div>
          </div>
        </div>

        {/* <hr /> */}

        {/************************* Main KYC Body ************************ */}
        <div
          className="container p-4"
          style={{ background: "rgb(38, 38, 38)", minHeight: "100vh" }}
        >
          <div>
            <div className="container ">
              <div className=" table-responsive">
                {myProducts.length ? (
                  <>
                    <table className="table  text-white">
                      <tbody>
                        <tr>
                          <th className="border-0 ">Date</th>
                          <th className="border-0 ">Image</th>
                          <th className="border-0 ">Name</th>
                          <th className="border-0 ">Price</th>
                          <th className="border-0 ">Type</th>
                          <th className="border-0 ">Details</th>
                        </tr>
                      </tbody>

                      <tbody>
                        {myProducts.map((product, index) => (
                          <tr key={index}>
                            <td className="">
                              {product?.createdAt.slice(0, 10)}
                            </td>
                            <td className="">
                              {" "}
                              <img
                                className="imgProduct"
                                src={product?.images?.[0]}
                                alt="Product Img"
                              />
                            </td>
                            <td className="">{product?.productName}</td>
                            <td className="">$ {product?.price}</td>
                            <td className="">
                              {
                                getCategory?.find(
                                  (cat) => cat?._id === product?.category
                                )?.name
                              }
                            </td>

                            <td
                              className="product-btn "
                              style={{ cursor: "pointer" }}
                            >
                              <button
                                onClick={() => {
                                  setProductDetailsModal(true);
                                  handleModal(product);
                                }}
                                className=" btn btn-primary  "
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <div>
                    <h2 className="text-center text-white py-5 font-bold">
                      {" "}
                      No Product Found
                    </h2>
                  </div>
                )}
              </div>
            </div>

            {/* Modal  */}
            <ProductDetails
              show={productDetailModal}
              setProductDetailsModal={setProductDetailsModal}
              onHide={() => setProductDetailsModal(false)}
              myProduct={modalData}
              getCategory={getCategory}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default KycMyProduct;
