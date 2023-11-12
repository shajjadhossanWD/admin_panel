import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";

const CustomersUpdate = () => {
  const {id} = useParams();
  
  const [tableary, setTableary] = useState([
    {
      USER_ID: "7C96",
      WALLET_ADDRESS: "34jdhajhWIIWEFI86klj",
      EMAIL: "abc@gmail.com",
      PHONE: "01555543333",
    },
    // {
    //   USER_ID: "7c56",
    //   WALLET_ADDRESS: "H1EIAN@di343kniKHUIlai947",
    //   EMAIL: "abc.xyz@gmail.com",
    //   PHONE: "01235545423",
    // },
    // {
    //   USER_ID: "FCCB",
    //   WALLET_ADDRESS: "45YTEklhaUYEmoni097kumar",
    //   EMAIL: "abc@gmail.com",
    //   PHONE: "01555543333",
    // },
    // {
    //   USER_ID: "7C96",
    //   WALLET_ADDRESS: "34jdhajhWIIWEFI86klj",
    //   EMAIL: "abc@gmail.com",
    //   PHONE: "01555543333",
    // },
  ]);

  return (
    <>
      <h5 className="text-white text-start text-uppercase pb-1">CUSTOMER UPDATE</h5>

      <div className="productCard py-2">
        <div className="tableNormal ">
          <Table className="text-white productDataTable ">
            <thead>
              <tr>
                <th className="text-left d-md-block d-none">USER ID</th>
                <th className="text-left productHidden">WALLET ADDRESS</th>
                <th className="text-left ">EMAIL</th>
                <th className="text-left productHidden">PHONE</th>
              </tr>
            </thead>
            <tbody>
              {tableary?.map((tabledata) => (
                <tr className="tableRow" key={tabledata?.USER_ID}>
                  <td className="text-left text-capitalize">
                    {/* {tabledata.USER_ID} */}
                    <input
                        type="text"
                        name="userId"
                        className="form-control"
                        defaultValue={tabledata.USER_ID}
                      />
                  </td>
                  <td className="text-left productHidden">
                  <input
                        type="text"
                        name="walletAddress"
                        className="form-control"
                        defaultValue={tabledata.WALLET_ADDRESS}
                      />
                    
                  </td>
                  <td className="text-left text-capitalize ">
                  <input
                        type="email"
                        name="email"
                        className="form-control"
                        defaultValue={tabledata.EMAIL}
                      />
                    
                  </td>
                  <td className="text-left text-capitalize productHidden">
                  <input
                        type="text"
                        name="phone"
                        className="form-control"
                        defaultValue={tabledata.PHONE}
                      />
                    
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CustomersUpdate;
