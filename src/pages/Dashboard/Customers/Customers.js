import React, { useEffect, useState } from "react";
import { Button, Typography, Modal, Box } from "@mui/material";
import Table from "react-bootstrap/Table";
import Search from "../../../Components/Widgets/Search";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../../Components/Pagination/Pagination";
import { AllCustomers } from "./customerData";
import axios from "axios";
import swal from "sweetalert";
import { FaSearch } from "react-icons/fa";

const FilterableTable = require("react-filterable-table");

const Customers = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();

  const fetchAllCustomers = () => {
    fetch(`https://backend.dslcommerce.com/api/users/all`)
      .then((res) => res.json())
      .then((data) => {
        setAllCustomers(data);
        setAllCustomer(data);
      });
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  //****************************** Pagination Start ******************************/
  const { customerPerPage } = useParams();
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceCustomers, setSliceCustomers] = useState([]);
  // console.log(sliceProducts)

  useEffect(() => {
    const lastPage = Math.ceil(allCustomers?.length / show);
    setLastPage(lastPage);
  }, [allCustomers, show]);

  useEffect(() => {
    if (customerPerPage) {
      const page = parseInt(customerPerPage);
      const getSlicingCategory = allCustomers.slice(
        (page - 1) * show,
        page * show
      );
      console.log("getSlicingCategory");
      console.log(getSlicingCategory);
      setSliceCustomers([...getSlicingCategory]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = allCustomers.slice(0, show);
      setSliceCustomers([...getSlicingProduct]);
    }
  }, [allCustomers, show, customerPerPage]);

  const pageHandle = (jump) => {
    navigate(`/admin/customers/${jump}`);
    setPage(parseInt(jump));
  };
  //****************************** Pagination End ******************************/

  //****************************** Delete ******************************/
  const handleDelete = (walletAddress) => {
    swal({
      text: "Are you sure, you want to delete this Customer?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          // .delete(`https://backend.dslcommerce.com/api/users/${walletAddress}`)
          .delete(
            `https://backend.dslcommerce.com/api/users/data/${walletAddress}`
          )
          .then((res) => {
            if (res.status === 200) {
              // alert(res.data.message);
              swal({
                // title: "Success",
                text: res.data.message,
                icon: "success",
                button: "OK!",
                className: "modal_class_success",
              });
              setAllCustomers(
                allCustomers.filter((c) => c.walletAddress !== walletAddress)
              );
            }
          })
          .catch((error) => {
            // alert(error.response.data.message);
            swal({
              title: "Attention",
              text: error.response.data.message,
              icon: "warning",
              button: "OK!",
              className: "modal_class_success",
            });
          });
      }
    });
  };

  const handleSearch = (e) => {
    const kyeWord = e.target.value.toLocaleLowerCase();
    // console.log(kyeWord);
    let searched;
    if (kyeWord !== "") {
      searched = allCustomer.filter(
        (customer) =>
          customer.email?.toLocaleLowerCase().includes(kyeWord) === true
      );
    } else {
      searched = allCustomer;
    }
    setAllCustomers(searched);
  };

  return (
    <>
      <h5 className="text-white text-start text-uppercase pb-1">CUSTOMERS</h5>

      <Search handleSearch={handleSearch} />

      <div className="productCard py-2">
        <div className="tableNormal ">
          <Table responsive="sm" className="text-white productDataTable ">
            <thead>
              <tr>
                {/* <th className="text-left d-md-block d-none">USER ID</th> */}
                <th className="text-left productHidden">USER ID</th>
                <th className="text-left productHidden">WALLET ADDRESS</th>
                <th className="text-left ">EMAIL</th>
                <th className="text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {sliceCustomers?.map((sliceCustomer) => (
                <tr className="tableRow" key={sliceCustomer?.USER_ID}>
                  <td className="text-left text-capitalize productHidden">
                    {sliceCustomer?.myReferralCode ? (
                      <div>{sliceCustomer?.myReferralCode}</div>
                    ) : (
                      <div>User id</div>
                    )}
                  </td>
                  <td className="text-left productHidden">
                    {sliceCustomer?.walletAddress ? (
                      <div>{sliceCustomer?.walletAddress}</div>
                    ) : (
                      <div>WalletAddress</div>
                    )}
                  </td>
                  <td className="text-left  ">
                    {sliceCustomer?.email ? (
                      <div>{sliceCustomer?.email}</div>
                    ) : (
                      <div>Email Address</div>
                    )}
                  </td>
                  <td className="action col-sm-12 d-flex">
                    <div className="actionDiv text-left">
                      <Link
                        to={`/admin/customers-details/${sliceCustomer.walletAddress}`}
                        className="viewBtn"
                        // onClick={() => navigate("/admin/customers-update")}
                      >
                        <i className="fas fa-eye text-dark"></i>
                      </Link>

                      <button
                        className="deleteBtn text-white"
                        onClick={() =>
                          handleDelete(sliceCustomer?.walletAddress)
                        }
                        style={{ height: "30px" }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/*********************************** Pagination  Start***********************************/}
      <div className="">
        {sliceCustomers?.length ? (
          <Pagination
            lastPage={lastPage}
            page={getPage}
            pageHandle={pageHandle}
          />
        ) : (
          <></>
        )}
      </div>

      {/*********************************** Pagination  End *************************************/}
    </>
  );
};

export default Customers;
