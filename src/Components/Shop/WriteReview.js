import axios from "axios";
import React, { useContext } from "react";
import { Modal, Container } from "react-bootstrap";
import swal from "sweetalert";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";

const WriteReview = ({
  isOpen,
  closeModal,
  product,
  productId,
  refetch,
  setRefetch,
  fetchProductDetails,
}) => {
  const { user } = useContext(DSLCommerceContext);
  // const [userName,setUserName]=useState([]);
  // useEffect(() => {
  //   // setLoading(true);
  //   axios
  //     .get("https://backend.dslcommerce.com/api/users/0xb83Cb5C3D8b31e2Db1F9496A5E8B547A98058b0d")
  //     .then((res) => {
  //       setUserName(res.data?.result?.name);
  //     })
  //     // .finally(() => setLoading(false));
  // }, []);
  // console.log(userName)

  var newDate = new Date();
  let dd = String(newDate.getDate()).padStart(2, "0");
  let mm = String(newDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = newDate.getFullYear();
  let min = newDate.getMinutes();
  // console.log(product)

  if (min < 10) {
    newDate = dd + "/" + mm + "/" + yyyy;
  } else {
    newDate = dd + "/" + mm + "/" + yyyy;
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const data = {
      name: e.target.userName.value,
      rating: e.target.rating.value,
      message: e.target.message.value,
      date: newDate,
    };

    console.log(data);

    await axios
      .post(
        `https://backend.dslcommerce.com/api/product/review/${productId}`,
        data
      )
      .then((res) => {
        if (res.status === 200) {
          swal({
            // title: "Success",
            text: `Review Added Successfully !`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          e.target.reset();
          setRefetch(!refetch);
          fetchProductDetails();
          closeModal();
        }
      })
      .catch((error) => {
        swal({
          title: "Attention",
          text: `Something went wrong.Try again !`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  return (
    <div>
      <Modal dialogClassName="product_modal" show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container>
            <div className="review-form">
              <h3>Write a Review For : {product.productName} </h3>

              <form onSubmit={onSubmitForm}>
                <div className="row">
                  {/* <div className="form-group">
                    <input
                      type="text"
                      name="walletAddress"
                      value={user.walletAddress}
                      className="form-control"
                      disabled
                    />
                  </div> */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="userName"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      name="rating"
                      required
                      placeholder="Your rating (Out of 5)"
                      className="form-control"
                      min={1}
                      max={5}
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      required
                      minLength={10}
                      cols="30"
                      rows="6"
                      placeholder="Write your comment"
                      className="form-control"
                    ></textarea>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <button type="submit" className="default-btn">
                      Submit Review
                      <span></span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={closeModal}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WriteReview;
