import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Close } from "@mui/icons-material";
import axios from "axios";
import swal from "sweetalert";

const EditFeaturedProductModal = (props) => {
  const { fetchAllProduct, onHide, editFeturedProduct } = props;
  console.log(editFeturedProduct, "Product to edit");
  const date = new Date();
  const today = date.toLocaleDateString();

  const [selectedImg, setSelectedImg] = useState();
  const [existingImg, setExistingImg] = useState("");
  const [featuredProductsTitle, setFeaturedProductsTitle] = useState("");

  useEffect(() => {
    setExistingImg(editFeturedProduct.img);
    setFeaturedProductsTitle(editFeturedProduct.title);
  }, [editFeturedProduct]);

  // console.log(editFeturedProduct);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const title = e.target.title.value;
    formData.append("img", selectedImg);
    formData.append("title", title);
    formData.append("date", today);
    console.log(formData);
    axios
      .put(
        `https://backend.dslcommerce.com/api/feature-product/${editFeturedProduct?._id}`,
        formData
      )
      .then((res) => {
        if (res.status === 200) {
          fetchAllProduct();
          swal({
            text: `${res.data.message}`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          onHide();
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  return (
    <div>
      <div>
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="modelAddAdmin">
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="fs-5 text-light"
            >
              <h4 className="text-white text-uppercase text-start pb-2 ">
                UPDATE FEATURED PRODUCTS
              </h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="handleModalBody">
            <div>
              <div>
                <form onSubmit={onSubmitForm}>
                  <div className="row addAdminDiv justify-content-center">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        {/* {selectedImg && (
                          <img
                            style={{
                              width: "60px",
                              height: "auto",
                              marginBottom: "10px",
                            }}
                            src={URL.createObjectURL(selectedImg)}
                            alt=""
                          />
                        )} */}

                        {selectedImg && (
                          <img
                            style={{
                              width: "60px",
                              height: "auto",
                              marginBottom: "10px",
                            }}
                            src={URL.createObjectURL(selectedImg)}
                            alt=""
                          />
                        )}
                        {existingImg && !selectedImg && (
                          <img
                            style={{
                              width: "60px",
                              height: "auto",
                              marginBottom: "10px",
                            }}
                            src={existingImg}
                            alt=""
                          />
                        )}

                        <div className="form-group text-white">
                          <p className="mb-1 text-white">
                            {/* {imageLoader ? "Uploading Images.." : "Product Image"} */}
                          </p>
                          <input
                            onChange={(e) => setSelectedImg(e.target.files[0])}
                            type="file"
                            name="img"
                            accept=".png,.jpeg,.jpg"
                            multiple
                            className="form-control bg-transparent text-white"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <p className="mb-1 text-white ">Title </p>
                          <input
                            type="text"
                            name="title"
                            value={featuredProductsTitle}
                            onChange={(e) =>
                              setFeaturedProductsTitle(e.target.value)
                            }
                            className="form-control bg-transparent text-white "
                            required
                            placeholder="Title"
                          />
                        </div>
                      </div>
                    </div>

                    <Modal.Footer className="mt-3 modalFooter">
                      <button
                        type="button"
                        className="adminBtnAdd11"
                        onClick={props.onHide}
                      >
                        CANCEL
                      </button>
                      <button type="submit" className="adminBtnAdd">
                        UPDATE
                      </button>
                    </Modal.Footer>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default EditFeaturedProductModal;
