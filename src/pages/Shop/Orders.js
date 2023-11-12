import PageTitle from "../../Components/Common/PageTitle";
import { TbListDetails } from "react-icons/tb";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import swal from "sweetalert";

import OrderDetails from "./OrderDetails";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";

const Orders = () => {

  const navigate = useNavigate();

  const [orderModal, setOrderModal] = useState(false);
  const [modalData, setModalData] = useState("");

  const [myOrders, setMyOrders] = useState([]);
  const { user } = useContext(DSLCommerceContext);
  // console.log(user?.walletAddress);


  useEffect(() => {
    fetch(
      `https://backend.dslcommerce.com/api/order/data/${user?.walletAddress}`
    )
      .then((res) => res.json())
      .then((data) => setMyOrders(data.result.reverse()));
  }, [user?.walletAddress]);

  const handleModal = (order) => {
    setModalData(order);
  };

  const handleCopyOrderId = (orderId) => {
    navigator.clipboard.writeText(`${orderId}`);
    swal({
      text: "Order id copied.",
      icon: "success",
      button: "OK!",
      className: "modal_class_success",
    });
  };

  //****************************** Pagination Start ******************************/
  const { orderPerPage } = useParams();
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(5);
  const [lastPage, setLastPage] = useState(0);
  const [sliceOrder, setSliceOrder] = useState([]);
  // console.log(sliceProducts)

  useEffect(() => {
    const lastPage = Math.ceil(myOrders?.length / show);
    setLastPage(lastPage);
  }, [myOrders, show]);

  useEffect(() => {
    if (orderPerPage) {
      const page = parseInt(orderPerPage);
      const getSlicingOrder = myOrders.slice((page - 1) * show, page * show);
      console.log("getSlicingCategory");
      console.log(getSlicingOrder);
      setSliceOrder([...getSlicingOrder]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = myOrders.slice(0, show);
      setSliceOrder([...getSlicingProduct]);
    }
  }, [myOrders, show, orderPerPage]);

  const pageHandle = (jump) => {
    navigate(`/order/${jump}`);
    setPage(parseInt(jump));
    window.scrollTo(0, 0);
  };
  //****************************** Pagination End ******************************/

  return (
    <div>
      <PageTitle title="My Orders" />
      {/* <OrderArea /> */}

      <div className="container">
        <div className="wishlist-table table-responsive">
          {myOrders.length ? (
            <>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th className="border-0 text-start">Date</th>
                    <th className="border-0 text-start">Order Id</th>
                    <th className="border-0 text-start">Amount</th>
                    {/* <th className="border-0 text-start">Payment Method</th> */}
                    {/* <th className="border-0 text-start">Status</th> */}
                    <th className="border-0 text-end">Details</th>
                  </tr>
                </tbody>

                <tbody>
                  {sliceOrder?.map((order, index) => (
                    <tr key={index}>
                      <td className="">{order?.date.slice(0, 10)}</td>
                      <td className="">
                        {order?.orderId}{" "}
                        <CopyAllIcon
                          onClick={() => handleCopyOrderId(order?.orderId)}
                          sx={{ cursor: "pointer", ms: "4px" }}
                          fontSize="small"
                        />
                      </td>
                      <td className="">{order?.amount}</td>
                      {/* <td className="text-center">{order?.paymentMethod}</td> */}
                      {/* {order?.pendingStatus === true ? (
                          <td className="">Pending</td>
                        ) : (
                          <td className="">Delivered</td>
                        )} */}
                      <td
                        className="product-btn "
                        style={{ cursor: "pointer" }}
                      >
                        <span
                          onClick={() => {
                            setOrderModal(true);
                            handleModal(order);
                          }}
                          className="default-btn"
                        >
                          <TbListDetails className="me-2" />
                          Details
                        </span>
                      </td>
                      {/* {
                          open && <OrderDetails open={open} setOpen={setOpen} order={order}></OrderDetails>
                        } */}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="">
                {sliceOrder?.length ? (
                  <Pagination
                    lastPage={lastPage}
                    page={getPage}
                    pageHandle={pageHandle}
                  />
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <div>
              <h2 className="text-center py-5 font-bold"> No Order Found</h2>
            </div>
          )}
        </div>
      </div>

      {/* Modal  */}
      <OrderDetails
        show={orderModal}
        setOrderModal={setOrderModal}
        onHide={() => setOrderModal(false)}
        myOrder={modalData}
      />
    </div>
  );
};

export default Orders;
