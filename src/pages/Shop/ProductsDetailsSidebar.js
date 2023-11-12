import PageTitle from "../../Components/Common/PageTitle";
import ProductsDetailsSidebarArea from "../../Components/Shop/ProductsDetailsSidebarArea";
import Footer from "../../Components/Layout/Footer/Footer";
import NewArrivals from "../../Components/Common/NewArrivals";

function ProductsDetailsSidebar() {
  return (
    <div className="prod-details-sidebar-wrap">
      <PageTitle title="Products Details Sidebar" />
      <ProductsDetailsSidebarArea />
      <NewArrivals paddingclassName=" pt-50 pb-20" title="Related Products" />
      <Footer />
    </div>
  );
}

export default ProductsDetailsSidebar;
