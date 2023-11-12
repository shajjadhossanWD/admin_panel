import React, { useState } from 'react';
import toast from "react-hot-toast";
import swal from 'sweetalert';
import axios from "axios";


const AddCategory = () => {
  const [productsImage, setProductsImage] = useState('');
  const [productsName, setProductsName] = useState('');
  const [productsPrice, setProductsPrice] = useState('');
  const [availableProducts, setAvailableProducts] = useState('');
  const [category, setCategory] = useState('');
  const [productsColor, setProductsColor] = useState('');
  const [productsBrand, setProductsBrand] = useState('');
  const [productsDescription, setProductsDescription] = useState('');
  const [offeringProducts, setOfferingProducts] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productsImage,productsName,productsPrice,availableProducts,category,productsColor,productsBrand,productsDescription,offeringProducts);
    toast.success(` Your data submitted successfully `, { id: 'success' })


    // try {
    //   let url = ''
    //   const res = await axios.post(url, { productsImage,productsName,productsPrice,availableProducts,category,productsColor,productsBrand,productsDescription,offeringProducts })
    //   console.log(res.data);
    //   toast.success(` Your data submitted successfully `, { id: 'success' })

    //   if (res.status === 200) {
    //     // alert(res.data.message);
    //     swal({
    //       title: "Success",
    //       text: `${res.data.message}`,
    //       icon: "success",
    //       button: "OK!",
    //       className: "modal_class_success",
    //     });
    //   }
    // } catch (error) {
    //   console.log(error.message);
    //   toast.error(`Something went wrong `, { id: "errorSend" });

    // }

  };


  return (
    <>
    <div className='d-flex justify-content-center align-items-center mb-5'>
      <h2 className='text-white'>Crete new category here</h2>
    </div>
    <div className="container">
    <div className="add-category-form">
          <form id="contactForm" className="form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12 col-md-126">
                <div className="form-group">
                  <input
                    type="file"
                    accept="image/*"
                    name="ProductsImage"
                    id="ProductsImage"
                    className="form-control"
                    required
                    data-error="Please enter Products Image"
                    placeholder="Products Image"
                    value={productsImage}
                    onChange={(e) => setProductsImage(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <input
                    type="text"
                    name="ProductsName"
                    id="ProductsName"
                    className="form-control"
                    required
                    data-error="Please enter Products Name"
                    placeholder="Products Name"
                    value={productsName}
                    onChange={(e) => setProductsName(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <input
                    type="number"
                    name="ProductsPrice"
                    id="ProductsPrice"
                    className="form-control"
                    required
                    data-error="Please enter Products Price"
                    placeholder="Products Price"
                    value={productsPrice}
                    onChange={(e) => setProductsPrice(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                <input
                    type="number"
                    name="AvailableProducts"
                    id="AvailableProducts"
                    className="form-control"
                    required
                    data-error="Please enter Available Products"
                    placeholder="Available Products"
                    value={availableProducts}
                    onChange={(e) => setAvailableProducts(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                <input
                    type="text"
                    name="Category"
                    id="Category"
                    className="form-control"
                    required
                    data-error="Please enter Category "
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                <input
                    type="text"
                    name="ProductsColor"
                    id="ProductsColor"
                    className="form-control"
                    required
                    data-error="Please enter Products Color"
                    placeholder="Products Color"
                    value={productsColor}
                    onChange={(e) => setProductsColor(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                <input
                    type="text"
                    name="ProductsBrand"
                    id="ProductsBrand"
                    className="form-control"
                    required
                    data-error="Please enter Products Brand"
                    placeholder="Products Brand"
                    value={productsBrand}
                    onChange={(e) => setProductsBrand(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                <input
                    type="text"
                    name="ProductsDescription"
                    id="ProductsDescription"
                    className="form-control"
                    required
                    data-error="Please enter Products Description"
                    placeholder="Products Description"
                    value={productsDescription}
                    onChange={(e) => setProductsDescription(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                <input
                    type="number"
                    name="OfferingProducts"
                    id="OfferingProducts"
                    className="form-control"
                    required
                    data-error="Please enter Offering Products (%)"
                    placeholder="Offering Products (%)"
                    value={offeringProducts}
                    onChange={(e) => setOfferingProducts(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="send-btn">
                  <button type="submit" className="default-btn" style={{ cursor: 'pointer' }}>
                    Create Category
                    <span></span>
                  </button>
                </div>
                <div id="CreateCategory" className="h3 text-center hidden"></div>
                <div className="clearfix"></div>
              </div>
            </div>
          </form>
        </div>
    </div>
    </>
    

    
  );
};

export default AddCategory;