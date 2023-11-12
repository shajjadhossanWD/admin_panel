import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import PageTitle from "../../Components/Common/PageTitle";
import ProductsArea from "../../Components/Products/ProductsArea";
import axios from "axios";
import Footer from "../../Components/Layout/Footer/Footer";

function Products() {
  const [products, setProducts] = useState([]);
  const context = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/products/")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  const editProduct = (
    prod_id,
    prod_name,
    prod_description,
    prod_image,
    prod_type,
    prod_color,
    prod_price,
    prod_instock,
    imagePublicId,
    prod_image_public_id
  ) => {
    const formData = new FormData();
    formData.append("product_id", prod_id);
    formData.append("product_name", prod_name);
    formData.append("product_description", prod_description);

    formData.append("product_type", prod_type);
    formData.append("product_color", prod_color);
    formData.append("product_price", prod_price);
    formData.append("total_in_stock", prod_instock);
    formData.append("image_public_id", prod_image);
    formData.append("upload_preset", "econix");

    axios
      .post("/products/edit-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.message === "Product edited") {
          return axios.get("/products/").then((res) => {
            setProducts(res.data.products);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteProduct = (id) => {
    axios
      .post(`/products/delete-product`, {
        productId: id,
      })
      .then((res) => {
        if (res.data.message === "Successfully Deleted") {
          setProducts(res.data.products);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="products-wrap">
      <PageTitle title="Products" />
      <ProductsArea
        products={products}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />
      <Footer />
    </div>
  );
}

export default Products;
