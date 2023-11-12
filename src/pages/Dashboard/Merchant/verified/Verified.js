import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { CSVLink } from "react-csv";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "../../../../Components/Pagination/Pagination";

const Verified = () => {
  const { verifiedPerPage } = useParams();

  const [verifiedUser, setVerifiedUser] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(verifiedUser, "users data");

  const fetchVerifiedUsers = () => {
    fetch("https://backend.dslcommerce.com/api/user-panel/verified")
      .then((res) => res.json())
      .then((data) => setVerifiedUser(data?.result));
  };

  useEffect(() => {
    fetchVerifiedUsers();
  }, []);

  useEffect(() => {
    fetch("https://backend.dslcommerce.com/api/user-panel/verified")
      .then((res) => res.json())
      .then((data) => setVerifiedUser(data?.result));
  }, []);

  // console.log("verifiedUser", verifiedUser);

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
              fetchVerifiedUsers();
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
  const [sliceVerifieds, setSliceVerifieds] = useState([]);
  // console.log(sliceProducts)
  const [verifiedCsv, setVerifiedCsv] = useState([]);


  useEffect(() => {
    const lastPage = Math.ceil(verifiedUser?.length / show);
    setLastPage(lastPage);
  }, [verifiedUser, show]);




  useEffect(() => {
    if (verifiedPerPage) {
      const page = parseInt(verifiedPerPage);
      const getSlicingBanner = verifiedUser.slice(
        (page - 1) * show,
        page * show
      );
      setSliceVerifieds([...getSlicingBanner]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = verifiedUser.slice(0, show);
      setSliceVerifieds([...getSlicingProduct]);
    }
  }, [verifiedUser, show, verifiedPerPage]);

  const pageHandle = (jump) => {
    navigate(`/admin/verified/${jump}`);
    setPage(parseInt(jump));
  };


  //****************************** Pagination Start ******************************/
  console.log(verifiedUser);
  useEffect(() => {
    if (sliceVerifieds) {
      const users = sliceVerifieds?.map(
        ({
          emailVerified,
          mobileVerified,
          isPending,
          isAddress,
          isPhotoId,
          updatedAt,
          __v,
          ip,
          // _id,
          ...keepFields
        }) => keepFields
      );

      setVerifiedCsv(users);
    }
  }, [sliceVerifieds]);


  console.log(verifiedCsv, 'this is verifide users data');


  return (
    <div className="">
      <h5 className="text-white mb-3 text-start text-uppercase">VERIFIED</h5>
      <CSVLink data={verifiedCsv} className="mt-4">
        <span className="my-3 text-white bolder bg-primary p-2 my-2 rounded">
          GENNERATE CSV
        </span>
      </CSVLink>
      <TableContainer component={Paper} className="mt-4">
        <Table
          className="text-white"
          sx={{ minWidth: 800, maxWidth: "100%", bgcolor: "#272D47" }}
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
              <th className="text-start">Name</th>
              <th className="text-start ">Email</th>
              <th className="text-start">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {sliceVerifieds?.map((d, index) => (
              <tr style={{ borderBottom: "1px solid white" }} className=" ">
                <td style={{ padding: "15px 0px 15px 35px" }} className="">
                  {index + 1} .
                </td>
                <td
                  className="text-start"
                  style={{ textTransform: "uppercase" }}
                >
                  {d.name}
                </td>
                <td className="text-start ">{d?.email}</td>
                {/* <td className='text-start adminHidden'>{d.kycPending === true ? 'PENDING' : ''}</td> */}
                <td className="text-start ">
                  <span
                    onClick={() =>
                      navigate(
                        {
                          pathname: `/admin/userDetails/${d.walletAddress}`,
                        },
                        { state: { from: location.pathname } }
                      )
                    }
                  >
                    <span
                      style={{ cursor: "pointer" }}
                      className="bg-primary p-2 me-3 rounded">
                      <AiFillEye className="fs-5 text-white rounded" />
                    </span>
                  </span>

                  <span
                    onClick={() => deleteUser(d?._id)}
                    className="bg-danger p-2 rounded"
                    style={{ cursor: "pointer" }}
                  >
                    <AiFillDelete className="fs-5  text-white rounded" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      {sliceVerifieds?.length ? (
        <Pagination
          lastPage={lastPage}
          page={getPage}
          pageHandle={pageHandle}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Verified;
