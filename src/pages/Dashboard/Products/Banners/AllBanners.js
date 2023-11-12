import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import CreateBannerModal from "./CreateBannerModal";
import swal from "sweetalert";
import { Button, Tooltip } from "@mui/material";
import EditBanner from "./EditBanner";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../../../Components/Pagination/Pagination";

const AllBanners = () => {
  const { bannerPerPage } = useParams();

  const [modalShowNewBanner, setModalShowNewBanner] = useState(false);
  const [allBanners, setAllBanners] = useState([]);
  const [editBanner, setEditBanner] = useState('');
  // console.log(allBanners);
  const [editBannerModal, setEditBannerModal] = useState(false);


  //****************************** Pagination Start ******************************/
  const navigate = useNavigate();
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceBanners, setSliceBanners] = useState([]);
  // console.log(sliceProducts)


  useEffect(() => {
    const lastPage = Math.ceil(allBanners?.length / show);
    setLastPage(lastPage);
  }, [allBanners, show]);




  useEffect(() => {
    if (bannerPerPage) {
      const page = parseInt(bannerPerPage);
      const getSlicingBanner = allBanners.slice(
        (page - 1) * show,
        page * show
      );
      setSliceBanners([...getSlicingBanner]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = allBanners.slice(0, show);
      setSliceBanners([...getSlicingProduct]);
    }
  }, [allBanners, show, bannerPerPage]);

  const pageHandle = (jump) => {
    navigate(`/admin/banners/${jump}`);
    setPage(parseInt(jump));
  };


  //****************************** Pagination Start ******************************/




  const fetchAllBanners = async () => {

    await axios
      .get("https://backend.dslcommerce.com/api/banner")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res);
          setAllBanners(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {

    fetchAllBanners();
  }, []);

  const handleBannerDelete = (id) => {
    swal({
      text: "Are you sure, you want to delete this banner?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://backend.dslcommerce.com/api/banner/${id}`)
          .then((res) => {
            if (res.status === 200) {
              fetchAllBanners();
              swal({
                text: res.data.message,
                icon: "success",
                button: "OK!",
                className: "modal_class_success",
              });
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
  const handelBanner = (id) => {
    setEditBanner(id)
    setEditBannerModal(true)
  }

  return (
    <div>
      <div className="productCard pb-2">
        <div className="d-flex flex-column flex-row justify-content-lg-between align-items-center">
          <Button
            variant="contained"
            xs={{ size: "large" }}
            sx={{ mt: "1rem", mb: "2rem" }}
            style={{ background: '#6958BE' }}
            onClick={() => setModalShowNewBanner(true)}
          >
            Add Banner
          </Button>
        </div>

        <div className="tableNormal ">
          <Table
            style={{ minWidth: "650px", maxWidth: "100%" }}
            className="text-white productDataTable "
          >
            <thead>
              <tr>
                <th className="text-left">Image</th>
                <th className="text-left">Title</th>
                <th className="text-left">Date</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {sliceBanners?.map((eachBanner) => (
                <tr className="tableRow">
                  <td align="left">
                    {" "}
                    <img
                      className="imgProduct"
                      src={eachBanner?.img}
                      alt="banner Img"
                    />
                  </td>

                  <td className="text-left text-capitalize ">
                    {eachBanner?.title}
                  </td>
                  <td className="text-left text-capitalize ">
                    {eachBanner?.date}
                  </td>

                  <td className="action">
                    <div className="actionDiv text-left">
                      <Tooltip title="Edit Banner." placement="top">

                        <button
                          onClick={() => {
                            setEditBanner(eachBanner)
                            setEditBannerModal(true)
                          }
                          }
                          // onClick={() => handelBanner()}
                          className="editBtn">
                          <i className="fas fa-edit"></i>
                        </button>
                      </Tooltip>
                      <Tooltip title="Delete the Banner." placement="top">

                        <button

                          onClick={() => handleBannerDelete(eachBanner?._id)}
                          className="deleteBtn text-white"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {sliceBanners?.length ? (
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

      {/****** Create Banner Modal START ******/}

      <CreateBannerModal
        show={modalShowNewBanner}
        setModalShowNewBanner={setModalShowNewBanner}
        fetchAllBanners={fetchAllBanners}
        onHide={() => setModalShowNewBanner(false)}
      ></CreateBannerModal>
      {/******  Create Banner Modal END ******/}



      {/******  UPDATE Banner Modal START ******/}

      <EditBanner
        show={editBannerModal}
        editBanner={editBanner}
        setEditBannerModal={setEditBannerModal}
        fetchAllBanners={fetchAllBanners}
        onHide={() => setEditBannerModal(false)}
      ></EditBanner>
      {/******  UPDATE Banner Modal END ******/}

    </div>
  );
};

export default AllBanners;
