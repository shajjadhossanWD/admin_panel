import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import swal from "sweetalert";
import RecentOrderTable from "./RecentOrderTable";
// import { allOrders } from "../CustomerOrders/orderData";

const RecentOrders = () => {
  const [allOrder, setAllOrder] = useState([]);
  // const [allOrder, setAllOrder] = useState(allOrders);
  const [recentNum, setRecentNum] = useState(10);

  // console.log(allOrder)

  const refetchOrder = async () => {
    await axios.get("https://backend.dslcommerce.com/api/order").then((res) => {
      if (res.status === 200) {
        setAllOrder(res.data.reverse().slice(0, recentNum));
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
      <h5 className="text-white-50 text-start pt-5 pb-3">Recent Orders</h5>
      <div className="productCard py-2">
        <div className="tableNormal ">
          <Table className="text-white-50 productDataTable ">
            <thead>
              <tr>
                <th className="">Order Time</th>
                <th className="">Product Name</th>
                <th className="">Customer Name</th>
                {/* <th className=" ">Payment Method</th> */}
                <th className=" ">Order Amount</th>
                <th className="">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrder?.map((order) => (
                <RecentOrderTable
                  key={order._id}
                  order={order}
                  refetchOrder={refetchOrder}
                ></RecentOrderTable>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
