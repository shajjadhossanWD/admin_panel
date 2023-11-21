import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { FaUsers } from "react-icons/fa";
import {
  RiAdminFill,
} from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
import { CiBookmarkCheck } from "react-icons/ci";
import axios from "axios";
import RecentOrders from "./RecentOrders";
import MonthlySellGraph from "./MonthlySellGraph";

const AdminDashboard = () => {
  const [allAdmin, setAllAdmin] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [allOrder, setAllOrder] = useState([]);
 

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://kccb.kvillagebd.com/api/v1/admin/get/all").then((res) => {
      setAllAdmin(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://kccb.kvillagebd.com/api/v1/booking/get/all").then((res) => {
      setAllOrder(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://kccb.kvillagebd.com/api/v1/user/alldata").then((res) => {
      setCustomers(res.data.result);
    });
  }, []);

  useEffect(() => {
    axios.get("https://kccb.kvillagebd.com/api/v1/booking/get/today-bookings").then((res) => {
      setProducts(res.data);
    });
  }, []);
  

  const handleClickOpenAdmin = () => {
    navigate("/admin/all-admin");
    window.scrollTo(0, 0);
  };
  const handleClickOpenCustomers = () => {
    navigate("/admin/users");
    window.scrollTo(0, 0);
  };
  const handleClickOpenProducts = () => {
    navigate("/admin/all-bookings");
    window.scrollTo(0, 0);
  };

  const handleClickTodaysBooking = () => {
    navigate("/admin/today-bookings");
    window.scrollTo(0, 0);
  };


  return (
    <div>
      <div className="container px-0">
        <h5 className="text-white text-start pb-3">DASHBOARD</h5>

        <Row className="g-5">
         

          <Col xs={12} md={6} lg={4} xl={3} onClick={handleClickOpenAdmin}>
            <Card className="cardDash " style={{ borderRadius: "20px" }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className="dashboardTxt">
                  <p>Admins</p>
                  <h2 className="text-start">{allAdmin.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className="text-white coinsIcon ">
                  <RiAdminFill />
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          

          <Col xs={12} md={6} lg={4} xl={3} onClick={handleClickOpenCustomers}>
            <Card className="cardDash " style={{ borderRadius: "20px" }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className="dashboardTxt">
                  <p>Users</p>
                  <h2 className="text-start">{customers.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className="text-white coinsIcon ">
                  <FaUsers />
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>


          <Col xs={12} md={6} lg={4} xl={3} onClick={handleClickOpenProducts}>
            <Card className="cardDash " style={{ borderRadius: "20px" }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className="dashboardTxt">
                  <p>All Bookings</p>
                  <h2 className="text-start">{allOrder.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className="text-white coinsIcon ">
                    <TbBrandBooking />
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>


          <Col xs={12} md={6} lg={4} xl={3} onClick={handleClickTodaysBooking}>
            <Card className="cardDash " style={{ borderRadius: "20px" }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className="dashboardTxt">
                  <p>Today's Bookings</p>
                  <h2 className="text-start">{products.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className="text-white coinsIcon ">
                    <CiBookmarkCheck />
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>


        </Row>

        <div className="mt-5">
          <MonthlySellGraph />
        </div>
        <RecentOrders />
      </div>
    </div>
  );
};

export default AdminDashboard;
