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
  const data = [
    { "score": 30.27, "month": "January " },
    { "score": 20.27, "month": "February " },
    { "score": 20.27, "month": "March " },
    { "score": 40.27, "month": "April " },
    { "score": 20.27, "month": "May " },
    { "score": 45.27, "month": "June " },
    { "score": 40.27, "month": "July " },
    { "score": 30.27, "month": "August " },
    { "score": 50.27, "month": "Semtember " },
    { "score": 40.27, "month": "October " },
    { "score": 20.27, "month": "November " },
    { "score": 30.27, "month": "December " },
  ]

  // const [data, setData] = useState([]);
  // console.log(data, "Graph data");

  // useEffect(() => {
  //   axios
  //     .get("https://backend.dslcommerce.com/api/bill-record/week-total")
  //     .then((data) => {
  //       if (data.status === 200) {
  //         console.log(data, "Graph initial data");
  //         const WeekResult = data.data.WeekResult.map((eachResult) => {
  //           console.log(eachResult, "Each result in bloody idiot");
  //           return {
  //             ...eachResult,
  //             week: "Week" + " " + eachResult.week,
  //             // totalAmount: "$" + eachResult.totalAmount,
  //           };
  //         });

  //         setData(WeekResult);
  //       }
  //     });
  // }, []);


  const payloadFormatter = (payload) => {
    // remove series we want to be hidden

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
            <Tooltip formatter={(label) => "$" + label} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <h3 className="text-center mt-4 text-white">Financial Health Indicator</h3>
    </div>
  );
};

export default MonthlySellGraph;
