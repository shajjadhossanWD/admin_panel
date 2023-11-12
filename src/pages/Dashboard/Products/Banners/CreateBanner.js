import React from 'react';
import { useNavigate } from "react-router-dom";



const CreateBanner = () => {
    const navigate = useNavigate();





    const onSubmitForm = async (e) => {
        e.preventDefault();
    }
    const cancel = () => {
        navigate("/admin/banners");
    };


    return (
        <div>
            <h4 className="text-white text-uppercase text-start py-2 ">
                {" "}
                create banner{" "}
            </h4>

            <div>
                <form id="contactForm" className="form" onSubmit={onSubmitForm}>
                    <div className="row">


                        <div className="col-lg-12 col-md-12">
                            <div className="form-group text-white">
                                <p className="mb-1 text-white">
                                    {/* {imageLoader ? "Uploading Images.." : "Product Image"} */}
                                </p>
                                <input
                                    // onChange={(e) => changePhoto(e)}
                                    type="file"
                                    name="img"
                                    accept=".png,.jpeg,.jpg"
                                    multiple
                                    className="form-control bg-transparent text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                            <div className="form-group ">
                                <p className="mb-1 text-white ">Date</p>
                                <input
                                    type="text"
                                    name="date"
                                    className="form-control bg-transparent text-white "
                                    required
                                    placeholder="Date"
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






                        <div className="d-flex justify-content-evenly justify-content-lg-center align-items-center gap-3 mt-3 ">
                            <div className="send-btn">
                                <button
                                    type="submit"
                                    className="default-btn w-100 text-uppercase"
                                    style={{ cursor: "pointer", width: "100%" }}
                                >
                                    Save
                                    <span></span>
                                </button>
                            </div>

                            <div className="send-btn">
                                <button
                                    type="submit"
                                    onClick={cancel}
                                    className="default-btn w-100 text-uppercase"
                                    style={{ cursor: "pointer", background: "red" }}
                                >
                                    Cancel
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBanner;