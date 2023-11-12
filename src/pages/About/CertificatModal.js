import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import certificate from './certificate.jpg'
import Preloader from '../../Components/Common/Preloader'
import "./certificatModal.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // maxWidth: '50%',
  bgcolor: 'black',
  border: '2px solid white',
  boxShadow: 24,
  color: "white",
  borderRadius: '5px',

};

export default function CertificatModal({ open, setOpen }) {

  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(true)
  const hendelSubmit = (e) => {
    console.log(e.terget.value)
  }
  const ShowLoading = () => setLoading(false)
  const sourcelink = certificate;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='certificatModal modalwidth ' id="certificatModal" sx={style} >
          <img loading='lazy' onLoad={ShowLoading} src={sourcelink} alt="Certificate" className="p-2" style={{ width: "100%", height: "100%" }} />
          {loading && <Preloader />}
        </Box>
      </Modal>
    </div>
  );
}

    //https://i.ibb.co/jzMZFFW/dslcerti.jpg
    //https://i.ibb.co/G0bxDBj/Whats-App-Image-2022-07-06-at-9-23-46-PM.jpg
    // {certificate?<img loading='lazy' src={certificate} alt="Certificate" className="p-2" style={{width:"100%", height:"100%" }} />:<p>Loading</p>}