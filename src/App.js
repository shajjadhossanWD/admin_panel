import "./App.css";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PublicLayout from "./Components/Layout/PublicLayout";
import { Toaster } from "react-hot-toast";
// Login
import Login from "./pages/Authentications/Login";
// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard/AdminDashboard";
import AdminRoutes from "./Components/AdminRoute/AdminRoutes";
import Loader from "./Components/Shared/Loader";
import AllBookings from "./pages/Dashboard/Bookings/AllBooking/AllBookings";
import Admins from "./pages/Dashboard/Admins/Admins";
import Users from "./pages/Dashboard/Users/Users";
import Attention from "./pages/Dashboard/Attention/Attention";
import TodayBookings from "./pages/Dashboard/Bookings/AllBooking/TodayBookings";
import ViewBookingsData from "./pages/Dashboard/Bookings/AllBooking/ViewBookingsData";
import HomePage from "./pages/HomePages/HomePage";
import PrivacyPolicy from "./pages/HomePages/PrivacyPolicy";
import SendDeleteRequest from "./pages/HomePages/SendDeleteRequest";
import RoomBookings from "./pages/Dashboard/Bookings/AllBooking/RoomBookings";



export const ProductContext = createContext();
function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 180);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  console.log(location.pathname?.split("/")[1], "the first part of the route");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const [pageYOffset, setPageYOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => setPageYOffset(window.pageYOffset);
  });

  if (isLoading) {
    return <Loader/>
  }

  return (
    <>
     
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/send-delete-request" element={<SendDeleteRequest />} />
        <Route path="/login" element={<Login />} />
      
       
       
        
        {/*************************** Dashboard Start************************** */}
        <Route
          path="/admin"
          element={
            <AdminRoutes>
              <Dashboard />
            </AdminRoutes>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          {/*************************** bookings  ***************************/}
          <Route path="all-admin" element={<Admins />} />
          <Route path="users" element={<Users />} />
          <Route path="all-bookings" element={<AllBookings />} />
          <Route path="today-bookings" element={<TodayBookings />} />
          <Route path="attention" element={<Attention />} />
          <Route
            path="all-bookings/:id"
            element={<ViewBookingsData />}
          />
          <Route
            path="bookings-details/:date/:room"
            element={<RoomBookings />}
          />
        </Route>
        
        {/*************************** Dashboard End************************** */}
      </Routes>

      {/* Scroll to top and bottom */}
      <div
        className={`${location.pathname?.split("/")[1] === "admin" ? "d-none" : "d-block"
          }`}
      >
        {pageYOffset > 200 ? (
          <KeyboardArrowUpIcon
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="upperArrowIcon"
            style={{
              zIndex: '1',
              fontSize: `${window.screen.width > 500 ? "40px" : "35px"}`,
            }}
          />
        ) : (
          <KeyboardArrowDownIcon
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}
            className="upperArrowIcon"
            style={{
              zIndex: '1',
              fontSize: `${window.screen.width > 500 ? "40px" : "35px"}`,
            }}
          />
        )}
      </div>

      <Toaster />
    </>
  );
}

export default App;
