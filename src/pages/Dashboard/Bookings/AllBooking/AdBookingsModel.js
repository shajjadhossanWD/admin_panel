import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { RiAdminFill } from "react-icons/ri";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../../Admins/Admins.css";
import swal from "sweetalert";

const AdBookingsModel = (props) => {
  const {
    setModalShowNewAdmin,
    refetch,
    setRefetch,
    categoryDate,
    exactTime,
    room
  } = props;
  
  const [email, setEmail] = useState("");
  const [guest, setGuest] = useState(0);


  const subNewAdmin = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;

    const adminData = {
      "name" : name,
      "email": email,
      "guest": guest,
      "bookingDate": categoryDate,
      "bookingTime": [exactTime],
      "roomSelect": room,
      "bookingCategory": "admin",
      "userId":"admin",
      "fcmToken": "admin",
      "designation": "admin"
    }


    console.log(adminData)
   
      await axios
        .post("https://kccb.kvillagebd.com/api/v1/booking/admin", adminData)
        .then((res) => {
          if (res.status === 200) {
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
          <RiAdminFill className="fs-4"></RiAdminFill> Add Booking
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

                  <p className="mb-1">Total Guest</p>
                  <input
                    className="form-control"
                    placeholder="Enter email"
                    type="number"
                    name="guest"
                    required
                    value={guest}
                    onChange={(e) =>
                      setGuest(e.target.value.toLocaleLowerCase())
                    }
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

export default AdBookingsModel;
