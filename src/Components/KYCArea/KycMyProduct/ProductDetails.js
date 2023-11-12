import React from 'react'
import Modal from 'react-bootstrap/Modal';
import './ProductDetails.css'

const ProductDetails = (props) => {
  const { myProduct, getCategory } = props;

  // console.log(myProduct)

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 9999, paddingLeft: "0px" }}
    >
      <Modal.Header closeButton >

      </Modal.Header>
      <Modal.Body>
        {/***************************** Design ********************************************* */}
        {myProduct?.images?.slice(0, 1)?.map((img) => (
          <div className='mb-3' style={{ maxWidth: '200px' }}>
            <img src={img} alt={myProduct?.productName} />
          </div>
        ))}

        <p> Name : {myProduct?.productName}</p>
        <p> Price : ${myProduct?.price}</p>
        <p> Color : {myProduct?.color}</p>
        <p> Type : {
          getCategory?.find((cat) => cat?._id === myProduct?.category)
            ?.name
        }</p>
        <p> Available  : {myProduct?.availableProduct}</p>
        <p> Offering Product : {myProduct?.offeringProduct}</p>
        <p> Total Reviews : {myProduct?.reviews?.length}</p>
        <p> Status : {myProduct?.status === false ?
          (<>Pending</>)
          :
          (<>Approved</>)
        }</p>

      </Modal.Body>

    </Modal>
  );
}

export default ProductDetails