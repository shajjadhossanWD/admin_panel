import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { RiAdminFill } from "react-icons/ri";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./Admins.css";
import swal from "sweetalert";

const AddAdminModel = (props) => {
  const {
    setModalShowNewAdmin,
    setIsLoadingAdmin,
    refetch,
    setRefetch,
    isLoadingAdmin,
    allAdmin,
    setAllAdmin,
  } = props;
  
  const [value, setValue] = useState();
  const [email, setEmail] = useState("");



  const subNewAdmin = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const phone = value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    

    const adminData = {
      "name" : name,
      "email": email,
      "phone": phone,
      "password": password
    }

    if (password !== confirmPassword) {
      return swal({
        title: "Attention",
        text: "Confirm Password not match!",
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    } else {
      await axios
        .post("https://kccb.kvillagebd.com/api/v1/admin/create", adminData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("kccbAdminToken")}`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            setModalShowNewAdmin(false);
            setRefetch(!refetch);
            event.target.reset();
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
  };



  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="mt-5"
    >
      <Modal.Header closeButton className="modelAddAdmin">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fs-5 text-light"
        >
          <RiAdminFill className="fs-4"></RiAdminFill> Add Admin
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="handleModalBody">
        <div>
          <div>
            <form onSubmit={subNewAdmin}>
              <div className="row addAdminDiv">
                <div className="col-lg-12">
          
                  <p className="mb-1">Full Name</p>
                  <input
                    className="form-control"
                    placeholder="Enter name"
                    type="text"
                    name="name"
                    required
                  />

             
                  <p className="mb-1">Email</p>
                  <input
                    className="form-control"
                    placeholder="Enter email"
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value.toLocaleLowerCase())
                    }
                  />

                  <p className="mb-1">Phone</p>
                  <PhoneInput
                    international
                    defaultCountry="BD"
                    countryCallingCodeEditable={true}
                    className="form-control handleModalBody"
                    type="text"
                    value={value}
                    onChange={setValue}
                    required
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                  />


                  <p className="mb-1">Password</p>
                  <input
                    className="form-control"
                    placeholder="Enter Password"
                    type="password"
                    name="password"
                    required
                  />


                  <p className="mb-1">Confirm Password</p>
                  <input
                    className="form-control"
                    placeholder="Confirm password"
                    type="password"
                    name="confirmPassword"
                    required
                  />
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
              </div>
            </form>
          </div>
          <div></div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddAdminModel;
