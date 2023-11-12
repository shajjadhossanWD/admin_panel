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
  // const data = [
  //   { "totalAmount": 60.27, "week": "Week " +  52 },
  //   { "totalAmount": 30.27, "week": "Week " +  1 },
  //   { "totalAmount": 20.27, "week": "Week " +  2 },
  //   { "totalAmount": 20.27, "week": "Week " +  3 },
  //   { "totalAmount": 40.27, "week": "Week " +  4 },
  //   { "totalAmount": 20.27, "week": "Week " +  5 },
  //   { "totalAmount": 45.27, "week": "Week " +  6 },
  //   { "totalAmount": 40.27, "week": "Week " +  7 },
  //   { "totalAmount": 30.27, "week": "Week " +  8 },
  //   { "totalAmount": 50.27, "week": "Week " +  9 },
  //   { "totalAmount": 40.27, "week": "Week " +  10 },
  //   { "totalAmount": 20.27, "week": "Week " +  11},
  //   { "totalAmount": 30.27, "week": "Week " +  12 },
  //   { "totalAmount": 10.27, "week": "Week " +  13 },
  // ]

  const [data, setData] = useState([]);
  console.log(data, "Graph data");

  useEffect(() => {
    axios
      .get("https://backend.dslcommerce.com/api/bill-record/week-total")
      .then((data) => {
        if (data.status === 200) {
          console.log(data, "Graph initial data");
          const WeekResult = data.data.WeekResult.map((eachResult) => {
            console.log(eachResult, "Each result in bloody idiot");
            return {
              ...eachResult,
              week: "Week" + " " + eachResult.week,
              // totalAmount: "$" + eachResult.totalAmount,
            };
          });

          setData(WeekResult);
        }
      });
  }, []);
  const payloadFormatter = (payload) => {
    // remove series we want to be hidden

    console.log(payload, "heres the payload");
  };

  return (
    <div>
      <div style={{ height: 400 }}>
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
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip formatter={(label) => "$" + label} />
            <Area
              type="monotone"
              dataKey="totalAmount"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <h3 className="text-center mt-4 text-white">Weekly sell</h3>
    </div>
  );
};

export default MonthlySellGraph;
