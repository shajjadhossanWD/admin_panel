import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { FaUsers, FaProductHunt, FaShoppingCart } from "react-icons/fa";
import {
  RiAdminFill,
  RiMoneyDollarCircleLine,
  RiMoneyDollarCircleFill,
  RiMoneyDollarBoxLine,
} from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { GiCheckMark, GiRoundStar } from "react-icons/gi";
import { GoVerified } from "react-icons/go";
import { SiProcesswire } from "react-icons/si";
import axios from "axios";
import RecentOrders from "./RecentOrders";
import MonthlySellGraph from "./MonthlySellGraph";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const AdminDashboard = () => {
  const [allAdmin, setAllAdmin] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allOrder, setAllOrder] = useState([]);
 

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get("https://backend.dslcommerce.com/api/admin/").then((res) => {
  //     setAllAdmin(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("https://backend.dslcommerce.com/api/product/data/verified/")
  //     .then((res) => {
  //       setProducts(res.data.result);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios.get("https://backend.dslcommerce.com/api/category/").then((res) => {
  //     setCategories(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   axios.get("https://backend.dslcommerce.com/api/order/").then((res) => {
  //     setAllOrder(res.data);
  //   });
  // }, []);
  // useEffect(() => {
  //   axios.get("https://backend.dslcommerce.com/api/users/all/").then((res) => {
  //     setCustomers(res.data);
  //   });
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get("https://backend.dslcommerce.com/api/user-panel/verified/")
  //     .then((res) => {
  //       setVerifiedMerchants(res.data.result);
  //     });
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get("https://backend.dslcommerce.com/api/product/admin/merchants")
  //     .then((res) => {
  //       setMerchantsProducts(res.data.result);
  //     });
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get("https://backend.dslcommerce.com/api/order/data/processing/all")
  //     .then((res) => {
  //       setProcessingOrder(res.data.result);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios.get("https://backend.dslcommerce.com/api/bill-record").then((res) => {
  //     setTotalSell(res?.data?.TotalSell);
  //   });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("https://backend.dslcommerce.com/api/bill-record/week-total")
  //     .then((data) => {
  //       if (data.status === 200) {
  //         console.log(data, "Weekly data");

  //         const secondLastWeekSell =
  //           data?.data?.WeekResult[data?.data?.WeekResult.length - 2]
  //             .totalAmount;
  //         const thirdLastWeekSell =
  //           data?.data?.WeekResult[data?.data?.WeekResult.length - 3]
  //             .totalAmount;

  //         console.log(secondLastWeekSell, thirdLastWeekSell, "Weeks");

  //         setSecondLastWeekSell(secondLastWeekSell);
  //         setThirdLastWeekSell(thirdLastWeekSell);
  //       }
  //     });
  // }, []);

  // useEffect(() => {
  //   console.log("allOrders");
  //   console.log(allOrders);
  // }, []);

  const key = "walletAddress";
  const totalCustomers = [
    ...new Map(allOrder.map((item) => [item[key], item])).values(),
  ];
  // console.log(totalCustomers)

  const handleClickOpenAdmin = () => {
    navigate("/admin/adminUser");
    window.scrollTo(0, 0);
  };
  const handleClickOpenCustomers = () => {
    navigate("/admin/customers");
    window.scrollTo(0, 0);
  };
  const handleClickOpenProducts = () => {
    navigate("/admin/products");
    window.scrollTo(0, 0);
  };
  const handleClickOpenCategories = () => {
    navigate("/admin/all-category");
    window.scrollTo(0, 0);
  };
  const handleClickOpenOrders = (targetdProduct) => {
    console.log(targetdProduct, "1111111111");
    navigate(`/admin/orders/${targetdProduct}`);
    window.scrollTo(0, 0);
  };

  const handleClickVerifiedMerchants = () => {
    navigate("/admin/verified");
    window.scrollTo(0, 0);
  };

  const handleClickMerchantsProducts = () => {
    navigate("/admin/added-products");
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="container px-0">
        <h5 className="text-white text-start pb-3">DASHBOARD</h5>

        <Row className="g-5">
         

          <Col xs={12} md={6} lg={4} xl={3} onClick={handleClickOpenCustomers}>
            <Card className="cardDash " style={{ borderRadius: "20px" }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className="dashboardTxt">
                  <p>Customers</p>
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

          

          <Col xs={12} md={6} lg={4} xl={3} onClick={handleClickOpenCategories}>
            <Card className="cardDash " style={{ borderRadius: "20px" }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className="dashboardTxt">
                  <p>Categories</p>
                  <h2 className="text-start">{categories.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className="text-white coinsIcon ">
                    <MdCategory />
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
