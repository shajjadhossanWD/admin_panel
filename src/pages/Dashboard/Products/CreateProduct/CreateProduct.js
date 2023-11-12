import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
import swal from "sweetalert";
import "./CreateProduct.css";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [getCategory, setGetCategory] = useState([]);

  const [firstValue, setFirstValue] = useState(() => EditorState.createEmpty());
  const description = draftToHtml(convertToRaw(firstValue.getCurrentContent()));

  const [selectedImage, setSelectedImage] = useState();
  const [imageLoader, setimageLoader] = useState(false);
  const [image, setImage] = useState();

  var time = new Date().getTime();
  var date = new Date(time);
  var createdAt = date;

  useEffect(() => {
    fetch("https://backend.dslcommerce.com/api/category/")
      .then((res) => res.json())
      .then((data) => setGetCategory(data));
  }, []);

  // useEffect(() => {
  //   if (!selectedImage) {
  //     setImage("https://i.ibb.co/Pwt1fRw/9ee03415-e591-4320-bf25-af881b8c27a6.jpg")
  //     return
  //   }

  //   const objectUrl = URL.createObjectURL(selectedImage)
  //   setImage(objectUrl)

  //   // free memory when ever this component is unmounted
  //   return () => URL.revokeObjectURL(objectUrl)
  // }, [selectedImage])

  const changePhoto = async (e) => {
    if (e.target.files[0] !== 0) {
      const newImages = Object.values(e.target.files);
      console.log(newImages);

      const formData = new FormData();
      for (const image of newImages) {
        formData.append("images", image);
      }

      setimageLoader(true);

      await axios
        .post(`https://backend.dslcommerce.com/api/product/upload`, formData)
        .then((res) => {
          console.log("image form data", res.data);
          // setImg(res?.data?.images);
          setSelectedImage(res?.data?.images);
          setimageLoader(false);
        })
        .catch((err) => {
          console.error(err);
          setimageLoader(false);
        });
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const productName = e.target.productName.value;
    const img = e.target.img.files[0];
    const category = e.target.category.value;
    const brand = e.target.brand.value;
    const color = e.target.color.value;
    // const type = e.target.type.value;
    const price = e.target.price.value;
    const offeringProduct = e.target.offeringProduct.value;
    const availableProduct = e.target.availableProduct.value;

    console.log(category);

    // const productData = { productName,img , category,brand,price,color,type,offeringProduct,availableProduct, createdAt, description}
    // console.log(productData)

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("images", selectedImage);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("color", color);
    // formData.append("type", type);
    formData.append("price", price);
    formData.append("offeringProduct", offeringProduct);
    formData.append("availableProduct", availableProduct);
    formData.append("createdAt", createdAt);
    formData.append("description", description);

    const data = {
      addedBy: "Admin",
      status: true,
      productName: productName,
      images: selectedImage,
      brand: brand,
      color: color,
      category: category,
      // type: type,
      price: price,
      offeringProduct: offeringProduct,
      availableProduct: availableProduct,
      createdAt: createdAt,
      description: description,
    };
    console.log(data);
    await axios
      .post("https://backend.dslcommerce.com/api/product/", data)
      .then((res) => {
        if (res.status === 200) {
          // console.log("submited", res);
          swal({
            title: "Successfully product added!",
            // text: `${res.data.message}`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          e.target.reset();
          navigate("/admin/products");
        }
      })
      .catch((error) => {
        console.dir(error);
        swal({
          title: "Attention",
          text: `Something went wrong.Try again`,
          icon: "warning",
          button: "OK!",
          // className: "modal_class_success swal-text swal-footer",
        });
      });
  };

  const handleRemoveImage = (image, index) => {
    const filterdImages = selectedImage.filter((img) => img !== image);

    setSelectedImage(filterdImages);
  };

  const cancel = () => {
    navigate("/admin/products");
  };

  return (
    <div className="container">
      <h4 className="text-white text-uppercase text-start py-2 ">
        {" "}
        create product{" "}
      </h4>
      <div>
        <form id="contactForm" className="form" onSubmit={onSubmitForm}>
          <div className="row">
            <div className="mb-3 ms-1 d-flex">
              {/* {
                <img src={image} width={200} height={200} className='d-flex justify-content-center me-2' alt="" />}
              <img src={image} width={200} height={200} className='d-flex justify-content-center' alt="" /> */}
            </div>

            <>
              {selectedImage?.length > 0 && (
                <div className="selected-video-container">
                  {selectedImage?.map((image, index) => (
                    <div
                      key={index}
                      className="each-selected-video-for-priview"
                    >
                      <div className="each-selected-video-container">
                        <img
                          className="each-selected-image"
                          // src={URL.createObjectURL(image)}
                          src={image}
                          alt=""
                        />
                        <Close
                          className="selected-image-remove-button"
                          fontSize="small"
                          onClick={() => handleRemoveImage(image, index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>

            <div className="col-lg-12 col-md-12">
              <div className="form-group text-white">
                <p className="mb-1 text-white">
                  {imageLoader ? "Uploading Images.." : "Product Image"}
                </p>
                <input
                  onChange={(e) => changePhoto(e)}
                  type="file"
                  name="img"
                  accept=".png,.jpeg,.jpg"
                  multiple
                  className="form-control bg-transparent text-white"
                  required
                />
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="form-group ">
                <p className="mb-1 text-white ">Product Name</p>
                <input
                  type="text"
                  name="productName"
                  className="form-control bg-transparent text-white "
                  required
                  placeholder="Product Name"
                />
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <p className="mb-1 text-white ">Category</p>
                <select
                  className="form-control list bg-transparent category-select"
                  style={{ cursor: "pointer" }}
                  name="category"
                  required
                >
                  {getCategory.map((category) => (
                    <option value={category?._id}>{category?.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <p className="mb-1 text-white ">Brand </p>
                <input
                  type="text"
                  name="brand"
                  className="form-control bg-transparent text-white "
                  required
                  placeholder="Brand"
                />
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <p className="mb-1 text-white ">Color </p>
                <input
                  type="text"
                  name="color"
                  className="form-control bg-transparent text-white "
                  required
                  placeholder="Color"
                />
              </div>
            </div>

            {/* <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <p className="mb-1 text-white ">Product Type </p>
                <select
                  className="form-control list bg-transparent category-select"
                  style={{ cursor: "pointer" }}
                  name="type"
                >
                  {getCategory.map((category) => (
                    <option value={category?.name}>{category?.name}</option>
                  ))}
                </select>
              </div>
            </div> */}

            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <p className="mb-1 text-white ">Price </p>
                <input
                  type="number"
                  name="price"
                  className="form-control bg-transparent text-white "
                  required
                  placeholder="Product Price"
                  min={1}
                />
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <p className="mb-1 text-white ">Offering Product </p>
                <input
                  type="number"
                  name="offeringProduct"
                  className="form-control bg-transparent text-white "
                  required
                  placeholder="Offering Product "
                  min={0}
                />
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <p className="mb-1 text-white "> Available Product</p>
                <input
                  type="number"
                  name="availableProduct"
                  className="form-control bg-transparent text-white "
                  required
                  placeholder="Available Product"
                  min={1}
                />
              </div>
            </div>

            {/* Editor  */}
            <div className="col-lg-12 col-md-12">
              <p className="mb-1 text-white ">Product Description </p>
              <Editor
                editorState={firstValue}
                onEditorStateChange={setFirstValue}
                required={true}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class border mt-2 p-2 bg-transparent text-white"
                toolbarClassName="toolbar-class text-black"
                toolbar={{
                  image: {
                    urlEnabled: true,
                    uploadEnabled: true,
                    alignmentEnabled: true,
                    uploadCallback: undefined,
                    previewImage: true,
                    inputAccept:
                      "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                    alt: { present: false, mandatory: false },
                    defaultSize: {
                      height: "auto",
                      width: "auto",
                    },
                    fontSize: {
                      options: [
                        8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72,
                        96,
                      ],
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                    },
                    fontFamily: {
                      options: [
                        "Arial",
                        "sans-serif",
                        "Georgia",
                        "Impact",
                        "Tahoma",
                        "Times New Roman",
                        "Verdana",
                      ],
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                    },
                  },
                }}
              />
            </div>

            <div className="d-flex justify-content-evenly justify-content-lg-center align-items-center gap-3 mt-3 ">
              <div className="send-btn">
                <button
                  type="submit"
                  className="default-btn w-100 text-uppercase"
                  style={{ cursor: "pointer", width: "100%" }}
                >
                  Save
                  <span></span>
                </button>
              </div>

              <div className="send-btn">
                <button
                  type="submit"
                  onClick={cancel}
                  className="default-btn w-100 text-uppercase"
                  style={{ cursor: "pointer", background: "red" }}
                >
                  Cancel
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
