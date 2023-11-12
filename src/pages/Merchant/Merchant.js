import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PageTitle from '../../Components/Common/PageTitle'
import React, { useEffect, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Merchant = () => {

  const navigate = useNavigate();
  const [getCategory, setGetCategory] = useState([])

  const [firstValue, setFirstValue] = useState(() => EditorState.createEmpty());
  const description = draftToHtml(convertToRaw(firstValue.getCurrentContent()));

  const [selectedImage, setSelectedImage] = useState()
  const [image, setImage] = useState();

  var time = new Date().getTime();
  var date = new Date(time);
  var createdAt = date

  useEffect(() => {
    fetch('https://backend.dslcommerce.com/api/category/')
      .then(res => res.json())
      .then(data => setGetCategory(data))
  }, [])


  useEffect(() => {
    if (!selectedImage) {
      setImage("https://i.ibb.co/Pwt1fRw/9ee03415-e591-4320-bf25-af881b8c27a6.jpg")
      return
    }

    const objectUrl = URL.createObjectURL(selectedImage)
    setImage(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedImage])

  const changePhoto = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedImage(e.target.files[0])
  }


  const onSubmitForm = async (e) => {
    e.preventDefault();

    const productName = e.target.productName.value;
    const img = e.target.img.files[0];
    const category = e.target.category.value;
    const brand = e.target.brand.value;
    const color = e.target.color.value;
    const type = e.target.type.value;
    const price = e.target.price.value;
    const offeringProduct = e.target.offeringProduct.value;
    const availableProduct = e.target.availableProduct.value;


    // const productData = { productName,img , category,brand,price,color,type,offeringProduct,availableProduct, createdAt, description}
    // console.log(productData)

    const formData = new FormData()
    formData.append('productName', productName)
    formData.append('img', img)
    formData.append('category', category)
    formData.append('brand', brand)
    formData.append('color', color)
    formData.append('type', type)
    formData.append('price', price)
    formData.append('offeringProduct', offeringProduct)
    formData.append('availableProduct', availableProduct)
    formData.append('createdAt', createdAt)
    formData.append('description', description)

    // console.log(formData)
    await axios.post('https://backend.dslcommerce.com/api/product/', formData)
      .then(res => {
        if (res.status === 200) {
          swal({
            // title: "Success",
            text: `${res.data.message}`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success swal-text swal-footer",
          });
          e.target.reset();
          window.scrollTo(0, 0);
          navigate("/shop");
        }
      })
      .catch(error => {
        swal({
          title: "Attention",
          text: `Something went wrong.Try again`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success swal-text swal-footer",
        });
      });
  }

  const cancel = () => {
    navigate("/");
    window.scrollTo(0, 0);
  }


  return (
    <div className="" >
      <PageTitle title="Merchant" />
      <div>
        <Container className=''>
          <div className='row'>
            <div className="col-12 col-lg-8">

              <div className="d-flex justify-content-between mt-2">
                <div className="">
                  <h4 className=' text-uppercase text-start py-5 '> create product </h4>
                  <div>
                    <form id="contactForm" className="form" onSubmit={onSubmitForm}>
                      <div className="row">

                        <div className="mb-3 ms-1">

                          <img src={image} width={200} height={200} className='d-flex justify-content-center' alt="" />
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group ">
                            <p className='mb-1 '>Product Image</p>
                            <input
                              onChange={changePhoto}
                              type="file"
                              name="img"
                              accept='image/*'
                              className="form-control bg-transparent"
                              required
                            />
                          </div>
                        </div>


                        <div className="col-lg-12 col-md-12">
                          <div className="form-group ">
                            <p className='mb-1  '>Product Name</p>
                            <input
                              type="text"
                              name="productName"
                              className="form-control bg-transparent  "
                              required
                              placeholder="Product Name"
                            />
                          </div>
                        </div>


                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <p className='mb-1  '>Category</p>
                            <select
                              className="form-control list bg-transparent "
                              style={{ cursor: 'pointer' }}
                              name="category"
                              required
                            >
                              {getCategory.map(category => (
                                <option value={category?._id}>{category?.name}</option>
                              ))}
                            </select>

                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <p className='mb-1  '>Brand </p>
                            <input
                              type="text"
                              name="brand"
                              className="form-control bg-transparent "
                              required
                              placeholder='Brand'
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <p className='mb-1  '>Color </p>
                            <input
                              type="text"
                              name="color"
                              className="form-control bg-transparent  "
                              required
                              placeholder='Color'
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <p className='mb-1  '>Product Type </p>
                            <select
                              className="form-control list bg-transparent "
                              style={{ cursor: 'pointer' }}
                              name="type"
                            >
                              <option>Product Type </option>
                              <option value="cameras">Cameras</option>
                              <option value="electronics">Electronics</option>
                              <option value="audio">Audio</option>
                              <option value="computers">Computers</option>
                              <option value="accessories">Accessories</option>
                              <option value="laptop">Laptop</option>
                              <option value="tv">Tv</option>
                              <option value="tablet">Tablet</option>
                              <option value="watches">Watches</option>
                              <option value="mobile">Mobile</option>
                              <option value="headphone">Headphone</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <p className='mb-1  '>Price </p>
                            <input
                              type="number"
                              name="price"
                              className="form-control bg-transparent  "
                              required
                              placeholder='Product Price'
                              min={1}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <p className='mb-1  '>Offering Product </p>
                            <input
                              type="number"
                              name="offeringProduct"
                              className="form-control bg-transparent  "
                              required
                              placeholder='Offering Product '
                              min={0}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <p className='mb-1  '> Available Product</p>
                            <input
                              type="number"
                              name="availableProduct"
                              className="form-control bg-transparent  "
                              required
                              placeholder='Available Product'
                              min={1}
                            />
                          </div>
                        </div>

                        {/* Editor  */}
                        <div className="col-lg-12 col-md-12">
                          <p className='mb-1  '>Product Description </p>
                          <Editor
                            editorState={firstValue}
                            onEditorStateChange={setFirstValue}
                            required={true}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class border mt-2 p-2 bg-transparent "
                            toolbarClassName="toolbar-class text-black"
                            toolbar={{
                              image: {
                                urlEnabled: true,
                                uploadEnabled: true,
                                alignmentEnabled: true,
                                uploadCallback: undefined,
                                previewImage: true,
                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                alt: { present: false, mandatory: false },
                                defaultSize: {
                                  height: 'auto',
                                  width: 'auto',
                                },
                                fontSize: {
                                  options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                                  className: undefined,
                                  component: undefined,
                                  dropdownClassName: undefined,
                                },
                                fontFamily: {
                                  options: ['Arial', 'sans-serif', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                                  className: undefined,
                                  component: undefined,
                                  dropdownClassName: undefined,
                                },
                              },
                            }}
                          />
                        </div>

                        <div className='d-flex justify-content-center align-items-center gap-3 mt-3 '>

                          <div className="send-btn">
                            <button type="submit" className="default-btn text-uppercase" style={{ cursor: 'pointer' }}>
                              Add Product
                              <span></span>
                            </button>
                          </div>

                          <div className="send-btn">
                            <button type="submit" onClick={cancel} className="default-btn text-uppercase" style={{ cursor: 'pointer', background: 'red' }}>
                              Cancel
                              <span></span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Merchant