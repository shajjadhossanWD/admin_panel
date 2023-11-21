import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const ViewBookingsData = () => {
  const { id } = useParams();

  const [bookingDetail, setBookingDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://kccb.kvillagebd.com/api/v1/booking/get/${id}`)
      .then((res) => {
        setBookingDetail(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  
  return (
    <div className="container ">
      <h3 className="text-white py-3">
        {" "}
        <b>User Name :</b>  {bookingDetail?.name}
      </h3>
      <div>
        <p className="text-white"><b>User Email :</b> {bookingDetail?.email? bookingDetail?.email : 'Email address not provided'} </p>
        <p className="text-white">
        <b>User Designation :</b> {bookingDetail?.designation}
        </p>
        <p className="text-white"><b>Booking Date :</b> {bookingDetail?.bookingDate}</p>
        <p className="text-white">
          <b>Booking Time :</b>
          <ul>
            {bookingDetail?.showingTime?.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </p>        <p className="text-white"><b>Selected Room :</b> {bookingDetail?.roomSelect}</p>
        <p className="text-white">
        <b>Guest :</b>  {bookingDetail?.guest}
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

export default ViewBookingsData;
