import React from "react";
import PageTitle from "../../Components/Common/PageTitle";
import AddProductArea from "../../Components/Products/AddProductArea";

function AddProduct() {
  return (
    <div className="add-product-wrapper">
      <PageTitle title="Add Product" />
      <AddProductArea />
    </div>
  );
}

export default AddProduct;
