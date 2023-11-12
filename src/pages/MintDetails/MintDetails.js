import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MintDetails.css";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";

const MintDetails = () => {
  const { id, address } = useParams();
  // console.log(id, address);

  const navigate = useNavigate();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // alert("Copied!");
    swal({
      text: "Copied!",
      icon: "success",
      button: "OK!",
      className: "modal_class_success",
    });
  };

  var newDate = new Date();
  let dd = String(newDate.getDate()).padStart(2, "0");
  let mm = String(newDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = newDate.getFullYear();
  let hh = newDate.getHours();
  let min = newDate.getMinutes();
  let ss = newDate.getSeconds();
  newDate = dd + "/" + mm + "/" + yyyy + "  " + hh + ":" + min + ":" + ss;

  const copyAllToClipboard = (id, address, time) => {
    // console.log(id + address + time)
    navigator.clipboard.writeText(id + address + time);
    // alert("Copied!");

    swal({
      text: "Copied!",
      icon: "success",
      button: "OK!",
      className: "modal_class_success",
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mintDetails">
      <div className="container pb-3 pt-2 text-dark">
        <h3 className="mb-3 ms-4">Information of Minted NFT</h3>
        <div className=" px-4">
          <div className="mb-2">
            <label htmlFor="referralID">Contract Address</label>
            <div className="d-flex">
              <input
                type="text"
                id="referralID"
                value={address}
                name="referralID"
                className="form-control bg-transparent text-dark"
                disabled
              />
              <button
                type="button"
                onClick={() => copyToClipboard(address)}
                className="border"
              >
                <i className="fa-regular fa-copy"></i>
              </button>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="referralID">Token ID</label>
            <div className="d-flex">
              <input
                type="text"
                id="referralID"
                name="referralID"
                value={id}
                className="form-control bg-transparent text-dark"
                disabled
              />
              <button
                type="button"
                onClick={() => copyToClipboard(id)}
                className="border"
              >
                <i className="fa-regular fa-copy"></i>
              </button>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="referralID">Timestamp</label>
            <div className="d-flex">
              <input
                type="text"
                id="referralID"
                name="referralID"
                value={newDate}
                className="form-control bg-transparent text-dark"
                disabled
              />
            </div>
          </div>
          <div className="d-flex justify-content-evenly align-items-center my-3">
            <Button variant="danger" onClick={() => navigate("/profile")}>
              CANCEL
            </Button>
            <Button
              variant="success"
              onClick={() =>
                copyToClipboard(
                  "Contract Address:" +
                    " " +
                    address +
                    " " +
                    " " +
                    " Token ID:" +
                    " " +
                    id
                )
              }
            >
              COPY ALL<i className="fa-regular fa-copy text-light ps-1"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintDetails;
