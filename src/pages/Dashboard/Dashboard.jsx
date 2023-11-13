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
import { Divider } from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import { AdminContext } from "../../contexts/AdminContext";
import { MdDashboard, MdCategory } from "react-icons/md";
import { useEffect } from "react";

const menuLinkStyles = ({ isActive }) => {
  return {
    backgroundColor: isActive ? "#1A1C33" : "",
  };
};
const drawerWidth = 280;

function Dashboard(props) {
  const { admin, logout } = React.useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin?.role !== "admin") {
      navigate("/");
    }
  }, [admin, navigate]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
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



  
  const drawer = (
    <div className="sideBar">
      <Toolbar />
      <img className="dashLogo mx-auto" src='https://i.ibb.co/ZxWjB4s/Fundbox-reverse.webp' alt="" />
      {/* <h5 className="text-white mb-5">Fundbox</h5> */}
      {/* <Divider /> */}
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
          to="all-category"
        >
          <span className="navIconAdmin">
            <MdCategory style={{ fontSize: "20px" }} />
          </span>
          CATEGORIES
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
