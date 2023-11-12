import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "../../../Components/Pagination/Pagination";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Tooltip } from "@mui/material";

const Subscribers = () => {
  const { emailPerPage } = useParams();

  const [open, setOpen] = useState(false);
  const [inputMessage, setinputMessage] = useState("");
  const [allEmail, setALlEmail] = useState([]);
  const [refetch, setRefetch] = useState(false);

  //****************************** Pagination Start ******************************/
  const navigate = useNavigate();
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceEmails, setSliceEmails] = useState([]);
  // console.log(sliceProducts)

  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleClickOpen = (email) => {
    setEmail(email);
    console.log(email);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const lastPage = Math.ceil(allEmail?.length / show);
    setLastPage(lastPage);
  }, [allEmail, show]);

  useEffect(() => {
    if (emailPerPage) {
      const page = parseInt(emailPerPage);
      const getSlicingCategory = allEmail.slice((page - 1) * show, page * show);
      setSliceEmails([...getSlicingCategory]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = allEmail.slice(0, show);
      setSliceEmails([...getSlicingProduct]);
    }
  }, [allEmail, show, emailPerPage]);

  const pageHandle = (jump) => {
    navigate(`/admin/all-subscribers/${jump}`);
    setPage(parseInt(jump));
  };

  //****************************** Pagination End ******************************/

  useEffect(() => {
    axios.get("https://backend.dslcommerce.com/api/subscribe/").then((res) => {
      // console.log(res.data.result)
      setALlEmail(res.data.result);
    });
  }, [refetch]);

  //****************************** Delete ******************************/
  const deleteWarning = (email) => {
    swal({
      title: "Are you sure to delete ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDelete(email?.email);
      } else {
        swal("Cancelled!");
      }
    });
  };

  const handleDelete = async (email) => {
    // console.log(email);
    try {
      const response = await axios.delete(
        "https://backend.dslcommerce.com/api/subscribe/" + email
      );
      if (response.status === 200) {
        swal({
          // title: "Success",
          text: response.data.message,
          icon: "success",
          button: "OK!",
          className: "modal_class_success",
        });
        setALlEmail(allEmail.filter((email) => email.email !== email));
        setRefetch(true);
      }
    } catch (error) {
      swal({
        // title: "Success",
        text: error.data.message,
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
      // console.log("error");
    }
  };

  const handleSendMessage = async () => {
    const messageData = {
      email: email,
      message: inputMessage,
    };

    await axios
      .post("https://backend.dslcommerce.com/api/support", messageData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("adminDslCommerce")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          swal({
            text: "Successfully send message",
            // text: res.data.message,
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
    <div className="productBody">
      <h5 className="text-white text-start mb-3 text-uppercase">Subscribers</h5>
      {/* <div className="d-flex flex-column flex-lg-row mb-3 justify-content-lg-between align-items-center">

      </div> */}

      <div className="productCard py-2">
        <div className="tableNormal ">
          <Table className="text-white productDataTable ">
            <thead>
              <tr>
                <th className="text-left">Index</th>
                <th className="text-left">Email</th>
                <th className="text-left ">Send mail</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {sliceEmails?.map((email, index) => (
                <tr className="tableRow" key={index}>
                  <td className="text-left text-capitalize">{index + 1}</td>
                  <td
                    className="text-left "
                    style={{ textTransform: "lowercase" }}
                  >
                    {email.email}
                  </td>

                  <td className="text-left text-capitalize ">
                    <Tooltip title="Send Email" placement="top">
                      <button
                        onClick={() => handleClickOpen(email.email)}
                        className="btn btn-sm text-white btn-primary"
                      >
                        Send Email
                      </button>
                    </Tooltip>

                  </td>
                  <td className="action">

                    <div className="actionDiv text-left">
                      <Tooltip title="Delete Subscriber" placement="top">

                        <button
                          onClick={() => deleteWarning(email)}
                          className="deleteBtn text-white"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}

              <div>
                <Dialog
                  open={openModal}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle
                    id="alert-dialog-title"
                    style={{ background: "#1a1c33", color: "#fff" }}
                  >
                    {"Send Message"}
                  </DialogTitle>
                  <DialogContent
                    style={{ background: "#1a1c33", color: "#fff" }}
                  >
                    <DialogContentText id="alert-dialog-description">
                      <div className=" text-white">
                        <label htmlFor="">To: </label>
                        <input
                          type="email"
                          onChange={(e) =>
                            setEmail(e.target.value.toLocaleLowerCase())
                          }
                          value={email}
                          className="p-1 rounded border-1 bolder w-100"
                          style={{
                            background: "#1a1c33",
                            color: "#fff",
                            border: "2px solid #fff",
                          }}
                        />

                        <div className="mt-2">
                          <label htmlFor="">Message: </label>
                          <textarea
                            onChange={(e) => setinputMessage(e.target.value)}
                            className=""
                            name=""
                            id=""
                            cols="30"
                            rows="6"
                            placeholder="Write Message"
                          ></textarea>
                        </div>
                        <button
                          onClick={handleSendMessage}
                          className="btn btn-sm px-3 text-white btn-primary"
                        >
                          Send
                        </button>
                      </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions
                    style={{ background: "#1a1c33", color: "#fff" }}
                  >
                    <Button className="text-danger" onClick={handleClose}>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </tbody>
          </Table>
        </div>
      </div>

      {/*************************** Pagination ************************************/}
      <div className="">
        {sliceEmails?.length ? (
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

export default Subscribers;
