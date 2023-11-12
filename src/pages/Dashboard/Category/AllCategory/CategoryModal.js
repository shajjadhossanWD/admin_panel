import React, { useState } from "react";
import { Button, Typography, Modal, Box, Backdrop } from "@mui/material";
// import { RxCross2 } from 'react-icons/ri';


import "./CategoryModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CategoryModal = (props) => {
  const [categoryName, setCategoryName] = useState(props.category.name);
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style={{ width: "300px !important", }}
    >
      <Box className="modalBg text-white" sx={style}>
        <div className="text-start d-flex justify-content-between">
          <h4 className="text-white text-uppercase text-start py-2 ">
            Update Category
          </h4>
          <span className="p-1 text-gray crossButton"
            onClick={props.handleClose}
            style={{ cursor: 'pointer' }}>X</span>
        </div>
        <div className="my-3 pb-2">
          <hr />
        </div>
        <form
          id="contactForm"
          className="form"
          onSubmit={(e) =>
            props.handleSubmit(e, props.category._id, categoryName)
          }
        >
          <div className="">
            <div className="form-group text-white">
              <input
                type="text"
                name="categoryName "
                id="categoryName"
                className="form-control "
                required
                data-error="Please enter category Name"
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="my-3">
            <hr />
          </div>
          <div className="mt-3 text-center mt-2 modalFooter">
            <button
              type="button"
              className="adminBtnAdd11"
              onClick={props.handleClose}
            >
              CANCEL
            </button>
            <button type="submit" className="adminBtnAdd ms-2">
              UPDATE
            </button>
          </div>
          {/* <div className="row ">
            <div className="col-6 text-center">
              <div>
                <button
                  type="submit"
                  className="default-btn cBtn p-1 m-2 p-md-2 m-md-0 border"
                  style={{ cursor: "pointer" }}
                >
                  UPDATE
                  <span></span>
                </button>
              </div>
            </div>
            <div className="col-6 text-center ">
              <div>
                <button
                  type="button"
                  className="default-btn cBtn p-1  m-2 p-md-2 m-md-0 border"
                  style={{ cursor: "pointer" }}
                  onClick={props.handleClose}
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
  );
};

export default CategoryModal;
