import PageTitle from "../../Components/Common/PageTitle";
import WishListArea from "../../Components/Shop/WishListArea";

function WishList() {
  return (
    <div className="wishlist-wrapper">
      <PageTitle title="Wishlist" />
      <WishListArea />
    </div>
  );
}

export default WishList;
