import axios from "axios";
import React from "react";
import swal from "sweetalert";

const RecentOrderTable = ({ order, refetchOrder }) => {
  const {
    _id,
    date,
    name,
    phone,
    paymentMethod,
    amount,
    pendingStatus,
    orderItems,
  } = order;

  const handleStatus = () => {
    axios
      .put(`https://backend.dslcommerce.com/api/order/pending/${_id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("tokendslcommerce")}`,
        },
      })
      .then((res) => {
        console.log(res.data.result.modifiedCount);
        if (res.data.result.modifiedCount > 0) {
          swal({
            // title: "Attention",
            text: "Item status changed to completed order.",
            icon: "success",
            button: "OK",
            dangerMode: true,
            className: "modal_class_success",
          });
          refetchOrder();
        } else {
          swal({
            // title: "Attention",
            text: "Operation failed.",
            icon: "error",
            button: "OK",
            dangerMode: true,
            className: "modal_class_success",
          });
        }
      });
  };

  return (
    <>
      <tr className="tableRow" key={order?._id}>
        <td className=" text-transparent">{date}</td>
        <td className=" text-capitalize">
          {order.orderItems[0].productName}
          {/* {orderItems.map((item) => (
            <p>{item.productName}</p>
          ))} */}
        </td>
        <td className=" ">{name}</td>
        {/* <td className=" text-capitalize ">{paymentMethod}</td> */}
        <td className=" text-capitalize ">{amount}</td>
        <td className="">
          {order?.pendingStatus === true && (
            <button
              className="btn btn-sm bg-primary cBtn text-white"
              style={{ borderRadius: "20px" }}
            >
              Pending
            </button>
          )}
          {order?.processingStatus === true && (
            <button
              className="btn btn-sm bg-success cBtn text-white"
              style={{ borderRadius: "20px" }}
            >
              Processing
            </button>
          )}
          {order?.deliveredStatus === true === true && (
            <button
              className="btn btn-sm bg-danger cBtn text-white"
              style={{ borderRadius: "20px" }}
            >
              Delivered
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default RecentOrderTable;
