import React from 'react'

const PayNowMethod = ({ totalPrice }) => {
  return (
    <div className='mt-3 border p-2'>
      <img src="https://i.ibb.co/BrwYNqt/qrPaynow.png" alt="paynow_img" />

      
      <p className='font-weight-semibold my-1' style={{ fontSize: '18px' }}>Scan the QR code and Pay</p>
      <p className='text-primary my-1' >You need to pay {parseFloat(totalPrice)} usd </p>

    </div>
  )
}

export default PayNowMethod