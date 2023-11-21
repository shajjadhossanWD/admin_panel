import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MonthlySellGraph = () => {
  const [data, setData] = useState([]);
  console.log(data, "Graph data");

  useEffect(() => {
    axios
      .get("https://kccb.kvillagebd.com/api/v1/booking/get/monthly-bookings")
      .then((data) => {
        if (data.status === 200) {
          console.log(data, "Graph initial data");
          setData(data.data);
        }
      });
  }, []);


  const payloadFormatter = (payload) => {
    console.log(payload, "heres the payload");
  };

  return (
    <div>
      <div style={{ height: 400, marginLeft: '-30px'}}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(label) => label} />
            <Area
              type="monotone"
              dataKey="bookings"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <h3 className="text-center mt-4 text-white">Bookings Monthly Performance</h3>
    </div>
  );
};

export default MonthlySellGraph;
