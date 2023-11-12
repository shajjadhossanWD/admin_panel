import "./App.css";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PublicLayout from "./Components/Layout/PublicLayout";
import HomeTwo from "./pages/Home/HomeTwo";
import About from "./pages/About/About";
import Search from "./pages/About/Search";
import ResetPassword from "./pages/Authentications/ResetPassword";
import OurTeam from "./pages/About/OurTeam";
import Faqs from "./pages/About/Faqs";
import HelpDesk from "./pages/About/HelpDesk";
import Error404 from "./pages/About/Error-404";
import TrackingOrder from "./pages/About/TrackingOrder";
import Cart from "./pages/Shop/Cart";
import Orders from "./pages/Shop/Orders";
import WishList from "./pages/Shop/WishList";
import ProductsDetails from "./pages/Shop/ProductsDetails";
import ProductsDetailsSidebar from "./pages/Shop/ProductsDetailsSidebar";
import Blog from "./pages/Blog/Blog";
import AddProduct from "./pages/Products/AddProduct";
import User from "./pages/User/User";
import Products from "./pages/Products/Products";
import News from "./pages/News/News";
import "./App.css";
import CheckoutArea from "./Components/Shop/CheckoutArea";
import SubscriptionVerify from "./Components/Layout/Footer/SubscriptionVerify";
import Profile from "./pages/Profile/Profile";

// Login
import Login from "./pages/Authentications/Login";
import Register from "./pages/Authentications/Register";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import Otp from "./Components/Auth/Otp";

// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard/AdminDashboard";

import CreateProduct from "./pages/Dashboard/Products/CreateProduct/CreateProduct";
import Admins from "./pages/Dashboard/Admins/Admins";
import AllProduct from "./pages/Dashboard/Products/AllProduct/AllProduct";
import AllCategory from "./pages/Dashboard/Category/AllCategory/AllCategory";
import AddCategory from "./pages/Dashboard/Category/AddCategory/AddCategory";
import ContactArea from "./Components/About/ContactArea";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse";
import DataProtection from "./pages/DataProtection/DataProtection";
import { Toaster } from "react-hot-toast";
import Data from "./pages/Dashboard/Data/Data";
import FaqDashboard from "./pages/Dashboard/Data/FaqDashboard";
import HelpDeskDashborad from "./pages/Dashboard/Data/HelpDeskDashborad";
import CustomerServicesDashboard from "./pages/Dashboard/Data/CustomerServicesDashboard";
import UpdateProduct from "./pages/Dashboard/Products/UpdateProduct/UpdateProduct";
import DashboardAdminEditProfile from "./pages/Dashboard/Admins/DashboardAdminEditProfile";
import Customers from "./pages/Dashboard/Customers/Customers";
import CustomersUpdate from "./pages/Dashboard/Customers/CustomersUpdate";
import CustomerOrders from "./pages/Dashboard/CustomerOrders/CustomerOrders";
import WalletModal from "./Components/Shared/WalletModal";
import CartArea from "./Components/Shop/CartArea";
import MainShop from "./pages/Shop/PathCheck/MainShop";
import Page from "./pages/Shop/PathCheck/Page";
import CatPath from "./pages/Shop/PathCheck/CatPath";
import SearchPath from "./pages/Shop/PathCheck/SearchPath";
import SingleOrderDetail from "./pages/Dashboard/CustomerOrders/SingleOrderDetail";
import MintDetails from "./pages/MintDetails/MintDetails";
import Subscribers from "./pages/Dashboard/Subscribers/Subscribers";
import AdminRoutes from "./Components/AdminRoute/AdminRoutes";
import AdministerOrders from "./pages/Dashboard/AdministerOrders/AdministerOrders";
import Preloader from "./Components/Common/Preloader";
import Merchant from "./pages/Merchant/Merchant";
import KYC from "./pages/KYC/KYC";
import KycLogin from "./Components/KYCArea/KycAccount/KycLogin/KycLogin";
import KycSignUp from "./Components/KYCArea/KycAccount/KycSignUp/KycSignUp";
import KycForgetPassword from "./Components/Auth/KycForgetPassword";
import KycResetPassword from "./Components/Auth/KycResetPassword";
import AdminResetPassword from "./Components/Auth/AdminResetPassword";
import CustomerDetails from "./pages/Dashboard/Customers/CustomerDetails";
import UpdateUnverifiedProduct from "./pages/Dashboard/Products/UpdateUnverifiedProduct/UpdateUnverifiedProduct";
import RequireAuth from "./Components/Auth/RequireKycAuth";
import RequireKycAuth from "./Components/Auth/RequireKycAuth";
import KycMyProduct from "./Components/KYCArea/KycMyProduct/KycMyProduct";
import AddedProducts from "./pages/Dashboard/Merchant/AddedProducts/AddedProduct";
import NonVerified from "./pages/Dashboard/Merchant/verified/NonVerified";
import Pending from "./pages/Dashboard/Merchant/Pending/Pending";
import UserDetails from "./pages/Dashboard/Merchant/UserDetails/UserDetails";
import Verified from "./pages/Dashboard/Merchant/verified/Verified";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AllBanners from "./pages/Dashboard/Products/Banners/AllBanners";
import CreateBanner from "./pages/Dashboard/Products/Banners/CreateBanner";
import FeturedProducts from "./pages/Dashboard/Products/FeturedProducts/FeturedProducts";

