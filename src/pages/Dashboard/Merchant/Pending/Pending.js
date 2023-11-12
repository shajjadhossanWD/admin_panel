import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PortraitIcon from "@mui/icons-material/Portrait";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CSVLink } from "react-csv";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
import Pagination from "../../../../Components/Pagination/Pagination";

const Pending = () => {

  const { pendingPerPage } = useParams();
  const navigate = useNavigate();

  const [pendingUsers, setPendingUserUsers] = useState([]);
  const [allPendingUsers, setAllPendingUsers] = useState([]);
  console.log(allPendingUsers);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  // const arrData = selectedUserIds;

  const fetchPendingUsers = () => {
    fetch("https://backend.dslcommerce.com/api/user-panel/pending")
      .then((res) => res.json())
      .then((data) => {
        setPendingUserUsers(data?.result);
        setAllPendingUsers(data?.result);
      });
  };

  useEffect(() => {
    fetchPendingUsers();
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

  //******************************** Delete Multiple User ********************************
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
        fetchPendingUsers();
      })
      .catch((err) => toast.error("Something went wrong!"));
  };

  //******************************** Handle Search ********************************
  const handleSearch = (e) => {
    const kyeWord = e.target.value.toLocaleLowerCase();
    console.log(kyeWord);
    let searched;
    if (kyeWord !== "") {
      searched = allPendingUsers.filter(
        (user) => user.name.toLocaleLowerCase().includes(kyeWord) === true
      );
    } else {
      searched = allPendingUsers;
    }
    setPendingUserUsers(searched);
  };

  //******************************** Verify USer ********************************
  const verifyUser = (id) => {
    // console.log("INside the pending user", id);
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
              fetchPendingUsers();
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

  //******************************** delete user ********************************

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
              fetchPendingUsers();
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


  //****************************** Pagination Start ******************************/
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceUsers, setSliceUsers] = useState([]);
  // console.log()


  useEffect(() => {
    const lastPage = Math.ceil(pendingUsers?.length / show);
    setLastPage(lastPage);
  }, [pendingUsers, show]);


  useEffect(() => {
    if (pendingPerPage) {
      const page = parseInt(pendingPerPage);
      const getSlicingBanner = pendingUsers.slice(
        (page - 1) * show,
        page * show
      );
      setSliceUsers([...getSlicingBanner]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = pendingUsers.slice(0, show);
      setSliceUsers([...getSlicingProduct]);
    }
  }, [pendingUsers, show, pendingPerPage]);

  const pageHandle = (jump) => {
    navigate(`/admin/non-verified/${jump}`);
    setPage(parseInt(jump));
  };


  //****************************** Pagination Start ******************************/



  //****************************** CSV DOWNLODE Start ******************************/

  const [pendingCsv, setPendingCsv] = useState([]);

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

      setPendingCsv(users);
    }
  }, [sliceUsers]);


  //****************************** CSV DOWNLODE END ******************************/

  return (
    <div className="">
      <h5 className="text-white mb-3 text-start text-uppercase">Pending</h5>
      {/* <p className='text-start fs-2 text-white my-0 mb-3 py-0'>Pending</p> */}

      <div className="text-white row d-flex g-2 mb-2 justify-content-between align-items-center py-2">
        <div className="col-12 col-md-6">
          <CSVLink data={pendingCsv} className="mt-4">
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

        <div className="col-12 col-md-6 text-lg-end">
          <label className="pe-1" for="number">
            Search:{" "}
          </label>
          <input
            onChange={(e) => handleSearch(e)}
            className="border-0 p-1 rounded w-75 w-md-50"
            name="search"
            placeholder="search user"
          />
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table
          className="text-white"
          sx={{ minWidth: "850px", maxWidth: "100%", bgcolor: "#272D47" }}
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
              <th className="text-start ">Email</th>
              <th className="text-start">Status</th>
              <th className="text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            {sliceUsers?.map((d, index) => (
              <tr style={{ borderBottom: "1px solid white" }} className=" ">
                <td style={{ padding: "17px 0px 12px 35px" }} className="">
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
                      <PersonIcon className="text-danger" />
                    ) : (
                      <PersonIcon className="text-success" />
                    )}
                  </span>
                  <span>
                    {d?.emailVerified === false ? (
                      <EmailIcon className="text-danger" />
                    ) : (
                      <EmailIcon className="text-success" />
                    )}
                  </span>
                  <span>
                    {d?.mobileVerified === false ? (
                      <PhoneAndroidIcon className="text-danger" />
                    ) : (
                      <PhoneAndroidIcon className="text-success" />
                    )}
                  </span>
                  <span>
                    <PortraitIcon className="text-danger" />
                  </span>
                  <span>
                    <LocationOnIcon className="text-danger" />
                  </span>
                </td>
                <td
                  className="text-start"
                  style={{ textTransform: "uppercase" }}
                >
                  {d.name}
                </td>
                <td className="text-start ">{d.email}</td>
                <td className="text-start ">Pending</td>
                <td className="text-start ">
                  <Tooltip title="View user details" placement="top">
                    <Link to={`/admin/userDetails/${d.walletAddress}`}>
                      <span
                        style={{ cursor: "pointer" }}
                        className="bg-primary p-2 me-3 rounded"
                      >
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

export default Pending;
