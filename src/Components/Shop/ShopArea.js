import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Preloader from "../Common/Preloader";
import Pagination from "../Pagination/Pagination";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { WishlistContext } from "../../contexts/wishlist-context";
import EachProductCard from "../Common/EachProductCard/EachProductCard";

function ShopArea({
  addToCart,
  showQuickView,
  page = 1,
  query = undefined,
  keyword = undefined,
}) {
  const [categoryWiseProduct, setCategoryWiseProduct] = useState([]);
  const navigate = useNavigate();
  const [allProduct, setAllProduct] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);

  //*******************SLICE PRODUCT AND SHOW PER PAGE ONLY
  const [sliceProducts, setSliceProducts] = useState([]);
  const [sortP, setSortP] = useState("default");

  const [isLoading, setisLoading] = useState(true);

  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { addProductToWishlist } = useContext(WishlistContext);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
    window.scrollTo(0, 0);
  }, []);

  //************************************** FILTERING PRODUCT **************************************
  useEffect(() => {
    if (keyword && !query) {
      if (keyword === "all") {
        setCategoryWiseProduct(allProduct);
      } else {
        const filterByCategory = allProduct.filter(
          (product) => keyword == product.category
        );
        setCategoryWiseProduct(filterByCategory);
      }
    } else if (query) {
      const filterByCategory = allProduct.filter((product) => {
        const catKey = keyword == "all" ? true : product.category == keyword;

        const search = product.productName
          .toLowerCase()
          ?.includes(query.toLowerCase());

        return catKey && search;
      });
      setSearchProducts(filterByCategory);
      setCategoryWiseProduct(filterByCategory);
    } else {
      setCategoryWiseProduct(allProduct);
    }
  }, [keyword, allProduct, query]);

  useEffect(() => {
    fetch(`https://backend.dslcommerce.com/api/product/`)
      .then((res) => res.json())
      .then((result) => {
        setAllProduct(result);
      });
  }, []);

  //*************************************** Sort Handle **************************************
  const sortHandle = (e) => {
    const method = e?.target?.value || e;
    setSortP(method);
    console.log(method);

    // if (method == 'low') {
    //   axios.get(`https://backend.dslcommerce.com/api/product/filter1/`)
    //     .then(res => setCategoryWiseProduct(res.data))
    //   console.log('first')
    //   return;
    // }
    // else if (method == 'high') {
    //   axios.get(`https://backend.dslcommerce.com/api/product/filter/`)
    //     .then(res => {
    //       const arraySort = query ? searchProducts : res.data;
    //       const filterH = arraySort.sort((a, b) => {
    //         return Number(b.price) - Number(a.price);
    //       });
    //       setCategoryWiseProduct([...filterH])
    //     })
    //   return;
    // }
    // else {
    //   axios.get(`https://backend.dslcommerce.com/api/product/`)
    //     .then(res => setCategoryWiseProduct(res.data))
    //   return;
    // }
    // const arraySort = query ? searchProducts : allProduct;
    const arraySort =
      !query && keyword
        ? categoryWiseProduct
        : query
          ? searchProducts
          : allProduct;
    switch (method) {
      case "default":
        // console.log(defaultProduct);
        fetch(`https://backend.dslcommerce.com/api/product/`)
          .then((res) => res.json())
          .then((result) => {
            if (keyword && !query) {
              if (keyword === "all") {
                setCategoryWiseProduct(result);
              } else {
                const filterByCategory = result.filter(
                  (product) => keyword == product.category
                );
                setCategoryWiseProduct(filterByCategory);
              }
            } else if (query) {
              const filterByCategory = result.filter((product) => {
                const catKey =
                  keyword == "all" ? true : product.category == keyword;

                const search = product.productName
                  .toLowerCase()
                  ?.includes(query.toLowerCase());

                return catKey && search;
              });
              setSearchProducts(filterByCategory);
              setCategoryWiseProduct(filterByCategory);
            } else {
              setCategoryWiseProduct(result);
            }
          });
        // console.log(allProduct)
        break;
      case "low":
        const filter = arraySort.sort((a, b) => {
          const discountForA = (a?.price * a?.offeringProduct) / 100;
          const discountForB = (b?.price * b?.offeringProduct) / 100;

          return (
            Number(a.price - discountForA) - Number(b.price - discountForB)
          );
        });
        setCategoryWiseProduct([...filter]);
        break;
      case "high":
        const filterH = arraySort.sort((a, b) => {
          const discountForA = (a?.price * a?.offeringProduct) / 100;
          const discountForB = (b?.price * b?.offeringProduct) / 100;

          return (
            Number(b.price - discountForB) - Number(a.price - discountForA)
          );
        });
        setCategoryWiseProduct([...filterH]);
        break;
      default:
        break;
    }
  };

  //************************************** Pagination **************************************
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(20);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    if (page) {
      setPage(Number(page));
    } else {
      setPage(1);
    }
  }, [page]);

  useEffect(() => {
    const lastPage = Math.ceil(categoryWiseProduct?.length / show);
    setLastPage(lastPage);
  }, [categoryWiseProduct, show]);

  const [locationState, setLocation] = useState("");
  const locationGet = window.location.pathname.split("/");

  let key = locationGet.length;
  useEffect(() => {
    if (key == 8) {
      const getWithoutPageCat = locationGet.slice(0, -2).join("/");
      setLocation(getWithoutPageCat + "/");
    }
    if (key == 7) {
      const getWithoutPageCat = locationGet.slice(0, -1).join("/");
      setLocation(getWithoutPageCat + "/");
    }
    if (key == 7) {
      const getWithoutPageCat = locationGet.slice(0, -1).join("/");
      setLocation(getWithoutPageCat + "/");
    } else if (key == 6) {
      setLocation(locationGet.slice(0, -2).join("/") + "/");
    } else if (key == 5) {
      setLocation(locationGet.slice(0, -1).join("/") + "/");
    } else if (key == 4) {
      setLocation(locationGet.slice(0, -1).join("/") + "/");
    } else if (key == 3) {
      setLocation(locationGet.join("/") + "page/");
    } else if ((key = 2)) {
      setLocation(locationGet.join("/") + "/page/");
    }
  }, [locationGet]);

  useEffect(() => {
    const getSlicingProduct = categoryWiseProduct.slice(
      (page - 1) * show,
      page * show
    );
    setSliceProducts([...getSlicingProduct]);
  }, [categoryWiseProduct, page, show]);

  const pageHandle = (jump) => {
    if (!query && key === 6) {
      navigate(`${locationState}page/${jump}`);
    } else {
      navigate(`${locationState}${jump}`);
    }
    sortHandle(sortP);
    setPage(parseInt(jump));
  };
  // console.log(sliceProducts);
  // 6397267ad851e0e93a8affde
  // 6397267ad851e0e93a8affde

  return (
    <section className="shop-area bg-ffffff pt-50 pb-50">
      <div className="container">
        <div className="products-filter-options container text-center text-lg-left ">
          <div className="row align-items-center">
            <div className="col-lg-9 col-md-9 px-lg-0">
              {/* <p>Total Product {sliceProducts?.length}</p> */}
              <p>Products </p>
            </div>

            <div className="col-lg-3 col-md-3 text-center px-5 px-lg-0">
              <div className="products-ordering-list py-1">
                <select className="form-control" onChange={sortHandle}>
                  <option value="default" className="py-3">
                    Default sorting
                  </option>
                  <option value="low">Sort by price: low to high</option>
                  <option value="high">Sort by price: high to low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {isLoading === true ? (
            <Preloader />
          ) : (
            <>
              {sliceProducts?.length ? (
                <>
                  {console.log(sliceProducts, "Products in")}
                  {sliceProducts.map((eachProduct) => (
                    <EachProductCard
                      eachProduct={eachProduct}
                      addToCart={addToCart}
                      addProductToWishlist={addProductToWishlist}
                      showQuickView={showQuickView}
                    />
                  ))}
                </>
              ) : (
                <div>
                  <h2 className="text-center py-5">No Product Found</h2>
                </div>
              )}
            </>
          )}

          <div className="col-lg-12 col-md-12">
            {sliceProducts?.length ? (
              <>
                <Pagination
                  lastPage={lastPage}
                  page={getPage}
                  pageHandle={pageHandle}
                />
              </>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopArea;
