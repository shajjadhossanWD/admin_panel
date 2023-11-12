import { Card, Col, Row, Table } from "react-bootstrap";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import Pagination from "../../../Components/Pagination/Pagination";
import axios from "axios";
import { CSVLink } from "react-csv";
import swal from "sweetalert";

const AdministerOrders = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [refetch, setRefetch] = useState(false);

  //*************************** Emtiaz ***************************
  const fetchAllOrders = () => {
    axios
      .get(
        `https://backend.dslcommerce.com/api/order/data/admin/administrative-order`
      )
      .then((res) => {
        setAllOrder(res?.data?.result);
        setAllOrders(res?.data?.result);
      });
  };
  useEffect(() => {
    fetchAllOrders();
  }, [refetch]);

  //****************************** Pagination Start ******************************/
  const { administerOrders } = useParams();
  const navigate = useNavigate();
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceOrders, setSliceOrders] = useState([]);
  console.log(sliceOrders, "Customers orders in administer");
  const [ordersForCsv, setOrdersForCsv] = useState([]);

  useEffect(() => {
    if (sliceOrders) {
      const orders = sliceOrders.map(
        ({
          _id,
          orderItems,
          paymentMethod,
          pendingStatus,
          deliveredStatus,
          __v,
          phone,
          Finalstatus,
          administerOrder,
          processingStatus,
          ...keepFields
        }) => keepFields
      );

      setOrdersForCsv(orders);
    }
  }, [sliceOrders]);

  // console.log(sliceProducts)

  useEffect(() => {
    const lastPage = Math.ceil(allOrder?.length / show);
    setLastPage(lastPage);
  }, [allOrder, show]);

  useEffect(() => {
    if (administerOrders) {
      const page = parseInt(administerOrders);
      const getSlicingCategory = allOrder?.slice(
        (page - 1) * show,
        page * show
      );
      setSliceOrders([...getSlicingCategory]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = allOrder?.slice(0, show);
      setSliceOrders([...getSlicingProduct]);
    }
  }, [allOrder, show, administerOrders]);

  const pageHandle = (jump) => {
    navigate(`/admin/administer-orders/${jump}`);
    setPage(parseInt(jump));
  };
  //****************************** Pagination End ******************************/

  const handleOrderDelete = (id) => {
    swal({
      text: "Are you sure, you want to delete this Order?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://backend.dslcommerce.com/api/order/${id}`)
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
              setAllOrder(allOrder.filter((c) => c._id !== id));
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

  //*****************  Handle Search By Product Name */
  const handleSearch = (e) => {
    const kyeWord = e.target.value.toLocaleLowerCase();
    // console.log(kyeWord);
    let searched;
    if (kyeWord !== "") {
      searched = allOrders.filter(
        (item) =>
          item.orderItems[0]?.productName
            ?.toLocaleLowerCase()
            .includes(kyeWord) === true
      );
    } else {
      searched = allOrders;
    }
    setAllOrder(searched);
  };

  //*************************************** Sort Handle **************************************
  const sortHandle = (e) => {
    const method = e?.target?.value || e;
    console.log(method);
    if (method == "pending") {
      // console.log('first' , method)
      axios
        .get(
          `https://backend.dslcommerce.com/api/order/data/admin/administrative-order/pending`
        )
        .then((res) => setAllOrder(res.data.result));
      return;
    } else if (method == "processing") {
      // console.log('second')
      axios
        .get(
          `https://backend.dslcommerce.com/api/order/data/admin/administrative-order/processing`
        )
        .then((res) => setAllOrder(res.data.result));
      return;
    } else if (method == "delivered") {
      // console.log('third')
      axios
        .get(
          `https://backend.dslcommerce.com/api/order/data/admin/administrative-order/delivered`
        )
        .then((res) => setAllOrder(res.data.result));
      return;
    } else {
      fetchAllOrders();
      return;
    }
  };
  //***************************************  Handle Status **************************************
  const statusAction = (e, id) => {
    const method = e?.target?.value || e;
    // console.log(method, id);
    if (method == "pending") {
      axios.put(`https://backend.dslcommerce.com/api/order/pending/${id}`);
      setRefetch(!refetch);
      fetchAllOrders();
      return;
    } else if (method == "processing") {
      axios.put(`https://backend.dslcommerce.com/api/order/processing/${id}`);
      setRefetch(!refetch);
      fetchAllOrders();
      return;
    } else if (method == "delivered") {
      axios.put(`https://backend.dslcommerce.com/api/order/delivered/${id}`);
      setRefetch(!refetch);
      fetchAllOrders();
      return;
    }
  };

  return (
    <div className="productBody">
      <h5 className="text-white-50 text-start pb-2 text-uppercase">
        {" "}
        ADMINISTER ORDERS
      </h5>
      <Row className="g-5">
        <Col className="py-2">
          <Card className="customerCard">
            <Card.Body>
              <Card.Text className="dashboardTxt">
                <div className="d-flex flex-column flex-lg-row justify-content-evenly gap-3">
                  <input
                    type="text"
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search By Name"
                    className="py-3 pl-2 w-100 w-100 w-lg-25  rounded"
                  />

                  <select
                    onChange={sortHandle}
                    className="py-2 pl-2 border border-white rounded w-100 w-lg-25"
                    style={{ cursor: "pointer", borderRadius: "5px" }}
                  >
                    <option value="default">Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                  </select>

                  <button className="w-100 w-lg-25 rounded btn btn-success fs-5">
                    <CSVLink data={ordersForCsv} style={{ color: "white" }}>
                      Download All Orders
                      <AiOutlineCloudDownload className="fs-3" />
                    </CSVLink>
                  </button>
                  {console.log(ordersForCsv)}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {sliceOrders?.length > 0 ? (
        <>
          <div className="productCard py-2">
            <div className="tableNormal ">
              <Table className="text-white-50 productDataTable ">
                <thead>
                  <tr>
                    <th className="text-left">Product Name</th>
                    <th className="text-left">Email</th>
                    <th className="text-left ">Method</th>
                    <th className="text-left ">Amount</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Action</th>
                    <th className="text-left">View / Del</th>
                  </tr>
                </thead>
                <tbody>
                  {sliceOrders?.map((order, index) => (
                    <tr className="tableRow" key={order?._id}>
                      <td className="text-left text-transparent">
                        {order?.orderItems?.slice(0, 1).map((item) => (
                          <div>{item?.productName}</div>
                        ))}
                      </td>
                      <td className="text-left ">{order?.email}</td>
                      <td className="text-left text-capitalize ">
                        {order?.paymentMethod}
                      </td>
                      <td className="text-left text-capitalize ">
                        ${order?.amount}
                      </td>
                      <td className="text-left">
                        {order?.pendingStatus === true && (
                          <button
                            className="btn btn-sm bg-primary cBtn text-white"
                            style={{ borderRadius: "20px" }}
                          >
                            Pending
                          </button>
                        )}
                        {order?.processingStatus === true && (
                          <button
                            className="btn btn-sm bg-success cBtn text-white"
                            style={{ borderRadius: "20px" }}
                          >
                            Processing
                          </button>
                        )}
                        {(order?.deliveredStatus === true) === true && (
                          <button
                            className="btn btn-sm bg-danger cBtn text-white"
                            style={{ borderRadius: "20px" }}
                          >
                            Delivered
                          </button>
                        )}
                      </td>
                      <td className="text-left">
                        <select
                          onClick={(e) => statusAction(e, order?._id)}
                          className="py-1 pl-2 border border-white rounded "
                          style={{ cursor: "pointer", borderRadius: "5px" }}
                        >
                          <option value="default">Status</option>
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="action d-flex justify-content-left">
                        <div className="actionDiv d-flex text-left">
                          <Link to={`/admin/orderDetail/${order?.orderId}`}>
                            <button className="editBtn">
                              <GrView />
                            </button>
                          </Link>

                          <span>
                            <button
                              onClick={() => handleOrderDelete(order?._id)}
                              className="deleteBtn text-white "
                            >
                              <AiFillDelete />
                            </button>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-center font-weight-bold py-5 text-white">
            No Order Found
          </h2>
        </div>
      )}

      {/*********************************** Pagination  Start***********************************/}
      <div className="">
        {sliceOrders?.length ? (
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
    </div>
  );
};

export default AdministerOrders;
