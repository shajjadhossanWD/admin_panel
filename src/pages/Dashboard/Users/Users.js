import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Pagination from "../../../Components/Pagination/Pagination";
import "../Admins/Admins.css";

const Users = () => {
  const [allAdmin, setAllAdmin] = React.useState([]);
  const [refetch, setRefetch] = useState(false);
  const [show, setShow] = useState(10);
  const [sliceAdmins, setSliceAdmins] = useState([]);
  const [getPage, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    axios.get("https://kccb.kvillagebd.com/api/v1/user/alldata").then((res) => {
      setAllAdmin(res.data.result);
    });
  }, [refetch]);


  const handleAdminDelete = (id) => {
    swal({
      text: "Are you sure, you want to delete this admin?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://kccb.kvillagebd.com/api/v1/user/delete/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("kccbAdminToken")}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              swal({
                text: res.data.message,
                icon: "success",
                button: "OK!",
                className: "modal_class_success",
              });
              setAllAdmin(allAdmin.filter((admin) => admin._id !== id));
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


  // Pagination

  useEffect(() => {
    const lastPage = Math.ceil(allAdmin?.length / show);
    setLastPage(lastPage);
  }, [allAdmin, show]);

  const pageHandle = (jump) => {
    setPage(parseInt(jump));
  };

  useEffect(() => {
    if (getPage) {
      const page = parseInt(getPage);
      const getSlicingCategory = allAdmin?.slice(
        (page - 1) * show,
        page * show
      );
      setSliceAdmins([...getSlicingCategory]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = allAdmin?.slice(0, show);
      setSliceAdmins([...getSlicingProduct]);
    }
  }, [allAdmin, show, getPage]);

  

  return (
    <div className="adminBody">
      <h5 className="text-white text-start">USERS</h5>
      <div className="adminCard">
        
        <div className="tableNormal ">
          <Table className="text-white adminDataTable ">
            <thead>
              <tr>
                <th className="text-center">Image</th>
                <th className="text-start">Name</th>
                <th className="text-start adminHidden">User Id</th>
                <th className="text-start adminHidden">Mobile</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sliceAdmins?.map((admin) => (
                <tr className="tableRow" key={admin._id}>
                  <td align="center">
                    {admin?.image ? (
                      <img
                        className="imgAdmin"
                        src={admin?.image}
                        alt="profilePic"
                      />
                    ) : (
                      <img
                        className="imgAdmin"
                        src=""
                        alt="profilePic"
                      />
                    )}
                  </td>

                  <td
                    style={{ textTransform: "lowercase" }}
                    className="text-start"
                  >
                    {admin.name}
                  </td>
                  <td className="text-start adminHidden">{admin.userId}</td>
                  <td className="text-start adminHidden">{admin.mobile ? admin.mobile : '01XXXXXXXXXX'}</td>
                  <td className="action">
                    <div className="actionDiv text-center">
                    
                      <button
                        onClick={() => handleAdminDelete(admin._id)}
                        className="deleteBtn"
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

        <div className="">
          {sliceAdmins?.length ? (
            <Pagination
              lastPage={lastPage}
              page={getPage}
              pageHandle={pageHandle}
            />
          ) : (
            <></>
          )}
        </div>
       
      </div>
    </div>
  );
};

export default Users;
