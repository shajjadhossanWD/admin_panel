import React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";

import { CSVLink } from "react-csv";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PortraitIcon from "@mui/icons-material/Portrait";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TableFooter, Tooltip } from "@mui/material";
import { toast } from "react-hot-toast";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "../../../../Components/Pagination/Pagination";

const NonVerified = () => {
  const { nonVerifiedPerPage } = useParams();
  const navigate = useNavigate();

  const [nonVerifiedUser, setNonVerifiedUser] = useState([]);
  const [allNonVerify, setNonVerify] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const fetchNonVerifiedUsers = () => {
    fetch("https://backend.dslcommerce.com/api/user-panel/unverified")
      .then((res) => res.json())
      .then((data) => {
        setNonVerifiedUser(data?.result);
        setNonVerify(data?.result);
      });
  };

  useEffect(() => {
    fetchNonVerifiedUsers();
  }, []);

  const selectUser = (e, id) => {
    let ids = [];
    if (e.target.checked) {
      setSelectedUserIds([...selectedUserIds, id]);
    } else {
      ids = selectedUserIds.filter((userId) => userId !== id);
      setSelectedUserIds(ids);
    }
  };

  // DElete User *******************************************
  const deleteUser = (id) => {
    swal({
      text: "Are you sure, you want to delete this user?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://backend.dslcommerce.com/api/user-panel/delete/${id}`)
          .then((res) => {
            if (res.status === 200) {
              swal({
                text: res.data.message,
                icon: "success",
                button: "OK!",
                className: "modal_class_success",
              });
              fetchNonVerifiedUsers();
            }
          })
          .catch((error) => {
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

  const deleteMultipleMerchants = () => {
    const arrData = {
      arrData: selectedUserIds,
    };

    fetch("https://backend.dslcommerce.com/api/user-panel/multi-delete", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(arrData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        fetchNonVerifiedUsers();
      })
      .catch((err) => toast.error("Something went wrong!"));
  };

  const verifyUser = (id) => {
    swal({
      text: "Are you sure, you want to verify this user?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(
            `https://backend.dslcommerce.com/api/user-panel/admin/verify/${id}`
          )
          .then((res) => {
            if (res.status === 200) {
              swal({
                text: res.data.message,
                icon: "success",
                button: "OK!",
                className: "modal_class_success",
              });
              fetchNonVerifiedUsers();
            }
          })
          .catch((error) => {
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

  //******************************* Handle Search *******************************

  const handleSearch = (e) => {
    const kyeWord = e.target.value.toLocaleLowerCase();
    // console.log(kyeWord);
    let searched;
    if (kyeWord !== "") {
      searched = allNonVerify.filter(
        (user) => user.name.toLocaleLowerCase().includes(kyeWord) === true
      );
    } else {
      searched = allNonVerify;
    }
    setNonVerifiedUser(searched);
  };




  //****************************** Pagination Start ******************************/
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceUsers, setSliceUsers] = useState([]);
  // console.log()


  useEffect(() => {
    const lastPage = Math.ceil(nonVerifiedUser?.length / show);
    setLastPage(lastPage);
  }, [nonVerifiedUser, show]);


  useEffect(() => {
    if (nonVerifiedPerPage) {
      const page = parseInt(nonVerifiedPerPage);
      const getSlicingBanner = nonVerifiedUser.slice(
        (page - 1) * show,
        page * show
      );
      setSliceUsers([...getSlicingBanner]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = nonVerifiedUser.slice(0, show);
      setSliceUsers([...getSlicingProduct]);
    }
  }, [nonVerifiedUser, show, nonVerifiedPerPage]);

  const pageHandle = (jump) => {
    navigate(`/admin/non-verified/${jump}`);
    setPage(parseInt(jump));
  };


  //****************************** Pagination Start ******************************/
  const [nonVrifiedCsv, setNonVrifiedCsv] = useState([]);

  useEffect(() => {
    if (sliceUsers) {
      const users = sliceUsers?.map(
        ({
          emailVerified,
          mobileVerified,
          isPending,
          isAddress,
          isPhotoId,
          updatedAt,
          __v,
          ip,
          _id,
          ...keepFields
        }) => keepFields
      );

      setNonVrifiedCsv(users);
    }
  }, [sliceUsers]);



  return (
    <div
      className="nonverifide"
      style={{ backgroundColor: "#1a1c33", color: "#ffff" }}
    >
      {/* <p className='text-start text-white fs-2 m-0 p-0'>NON VERIFIED</p> */}
      <h5 className="text-white mb-3 text-start text-uppercase">
        NON VERIFIED
      </h5>
      <div className="text-white row align-items-center g-2">
        <div className="col-12 col-lg-6">
          <CSVLink data={nonVrifiedCsv} className="mt-4">
            <button className="my-3 text-white bolder btn-primary p-2 my-2 rounded border-0">
              GENNERATE CSV
            </button>
          </CSVLink>
          <button
            disabled={selectedUserIds.length === 0 ? true : false}
            style={{ cursor: "pointer" }}
            onClick={() => deleteMultipleMerchants()}
            className={`${selectedUserIds.length === 0 ? "btn-secondary" : "btn-danger"
              } text-white bolder p-2 px-2 ml-3 rounded border-0`}
          >
            DELETE
          </button>
        </div>

        <div className="col-12 col-lg-6 text-lg-end">
          <label className="pe-1" for="number">
            Search:{" "}
          </label>
          <input
            onChange={(e) => handleSearch(e)}
            className="border-0 p-1 rounded w-75 w-md-50 "
            name="search"
            placeholder="Search non verified users."
          />
        </div>
      </div>

      <TableContainer className="mt-3 " component={Paper}>
        <Table
          className=" text-white "
          sx={{ minWidth: 950, maxWidth: "100%", bgcolor: "#272D47" }}
          aria-label="simple table"
        >
          <thead>
            <tr style={{ borderBottom: "2px solid white" }}>
              <th
                style={{ padding: "15px 0px 15px 35px" }}
                className="text-start"
              >
                S.N.
              </th>
              <th className="text-start">Document</th>
              <th className="text-start">Full Name</th>
              <th className="text-start">Email</th>

              <th className="text-start">Status</th>
              <th className="text-start">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {sliceUsers?.map((d, index) => (
              <tr style={{ borderBottom: "1px solid white" }} className=" ">
                <td style={{ padding: "15px 0px 15px 35px" }} className="">
                  {" "}
                  <input
                    onClick={(e) => selectUser(e, d._id)}
                    type="checkbox"
                  />{" "}
                  {index + 1}
                </td>
                <td className="text-start">
                  <span>
                    {d?.isVerified ? (
                      <Tooltip title="Profile not updated" placement="top">
                        <PersonIcon
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Profile updated" placement="top">
                        <PersonIcon
                          className="text-success"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </span>
                  <span>
                    {d?.emailVerified === false ? (
                      <Tooltip title="Email not verified" placement="top">
                        <EmailIcon
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Email verified" placement="top">
                        <EmailIcon
                          className="text-success"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </span>
                  <span>
                    {d?.mobileVerified === false ? (
                      <Tooltip title="Phone not verified" placement="top">
                        <PhoneAndroidIcon
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Phone verified" placement="top">
                        <PhoneAndroidIcon
                          className="text-success"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </span>
                  <span>
                    {d.isPhotoId === true ? (
                      <Tooltip title="Photo Id submitted" placement="top">
                        <PortraitIcon
                          className="text-success"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Data not submitted" placement="top">
                        <PortraitIcon
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </span>
                  <span>
                    {d.isAddress === false ? (
                      <Tooltip title="Data not submitted" placement="top">
                        <LocationOnIcon
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Address proof submitted" placement="top">
                        <LocationOnIcon
                          className="text-success"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </span>
                </td>
                <td
                  className="text-start"
                  style={{ textTransform: "uppercase" }}
                >
                  {d?.name}
                </td>
                <td className="text-start">{d?.email}</td>
                <td className="text-start"> Non-verified {console.log(d)} </td>
                <td className="text-start">
                  <Tooltip title="View user details" placement="top">
                    <Link to={`/admin/userDetails/${d.walletAddress}`}>
                      <span className="bg-primary p-2 me-3 rounded">
                        <AiFillEye className="fs-5 text-white rounded" />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Verified the user." placement="top">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => verifyUser(d?._id)}
                      className="bg-success p-2 me-3 rounded"
                    >
                      <BiUserPlus className="fs-5 text-white rounded" />
                    </span>
                  </Tooltip>

                  <Tooltip title="Delete the user." placement="top">
                    <span
                      onClick={() => deleteUser(d?._id)}
                      className="bg-danger p-2 rounded"
                      style={{ cursor: "pointer" }}
                    >
                      <AiFillDelete className="fs-5  text-white rounded" />
                    </span>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>


        </Table>
      </TableContainer>

      <>
        {sliceUsers?.length ? (
          <Pagination
            lastPage={lastPage}
            page={getPage}
            pageHandle={pageHandle}
          />
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default NonVerified;
