import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import CreateFeaturedProductModal from "./CreateFeaturedProductModal";
import { useNavigate, useParams } from "react-router-dom";

import swal from "sweetalert";
import { Button, Tooltip } from "@mui/material";
import EditFeaturedProductModal from "./EditFeaturedProductModal";
import Pagination from "../../../../Components/Pagination/Pagination";


const FeturedProducts = () => {
  const { feturedPerPage } = useParams();

  const [modalShowNewProduct, setModalShowNewProduct] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [editFeturedProduct, setEditFeturedProduct] = useState({});
  const [editProductModal, setEditProductModal] = useState(false);


  //****************************** Pagination Start ******************************/
  const navigate = useNavigate();
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceFetured, setSliceFetured] = useState([]);
  // console.log(sliceProducts)

  useEffect(() => {
    const lastPage = Math.ceil(allProduct?.length / show);
    setLastPage(lastPage);
  }, [allProduct, show]);

  useEffect(() => {
    if (feturedPerPage) {
      const page = parseInt(feturedPerPage);
      const getSlicingBanner = allProduct.slice(
        (page - 1) * show,
        page * show
      );
      setSliceFetured([...getSlicingBanner]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = allProduct?.slice(0, show);
      setSliceFetured([...getSlicingProduct]);
    }
  }, [allProduct, show, feturedPerPage]);

  const pageHandle = (jump) => {
    navigate(`/admin/featuredProducts/${jump}`);
    setPage(parseInt(jump));
  };


  const fetchAllProduct = async () => {
    await axios
      .get("https://backend.dslcommerce.com/api/feature-product")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res);
          setAllProduct(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);



  const handleProductDelete = (id) => {
    swal({
      text: "Are you sure, you want to delete this product?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://backend.dslcommerce.com/api/feature-product/${id}`)
          .then((res) => {
            if (res.status === 200) {
              fetchAllProduct();
              swal({
                text: res.data.message,
                icon: "success",
                button: "OK!",
                className: "modal_class_success",
              });
            }
          })
          .catch((error) => {
            swal({
              title: "Attention",
              text: error.response.data.message,
              icon: "warning",
              button: "OK!",
              className: "modal_class_success",
            });
          });
      }
    });
  };


  return (
    <div>
      <h5 className="text-white mb-3 text-start text-uppercase">
        {" "}
        FEATURED PRODUCTS
      </h5>

      <div>

        <div className="productCard pb-2">
          <div className="tableNormal ">
            <div className="d-flex flex-column flex-row justify-content-lg-between align-items-center">
              <Button
                variant="contained"
                xs={{ size: "large" }}
                sx={{ mt: "1rem", mb: "2rem" }}
                style={{ background: "#6958BE" }}
                onClick={() => setModalShowNewProduct(true)}
              >
                ADD FEATURED PRODUCTS
              </Button>
            </div>
            <Table
              style={{ minWidth: "650px", maxWidth: "100%" }}
              className="text-white productDataTable "
            >
              <thead>
                <tr>
                  <th className="text-left">Image</th>
                  <th className="text-left">Title</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {sliceFetured?.map((product) => (
                  <tr className="tableRow">
                    <td align="left">
                      {" "}
                      <img
                        className="imgProduct"
                        src={product?.img}
                        alt="banner Img"
                      />
                    </td>

                    <td className="text-left text-capitalize ">
                      {product?.title}
                    </td>
                    <td className="text-left text-capitalize">
                      {product?.date}
                    </td>

                    <td className="action">
                      <div className="actionDiv text-left">
                        <Tooltip title="Update Fetured Product." placement="top">
                          <button
                            onClick={() => {
                              setEditFeturedProduct(product);
                              setEditProductModal(true);
                            }}
                            className="editBtn"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete Fetured Product." placement="top">
                          <button
                            onClick={() => handleProductDelete(product?._id)}
                            className="deleteBtn text-white"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/*********************************** Pagination  Start***********************************/}

            {sliceFetured?.length ? (
              <Pagination
                lastPage={lastPage}
                page={getPage}
                pageHandle={pageHandle}
              />
            ) : (
              <></>
            )}
            {/*********************************** Pagination  End *************************************/}


          </div>
        </div>
        {/******  Create Featured Product Modal   start here ******/}

        <CreateFeaturedProductModal
          show={modalShowNewProduct}
          fetchAllProduct={fetchAllProduct}
          setModalShowNewProduct={setModalShowNewProduct}
          onHide={() => setModalShowNewProduct(false)}
        ></CreateFeaturedProductModal>
        {/******  Create Featured Product Modal   END ******/}

        {/******  EDIT Featured Product Modal   START ******/}

        <EditFeaturedProductModal
          show={editProductModal}
          editFeturedProduct={editFeturedProduct}
          fetchAllProduct={fetchAllProduct}
          setEditProductModal={setEditProductModal}
          onHide={() => setEditProductModal(false)}
        ></EditFeaturedProductModal>

        {/******  EDIT Featured Product Modal   END  ******/}
      </div>
    </div>
  );
};

export default FeturedProducts;
