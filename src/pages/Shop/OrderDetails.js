import React from "react";
import { Modal } from "react-bootstrap";

const OrderDetails = (props) => {
  const { myOrder } = props;
  console.log(myOrder, "My orders");

  // console.log(myOrder?.orderItems[0].count)

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 9999, paddingLeft: "0px" }}
    >
      <Modal.Header
        closeButton
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Modal.Header>
      <Modal.Body>
        {/***************************** Design ********************************************* */}

        <div className="mb-3" style={{ maxWidth: "200px" }}>
          <img
            src={myOrder?.orderItems?.slice(0, 1)[0]?.images.slice(0, 1)[0]}
            alt=""
          />
        </div>
        <p> Order Id: {myOrder?.orderId} </p>
        <p>
          {" "}
          Product Name: {
            myOrder?.orderItems?.slice(0, 1)?.pop()?.productName
          }{" "}
        </p>
        <p> Quantity: {myOrder?.orderItems?.slice(0, 1)?.pop()?.count} </p>
        <p>
          Status:{" "}
          {myOrder?.pendingStatus === true ? (
            <span className="">Pending</span>
          ) : (
            <span className="">Delivered</span>
          )}
        </p>
        <p> Name: {myOrder?.name}</p>
        <p>Email:{myOrder?.email} </p>
        <p>Date: {myOrder?.date?.slice(0, 10)}</p>
        <p>Post Code: {myOrder?.postCode}</p>
        <p>Address: {myOrder?.address}</p>
        {/* <p>Phone: {myOrder.phone}</p> */}
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetails;