export const ProductContext = createContext();
function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 180);
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);

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
    return <Preloader />;
  }

  return (
    <>
      <WalletModal></WalletModal>
      {/* <CoinbaseModal></CoinbaseModal> */}
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomeTwo />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/:affiliateLink" element={<HomeTwo />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/search" element={<Search />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/news" element={<News />} />
          <Route path="/merchant-add-product" element={<Merchant />} />

          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/data-protection-notice" element={<DataProtection />} />
          <Route path="/help-desk" element={<HelpDesk />} />

          <Route path="/profile" element={<Profile expiryTimestamp={time} />} />
          <Route
            path="/tracking-order"
            element={<TrackingOrder expiryTimestamp={time} />}
          />

          {/* SHOP START */}

          <Route path="/shop" element={<MainShop />} />
          <Route path="/shop/page/:page" element={<Page />} />
          <Route path="/shop/cat/:keyword/page/:page" element={<CatPath />} />
          <Route
            path="/shop/cat/:keyword/search/:query/:page"
            element={<SearchPath />}
          />

          {/* SHOP END */}

          <Route path="/contact" element={<ContactArea />} />
          <Route path="/cart" element={<CartArea />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/order/:orderPerPage" element={<Orders />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/wishlist/:productPerPagee" element={<WishList />} />
          <Route path="/mintednft/:id/:address" element={<MintDetails />} />
          <Route path="/checkout/:totalPrice" element={<CheckoutArea />} />
          <Route
            path="/shop/products-details/:productId"
            element={<ProductsDetails />}
          />
          <Route
            path="/products-details-sidebar"
            element={<ProductsDetailsSidebar />}
          />
          <Route path="/blog" element={<Blog />} />
          {/* <Route path="/coming-soon" element={<ComingSoon />} /> */}
          <Route path="/verify-email/" element={<SubscriptionVerify />} />
          <Route path="/user" element={<User />} />
        </Route>
        {/*************************** Login System ****************************** */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route
          path="/admin/login/forgetPassword"
          element={<ForgetPassword />}
        />
        <Route
          path="/admin/login/resetPassword/:token"
          element={<AdminResetPassword />}
        />
        /admin
        <Route
          path="/admin/otp/:token"
          element={<Otp expiryTimestamp={time} />}
        />
        {/*******************************  KYC Start ***************************** */}
        <Route path="/kyc/login" element={<KycLogin />} />
        <Route
          path="/kyc/login/forgetPassword"
          element={<KycForgetPassword />}
        />
        <Route
          path="/kyc/login/resetPassword/:token"
          element={<KycResetPassword />}
        />
        <Route path="/kyc/sign-up" element={<KycSignUp />} />
        <Route element={<RequireKycAuth />}>
          <Route path="/kyc/profile" element={<KYC />} />
          <Route path="/kyc/profile/my-product" element={<KycMyProduct />} />
        </Route>
        {/****************************** KYC Start End ******************************/}
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
          <Route path="adminUser" element={<Admins />} />
          <Route
            path="/admin/adminprofile/:id"
            element={<DashboardAdminEditProfile />}
          />

          {/*************************** Customers  ***************************/}
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:customerPerPage" element={<Customers />} />
          <Route path="customers-update" element={<CustomersUpdate />} />
          <Route
            path="customers-details/:walletaddress"
            element={<CustomerDetails />}
          />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="orders/:orderPerPage/" element={<CustomerOrders />} />
          <Route path="administer-orders" element={<AdministerOrders />} />
          <Route
            path="administer-orders/:administerOrders"
            element={<AdministerOrders />}
          />
          <Route path="orders/:orderPerPage/" element={<CustomerOrders />} />
          <Route
            path="/admin/orderDetail/:orderId"
            element={<SingleOrderDetail />}
          />

          {/* *************************   KYC pages    ****************************** */}
          <Route path="verified" element={<Verified />} />
          <Route path="verified/:verifiedPerPage/" element={<Verified />} />

          <Route path="non-verified" element={<NonVerified />} />
          <Route
            path="non-verified/:nonVerifiedPerPage/"
            element={<NonVerified />}
          />

          <Route path="pending" element={<Pending />} />
          <Route path="pending/:pendingPerPage" element={<Pending />} />

          <Route path="added-products" element={<AddedProducts />} />
          <Route path="userDetails/:walletAddress" element={<UserDetails />} />

          {/*************************** Product  ***************************/}
          <Route path="products" element={<AllProduct />} />
          <Route path="banners" element={<AllBanners />} />
          <Route path="banners/:bannerPerPage" element={<AllBanners />} />
          <Route path="create-banner" element={<CreateBanner />} />

          <Route path="featuredProducts" element={<FeturedProducts />} />
          <Route
            path="featuredProducts/:feturedPerPage"
            element={<FeturedProducts />}
          />

          <Route path="products/:productPerPage" element={<AllProduct />} />

          <Route path="create-product" element={<CreateProduct />} />
          <Route path="/admin/editProduct/:id" element={<UpdateProduct />} />
          <Route
            path="/admin/editUnverifiedProduct/:id"
            element={<UpdateUnverifiedProduct />}
          />

          {/*************************** Category  ***************************/}
          <Route path="all-category" element={<AllCategory />} />
          <Route
            path="all-category/:categoryPerPage"
            element={<AllCategory />}
          />
          <Route path="add-category" element={<AddCategory />} />

          <Route path="all-subscribers" element={<Subscribers />} />
          <Route
            path="all-subscribers/:emailPerPage"
            element={<Subscribers />}
          />

          <Route path="data" element={<Data />} />
          <Route path="help-desk-dashboard" element={<HelpDeskDashborad />} />
          <Route
            path="customer-services-dashboard"
            element={<CustomerServicesDashboard />}
          />
        </Route>
        {/*************************** Dashboard End************************** */}
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="*" element={<Error404 />} />
        {/* <AuthContext.Provider
        value={{
          token,
          userId,
          tokenExpiration,
          login,
          logout,
        }}
      > */}
        {/* <CartContext.Provider
          value={{
            cartItems,
            addItemToCart,
            removeItemFromCart,
          }}
        > */}
        {/* </CartContext.Provider> */}
        {/* </AuthContext.Provider> */}
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
