import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";

const RecentOrders = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [recentNum, setRecentNum] = useState(10);


  const refetchOrder = async () => {
    await axios.get("https://kccb.kvillagebd.com/api/v1/booking/get/all").then((res) => {
      if (res.status === 200) {
        setAllOrder(res.data.slice(0, recentNum));
      } else {
        return <p>There's an error found.</p>;
      }
    });
  };

  useEffect(() => {
    refetchOrder();
  }, [allOrder.length === 0]);



  return (
    <div className="productBody">
      <h5 className="text-white-50 text-start pt-3 pb-3">Recent Bookings</h5>
      <div className="productCard py-2">
        <div className="tableNormal ">
          <Table className="text-white-50 productDataTable ">
            <thead>
              <tr>
              <th>User Id</th>
              <th>Booking Time</th>
              <th>Date</th>
              <th>Room</th>
              </tr>
            </thead>
            <tbody>
              {allOrder?.map((order) => (<tr key={order._id}>

               <td>{order.userId}</td>
               <td>{order.bookingTime[0]}</td>
               <td>{order.bookingDate}</td>
               <td>{order.roomSelect}</td>
               </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
