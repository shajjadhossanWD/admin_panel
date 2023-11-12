import axios from "axios";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";

const CreateBannerModal = (props) => {
  const { fetchAllBanners, onHide } = props;
  const [selectedImg, setSelectedImg] = useState();
  const date = new Date();
  const today = date.toLocaleDateString();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const title = e.target.title.value;
    formData.append("img", selectedImg);
    formData.append("title", title);
    formData.append("date", today);

    await axios
      .post("https://backend.dslcommerce.com/api/banner", formData)
      .then((res) => {
        if (res.status === 200) {
          fetchAllBanners();
          swal({
            text: res.data.message,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          onHide();
        }
      })
      .catch((err) => console.log(err));
  };

  const changePhoto = (e) => {
    setSelectedImg(e.target.files[0]);
  };

  return (
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
            <h4 className="text-white text-uppercase text-start py-2 ">
              {" "}
              create banner{" "}
            </h4>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="handleModalBody">
          <div className="row addAdminDiv">
            <div>
              <div>
                <form id="contactForm" className="form" onSubmit={onSubmitForm}>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
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

                      <div className="form-group text-white">
                        <input
                          onChange={(e) => changePhoto(e)}
                          type="file"
                          name="img"
                          accept=".png,.jpeg,.jpg"
                          className="form-control bg-transparent text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <p className="mb-1 text-white ">Title </p>
                        <input
                          type="text"
                          name="title"
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
                      ADD
                    </button>
                  </Modal.Footer>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateBannerModal;
