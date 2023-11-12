import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./QuickView.css";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { CartContext } from "../../contexts/cart-context";
import Rating from "@mui/material/Rating";
import { color } from "@mui/system";
import swal from "sweetalert";



function QuickView({ isOpen, closeModal, product, averageRatings }) {
  console.log(averageRatings, "Average ratings in quick view");
  const [quantity, setQuantity] = useState(1);
  const [available, setAvailable] = useState("");
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { addItemToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(true)


  useEffect(() => {
    setQuantity(1);
    setAvailable(product?.availableProduct);
  }, [product?.availableProduct]);
  // console.log(available)
  const addToCart = (product) => {
    addItemToCart(product, quantity, "/cart");
  };

  return (
    <div>
      <Modal dialogClassName="product_modal" show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="align-items-center">
              <Col xs={12} md={6}>
                <div className="shop-products-image text-center">
                  <Link to={`/shop/products-details/${product?._id}`}>
                    {product?.images?.slice(0, 1)?.map((img) => (
                      <img src={img} style={{ width: "300px" }} alt="" />
                    ))}
                  </Link>
                  <div className="tag">{product.productName}</div>
                </div>
              </Col>
              <Col xs={6} md={6}>
                <Modal.Title className="text-white">
                  {product.productName}
                </Modal.Title>

                {/* <div className="product-review">
                  <div className="rating">
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                  </div>
                </div> */}

                <Rating
                  sx={{ "& .MuiRating-iconEmpty": { color: "white" } }}
                  name="read-only"
                  value={product?.reviews?.length > 0 ? averageRatings : 5}
                  readOnly
                />

                {product?.offeringProduct > 0 && (
                  <div>
                    <p className="mb-1">
                      Enjoy {product?.offeringProduct}% discount
                    </p>
                  </div>
                )}

                {/* <div className="price">
                  <span className="new-price">${product.price}</span>
                </div> */}

                <div className="price">
                  <span
                    className={`${product?.offeringProduct > 0 ? "old-price" : ""
                      }`}
                  >
                    ${product?.price}
                  </span>
                  {product?.offeringProduct > 0 && (
                    <span className="new-price">
                      $
                      {product?.price -
                        (product?.price * product?.offeringProduct) / 100}
                    </span>
                  )}
                </div>
                <div>
                  {show === true ?

                    <div
                      dangerouslySetInnerHTML={{ __html: product?.description?.slice(0, 150) }}
                    >
                    </div>
                    :
                    <div
                      dangerouslySetInnerHTML={{ __html: product?.description }}
                    >
                    </div>
                  }

                  {product?.description?.length > 150 && <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => { setShow(!show) }}
                  >
                    {show === true ? "Read more ▼"
                      :
                      "Read less ▲"
                    }
                  </span>}

                  {/* <ReactReadMoreReadLess
                    charLimit={20}
                    readMoreText={"Read more ▼"}
                    readLessText={"Read less ▲"}
                  >

                  </ReactReadMoreReadLess> */}
                  {/* {parse(product?.description)} */}
                </div>

                <ul className="products-info">
                  <li className="text-white">
                    <span className="text-white">Availability:</span>{" "}
                    {product.availableProduct > 0
                      ? `In stock (${product.availableProduct})`
                      : "Stock out"}
                  </li>
                </ul>

                <div className="product-quantities">
                  <span className="text-white">Quantities:</span>

                  <div className="input-counter">
                    <button
                      className="minus-btn"
                      onClick={() =>
                        available !== 0 &&
                        quantity > 1 &&
                        setQuantity(quantity - 1)
                      }
                    >
                      <i className="bx bx-minus"></i>
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      // onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      readOnly
                      max={product.availableProduct}
                    />
                    <button
                      className="plus-btn"
                      onClick={() =>
                        available !== 0 &&
                        available > quantity &&
                        setQuantity(quantity + 1)
                      }
                    >
                      <i className="bx bx-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="product-add-to-cart">
                  {user?.walletAddress ? (
                    <button
                      type="submit"
                      className="default-btn"
                      disabled={quantity === 0 && true}
                      onClick={() => addToCart(product)}
                    >
                      <i className="flaticon-shopping-cart"></i>
                      Add to cart
                      <span></span>
                    </button>
                  ) : (
                    <button
                      onClick={() => openWalletModal()}
                      className="default-btn"
                    >
                      <i className="flaticon-shopping-cart"></i> Add to cart
                      <span></span>
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </div>
  );
}

export default QuickView;
