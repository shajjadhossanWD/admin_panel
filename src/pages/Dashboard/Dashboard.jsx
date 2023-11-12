import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Button from "react-bootstrap/Button";
import Typography from "@mui/material/Typography";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import logo from "../../assets/img/logoDSL.jpeg";
import { Divider } from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import { AdminContext } from "../../contexts/AdminContext";
import { FaUsers, FaProductHunt } from "react-icons/fa";
import { MdDashboard, MdCategory, MdOutlineUnsubscribe } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import { BsMinecartLoaded } from "react-icons/bs";
import { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";

const menuLinkStyles = ({ isActive }) => {
  return {
    backgroundColor: isActive ? "#1A1C33" : "",
  };
};
const drawerWidth = 280;

function Dashboard(props) {
  const { admin, logout } = React.useContext(AdminContext);
  const navigate = useNavigate();
  const [kycMenu, setKycMenu] = useState("");

  useEffect(() => {
    if (admin?.role !== "admin") {
      navigate("/");
    }
  }, [admin, navigate]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const date = new Date();
  const year = date.getFullYear();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClose = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleChange = (event) => {
    setKycMenu(event.target.value);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    handleClose();
    setAnchorEl(null);
  };

  const [anchorEl3, setAnchorEl3] = useState(null);

  const open = Boolean(anchorEl);
  const open3 = Boolean(anchorEl3);


  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    handleClose();
    setAnchorEl3(null);
  };

  const drawer = (
    <div className="sideBar">
      <Toolbar />
      <img className="dashLogo mx-auto" src={logo} alt="" />
      <Divider />
      <div className="menuDiv text-uppercase">
        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="dashboard"
        >
          <span className="navIconAdmin">
            <MdDashboard style={{ fontSize: "20px" }} />
          </span>
          DASHBOARD
        </NavLink>
        <br />

        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="adminUser"
        >
          {" "}
          <span className="navIconAdmin">
            <RiAdminFill style={{ fontSize: "20px" }} />
          </span>
          ADMINS
        </NavLink>
        <br />

        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="customers"
        >
          {" "}
          <span className="navIconAdmin">
            <FaUsers style={{ fontSize: "20px" }} />
          </span>
          Customers
        </NavLink>

        <div>
          <NavLink
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ color: "#BABBC0", cursor: "pointer" }}
            sx={{ color: "#BABBC0" }}
          >
            <span className="navIconAdmin">
              <MdOutlineUnsubscribe style={{ fontSize: "20px" }} />
            </span>
            MERCHANTS
            <ArrowDropDownIcon />
          </NavLink>


          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose2}
          >
            <Link onClick={handleClose2} to="verified">
              <MenuItem sx={{ color: "black" }} value={10}>
                Verified{" "}
              </MenuItem>
            </Link>
            <Link onClick={handleClose2} to="non-verified">
              <MenuItem sx={{ color: "black" }} value={20}>
                Non Verified
              </MenuItem>
            </Link>
            <Link onClick={handleClose2} to="pending">
              <MenuItem sx={{ color: "black" }} value={30}>
                Pending
              </MenuItem>
            </Link>
            <Link onClick={handleClose2} to="added-products">
              <MenuItem sx={{ color: "black" }} value={40}>
                Added products
              </MenuItem>
            </Link>
          </Menu>
        </div>

        <div>
          <NavLink
            id="demo-positioned-button"
            aria-controls={open3 ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open3 ? "true" : undefined}
            onClick={handleClick3}
            style={{ color: "#BABBC0", cursor: "pointer" }}
            sx={{ color: "#BABBC0" }}
          >
            <span className="navIconAdmin">
              <FaProductHunt style={{ fontSize: "20px" }} />
            </span>
            PRODUCTS
            <ArrowDropDownIcon />
          </NavLink>


          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl3}
            open={open3}
            onClose={handleClose3}
          >
            <Link onClick={handleClose3} to="products">
              <MenuItem sx={{ color: "black" }} value={10}>
                ADD PEODUCTS
              </MenuItem>
            </Link>
            <Link onClick={handleClose3} to="featuredProducts">
              <MenuItem sx={{ color: "black" }} value={30}>
                FEATURED PRODUCTS
              </MenuItem>
            </Link>
            <Link onClick={handleClose3} to="banners">
              <MenuItem sx={{ color: "black" }} value={30}>
                ADD BANNER
              </MenuItem>
            </Link>

          </Menu>
        </div>

        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="orders"
        >
          {" "}
          <span className="navIconAdmin">
            <GiShoppingBag style={{ fontSize: "20px" }} />
          </span>
          CUSTOMER ORDERS
        </NavLink>
        <br />

        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="administer-orders"
        >
          {" "}
          <span className="navIconAdmin">
            <BsMinecartLoaded style={{ fontSize: "20px" }} />
          </span>
          Administer Orders
        </NavLink>
        <br />


        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="all-category"
        >
          <span className="navIconAdmin">
            <MdCategory style={{ fontSize: "20px" }} />
          </span>
          CATEGORIES
        </NavLink>
        <br />
        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="all-subscribers"
        >
          <span className="navIconAdmin">
            <MdOutlineUnsubscribe style={{ fontSize: "20px" }} />
          </span>
          ALL SUBSCRIBERS
        </NavLink>
        <br />

        <Button
          variant="danger"
          onClick={() => handleLogout()}
          className="mt-3 mb-5  text-uppercase ms-3 w-75"
          style={{ fontSize: "1rem" }}
          size="lg"
        >
          Log Out
        </Button>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const menuToggle = () => {
    const toggleMenu = document.querySelector(".adminProfile");
    toggleMenu.classList.toggle("active");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="dashboardNav">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <FormatAlignLeftIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="dashboardTopBar"
          >
            <h4 className="dashboardTitlehidden">Dashboard</h4>
            {/* <div className="profile">
              <div className="imgDashDiv" onClick={menuToggle}>
                <img src={currentAdmin.avatar} alt="" />
              </div>
            </div> */}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#272d47",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#272d47",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          paddingInline: "1rem",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className=" dashboardDiv"
      >
        <Toolbar />
        <div className="contentAllDiv">
          <div className="outletContainer">
            <Outlet />
          </div>
          <div className="copyrightAdmin mt-4 ">
            <p className="my-2">Copyright © {year} - DS Legends Pte. Ltd.</p>
          </div>
        </div>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
