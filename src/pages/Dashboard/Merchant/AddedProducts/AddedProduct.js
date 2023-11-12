import { Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "../../../../Components/Pagination/Pagination";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Tooltip } from "@mui/material";

const AddedProducts = () => {
  const { productPerPage } = useParams();
  // console.log("productPerPage");
  // console.log(productPerPage);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const [getCategory, setGetCategory] = useState([]);
  // console.log(allProduct)

  useEffect(() => {
    fetch("https://backend.dslcommerce.com/api/category/")
      .then((res) => res.json())
      .then((data) => setGetCategory(data));
  }, []);

  // console.log(getCategory);

  // Pagination
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceProducts, setSliceProducts] = useState([]);
  // console.log(sliceProducts)

  useEffect(() => {
    const lastPage = Math.ceil(allProduct?.length / show);
    setLastPage(lastPage);
  }, [allProduct, show]);

  useEffect(() => {
    if (productPerPage) {
      const page = parseInt(productPerPage);
      const getSlicingProduct = allProduct.slice(
        (page - 1) * show,
        page * show
      );
      setSliceProducts([...getSlicingProduct]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = allProduct.slice(0, show);
      setSliceProducts([...getSlicingProduct]);
    }
  }, [allProduct, show, productPerPage]);

  const pageHandle = (jump) => {
    navigate(`/admin/products/${jump}`);
    setPage(parseInt(jump));
  };

  const fetchAllProducts = () => {
    axios
      .get("https://backend.dslcommerce.com/api/product/admin/merchants")
      .then((res) => {
        console.log(res.data.result);
        setAllProduct(res.data.result);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, [open, refetch]);

  const handleProductDelete = (id) => {
    swal({
      text: "Are you sure, you want to delete this Product?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://backend.dslcommerce.com/api/product/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              // alert(res.data.message);
              swal({
                // title: "Success",
                text: res.data.message,
                icon: "success",
                button: "OK!",
                className: "modal_class_success",
              });
              setAllProduct(allProduct.filter((product) => product._id !== id));
            }
          })
          .catch((error) => {
            // alert(error.response.data.message);
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

  const handleProductVerify = (id) => {
    swal({
      text: "Are you sure, you want to update this product?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(`https://backend.dslcommerce.com/api/product/admin/update/${id}`)
          .then((res) => {
            if (res.status === 200) {
              swal({
                text: res.data.message,
                icon: "success",
                button: "OK!",
                className: "modal_class_success",
              });
              fetchAllProducts();
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

  // console.log(sliceProducts);

  return (
    <div className="productBody">
      <div className=" mb-3 ">
        <h5 className="text-white text-start text-uppercase">ADDED PRODUCTS</h5>
      </div>

      <div className="productCard py-2">
        <div className="tableNormal ">
          <Table
            className="text-white productDataTable "
            style={{ maxWidth: "100%" }}
          >
            <thead>
              <tr>
                <th className="text-left">Image</th>
                <th className="text-left">Name</th>
                <th className="text-left productHidden">Price</th>
                <th className="text-left productHidden">Type</th>
                <th className="text-left productHidden">Status</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {sliceProducts?.map((product) => (
                <tr className="tableRow" key={product?._id}>
                  <td align="left">
                    {" "}
                    <img
                      className="imgProduct"
                      src={product?.images[0]}
                      alt="Product Img"
                    />
                  </td>
                  <td className="text-left text-capitalize">
                    {product.productName}
                  </td>
                  <td className="text-left productHidden">{product?.price}</td>
                  <td className="text-left text-capitalize productHidden">
                    {
                      getCategory?.find((cat) => cat?._id === product?.category)
                        ?.name
                    }
                  </td>
                  <td className="text-left text-capitalize productHidden">
                    {product.status === true ? "Verified" : "Non-verified"}
                    {console.log(product, "product here")}
                  </td>
                  <td className="action">
                    <div className="actionDiv text-left">
                      <Tooltip title="Edit product" placement="top">
                        <Link
                          to={`/admin/editUnverifiedProduct/${product?._id}`}
                        >
                          <button className="editBtn">
                            <i className="fas fa-edit"></i>
                          </button>
                        </Link>
                      </Tooltip>

                      <Tooltip title="Delete product" placement="top">
                        <button
                          onClick={() => handleProductDelete(product?._id)}
                          className="deleteBtn text-white"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </Tooltip>

                      <Tooltip title="Verify product" placement="top">
                        <button
                          onClick={() => handleProductVerify(product._id)}
                          className="deleteBtn bg-primary text-white"
                        >
                          <LibraryAddIcon />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Pagination  */}
      <div className="">
        {sliceProducts?.length ? (
          <Pagination
            lastPage={lastPage}
            page={getPage}
            pageHandle={pageHandle}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AddedProducts;
