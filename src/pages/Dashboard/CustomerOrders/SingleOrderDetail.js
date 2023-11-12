import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const SingleOrderDetail = () => {
  const { orderId } = useParams();

  const [orderDetail, setOrderDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://backend.dslcommerce.com/api/order/data/get/${orderId}`)
      .then((res) => {
        // console.log('eeeeeeeeeeefd', res.data[0]);
        setOrderDetail(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container ">
      <h3 className="text-white py-3">
        {" "}
        Order Detail For : {orderDetail?.name}
      </h3>
      <div>
        <p className="text-white">Order Id : {orderDetail?.orderId} </p>
        <p className="text-white">
          Quantity : {orderDetail?.orderItems?.length}
        </p>
        <p className="text-white">
          {" "}
          Item Name :
          <ol className="text-white">
            {orderDetail?.orderItems?.map((p) => (
              <li>
                {p?.productName} (Quantity: {p?.count})
              </li>
            ))}
          </ol>
        </p>

        <p className="text-white">Total Amount : {orderDetail?.amount}</p>
        <p className="text-white">User Email : {orderDetail?.email}</p>
        {/* <p className='text-white'>Contact Number : {orderDetail?.phone}</p> */}
        <p className="text-white">
          Payment Method : {orderDetail?.paymentMethod}
        </p>
        <p className="text-white">
          Order Time : {orderDetail?.date?.slice(0, 10)}{" "}
        </p>
        <p className="text-white">
          Payment Status :{orderDetail?.pendingStatus === true && <>Pending</>}
          {orderDetail?.processingStatus === true && <>Processing</>}
          {orderDetail?.deliveredStatus === true && <>Delivered</>}
        </p>
        <p className="text-white">
          Shipping Address : {orderDetail?.address} ,{orderDetail?.postCode} ,
          {orderDetail?.town} ,{orderDetail?.country}
        </p>
        <div className="text-white pb-2 mt-5">
          <button onClick={() => navigate(-1)} className="btn btn-success ">
            <BiArrowBack className="fs-5" /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderDetail;
