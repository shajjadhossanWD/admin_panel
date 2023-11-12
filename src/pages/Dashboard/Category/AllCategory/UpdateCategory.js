import axios from "axios";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";


const UpdateCategory = (props) => {
    const [categoryName, setCategoryName] = useState(props?.category?.name);
    console.log(categoryName);



    const onSubmitForm = async (e) => {
        e.preventDefault();

    }




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
                            Update Category{" "}
                        </h4>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="handleModalBody">
                    <div className="row addAdminDiv">
                        <div>
                            <div>
                                <form id="contactForm" className="form"
                                    onSubmit={(e) =>
                                        props.handleSubmit(e, props.category._id, categoryName)
                                    }
                                >
                                    <div className="row">

                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group ">
                                                <p className="mb-1 text-white ">Category Name </p>
                                                <input
                                                    type="text"
                                                    name="categoryName"
                                                    id="categoryName"
                                                    className="form-control"
                                                    required
                                                    data-error="Please enter category Name"
                                                    placeholder="Category Name"
                                                    value={categoryName}
                                                    onChange={(e) => setCategoryName(e.target.value)}
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
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UpdateCategory;