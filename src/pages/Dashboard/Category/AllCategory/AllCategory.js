import React, { useEffect, useState } from "react";
import { Button, Typography, Modal, Box, Tooltip } from "@mui/material";
import Table from "react-bootstrap/Table";
import swal from "sweetalert";
import axios from "axios";
import CategoryModal from "./CategoryModal";
import "./AllCatergory.css";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../../../Components/Pagination/Pagination";
import UpdateCategory from "./UpdateCategory";
// import { RxCross2 } from 'react-icons/';

import "./CategoryModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AllCategory = () => {
  const { categoryPerPage } = useParams();
  console.log(categoryPerPage, 'categoryPerPage');
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = useState(false);
  const [name, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryUpdate, setCategoryUpdate] = useState({
    show: false,
    loading: false,
    value: null,
  });

  const [editCategoryModal, setEditCategoryModal] = useState(false);

  //****************************** Pagination Start ******************************/
  const navigate = useNavigate();
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceCategories, setSliceCategories] = useState([]);
  // console.log(sliceProducts)

  useEffect(() => {
    const lastPage = Math.ceil(categories?.length / show);
    setLastPage(lastPage);
  }, [categories, show]);






  useEffect(() => {
    if (categoryPerPage) {
      const page = parseInt(categoryPerPage);
      const getSlicingCategory = categories.slice(
        (page - 1) * show,
        page * show
      );
      setSliceCategories([...getSlicingCategory]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = categories.slice(0, show);
      setSliceCategories([...getSlicingProduct]);
    }
  }, [categories, show, categoryPerPage]);

  const pageHandle = (jump) => {
    navigate(`/admin/all-category/${jump}`);
    setPage(parseInt(jump));
  };

  //****************************** Pagination End ******************************/

  const getCategory = () => {
    fetch(`https://backend.dslcommerce.com/api/category/`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data)
          data.forEach((data) => {
            // console.log(data._id);
          });
      });
  };

  //get all categories
  useEffect(() => {
    getCategory();
    // console.log(data)
  }, []);

  //post new categories
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://backend.dslcommerce.com/api/category/", { name })
      .then((res) => {
        if (res.status === 201) {
          swal({
            // title: "Success",
            text: res.data.message,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          handleClose();
          getCategory();
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
        // console.log(error);
        // setIsLoadingAdmin(false);
      });
  };

  //edit categories
  const handleEdit = async (e, id, name) => {
    e.preventDefault();
    console.log("handleEdit");
    console.log(id);
    console.log(name);

    try {
      const response = await axios.put(
        "https://backend.dslcommerce.com/api/category/" + id,
        { name }
      );

      console.log(response);
      setCategoryUpdate({
        show: false,
        loading: false,
        value: null,
      });
      if (response.status === 200) {
        swal({
          // title: "Success",
          text: response.data.message,
          icon: "success",
          button: "OK!",
          className: "modal_class_success",
        });
      }

      getCategory();
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const deleteWarning = (category) => {
    swal({
      title: "Are you sure to delete " + category.name + "?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDelete(category._id);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const handleDelete = async (id) => {
    console.log("handleDelete");
    console.log(id);
    try {
      const response = await axios.delete(
        "https://backend.dslcommerce.com/api/category/" + id
      );
      if (response.status === 200) {
        swal({
          // title: "Success",
          text: response.data.message,
          icon: "success",
          button: "OK!",
          className: "modal_class_success",
        });
      }
      console.log(response);
      getCategory();
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <h5 className="text-white text-start text-uppercase pt-1">CATEGORIES</h5>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modalBg text-white" sx={style}>

            <div className="text-start d-flex justify-content-between">
              <h4 className="text-white text-uppercase text-start py-2 ">
                Add Category
              </h4>
              <span className="p-1 crossButton"
                onClick={handleClose}
                style={{ cursor: 'pointer' }}>X</span>
            </div>

            <div className="my-3 pb-2">
              <hr />
            </div>
            <form id="contactForm" className="form" onSubmit={handleSubmit}>
              <div className="">
                <div className="form-group">
                  <input
                    type="text"
                    name="categoryName"
                    id="categoryName"
                    className="form-control"
                    style={{ paddingLeft: "0" }}
                    required
                    data-error="Please enter category Name"
                    placeholder=" Category Name"
                    value={name}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>
              <div className="my-3 pb-2">
                <hr />
              </div>
              <div className="mt-3 d-flex justify-content-center gap-1 text-center mt-2 modalFooter">
                <button
                  type="button"
                  className="adminBtnAdd11"
                  onClick={handleClose}
                >
                  CANCEL
                </button>
                <button type="submit" className="adminBtnAdd ">
                  ADD
                </button>
              </div>

              {/* <div className="">
                <div className="col-6 text-center">
                  <div>
                    <button
                      type="submit"
                      className="default-btn cBtn p-1 my-2 p-md-2 m-md-0 border text-uppercase"
                      style={{ cursor: "pointer" }}
                    >
                      SAVE
                      <span></span>
                    </button>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div>
                    <button
                      type="button"
                      className="default-btn cBtn p-1 my-2 p-md-2 m-md-0 border"
                      style={{ cursor: "pointer" }}
                      onClick={handleClose}
                    >
                      CANCEL
                      <span></span>
                    </button>
                  </div>
                </div>
              </div> */}
            </form>
          </Box>
        </Modal>
      </div>
      <div className="productCard pb-2">
        <div className="d-flex flex-column flex-row mb-3 justify-content-lg-between align-items-center">
          <Button
            variant="contained"
            xs={{ size: "large" }}
            sx={{ mt: "1rem", mb: "2rem" }}
            style={{ background: '#6958BE' }}
            onClick={handleOpen}
          >
            ADD CATEGORY
          </Button>
        </div>
        <Table style={{ color: "white" }}>
          <thead>
            <tr>
              <th>CATEGORIES</th>
              <th className="text-end">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {sliceCategories &&
              sliceCategories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>

                  <td>
                    <div className="text-end">
                      <Tooltip title="Update category." placement="top">
                        <button
                          type="button"
                          className="editBtn"
                          onClick={() =>
                            setCategoryUpdate({
                              ...categoryUpdate,
                              value: category,
                              show: true,
                            })

                          }

                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      </Tooltip>
                      <Tooltip title="Delete category." placement="top">
                        <button
                          className="deleteBtn"

                          onClick={() => {
                            deleteWarning(category);
                          }}
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

        {/* Pagination  */}
        <div className="">
          {sliceCategories?.length ? (
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

      {/* <UpdateCategory
        show={editCategoryModal}
        category={categoryUpdate.value}
        setEditCategoryModal={setEditCategoryModal}
        handleSubmit={handleEdit}
        onHide={() => setEditCategoryModal(false)}
      ></UpdateCategory> */}



      {categoryUpdate.show && (
        <CategoryModal
          open={categoryUpdate.show}
          category={categoryUpdate.value}
          handleClose={() =>
            setCategoryUpdate({
              show: false,
              loading: false,
              value: null,
            })
          }
          handleSubmit={handleEdit}
        ></CategoryModal>
      )}
    </>
  );
};

export default AllCategory;
