import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { forwardRef, useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="top" ref={ref} {...props} />;
});

const WalletModal = () => {
  const {
    connectToMetamask,
    walletModal,
    openCoinbaseModal,
    closeWalletModal,
  } = useContext(DSLCommerceContext);

  return (
    // <div className='dialogDiv'>
    //   <Dialog
    //     open={walletModal}
    //     TransitionComponent={Transition}
    //     keepMounted
    //     onClose={closeWalletModal}
    //     aria-describedby="alert-dialog-slide-description"
    //     className='dialog'
    //   >
    //     <div className="dialogWallet pt-4">

    //       <DialogContent className='alertWalletDiv'>

    //         <DialogContentText id="alert-dialog-slide-description">
    //           {/* <div className="">
    //             <p className=' contents  mt-1 text-center' style={{ fontSize: 14 }}>Please note:</p>
    //             <p className='contents text-center mb-0' style={{ fontSize: 14 }}>1. Login to Metamask before clicking the metamask icon below.</p>
    //             <p className='contents text-center mb-0' style={{ fontSize: 14 }}>2. Click again if you are not connected.</p>
    //           </div> */}

    //           <Row xs={1} md={1} className="g-2">
    //             <Col>
    //               <Card className='walletDiv walletModal_icon' onClick={connectToMetamask} >
    //                 <Card.Img variant="top" src="https://i.ibb.co/vVf533V/1.png" className="imgWallet" />
    //                 <Card.Body>
    //                   <Card.Title className='walletName'>Metamask</Card.Title>
    //                   <button className='px-4 py-1  ' style={{backgroundColor:'orange', fontSize:'18px',border:'none',borderRadius:'8px'}}>Click here to login</button>
    //                 </Card.Body>
    //               </Card>
    //             </Col>
    //           </Row>
    //           <div className="contentDiv">
    //             <p className='contents'>You can use Binance Chain to connect.</p>
    //             <p className='contents'>Add Binance Chain in your Metamask as follows.</p>
    //             <p className='contents px-2'><a className='contents1' href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain" target="_any" >https://academy.binance.com/en/articles
    //               /connecting-metamask-to-binance-smart-chain</a></p>
    //           </div>
    //           <p className='text-center mt-4'>
    //             <Button onClick={() => closeWalletModal()} className="text-white fs-6 bg-danger">Cancel</Button>
    //           </p>
    //           {/* <p className='contents wallet-texts'><span
    //             className='text-decoration-underline text-primary click-here'
    //             onClick={() => { openCoinbaseModal(); closeWalletModal() }}
    //           >Click here</span> for other wallet logins.</p> */}
    //         </DialogContentText>
    //       </DialogContent>
    //     </div>
    //   </Dialog>
    // </div>
    <div className="dialogDiv">
      <Dialog
        open={walletModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeWalletModal}
        aria-describedby="alert-dialog-slide-description"
        className="dialog"
      >
        <div className="dialogWallet pt-4">
          <DialogContent
            sx={{ padding: "20px 12px !important" }}
            className="alertWalletDiv"
          >
            <DialogContentText id="alert-dialog-slide-description">
              {/* <div className="">
                <p className=' contents  mt-1 text-center' style={{ fontSize: 14 }}>Please note:</p>
                <p className='contents text-center mb-0' style={{ fontSize: 14 }}>1. Login to Metamask before clicking the metamask icon below.</p>
                <p className='contents text-center mb-0' style={{ fontSize: 14 }}>2. Click again if you are not connected.</p>
              </div> */}

              <Row xs={1} md={1} className="g-2 mx-0">
                <Col>
                  <Card className="walletDiv walletModal_icon">
                    <Card.Img
                      variant="top"
                      src="https://i.ibb.co/vVf533V/1.png"
                      className="imgWallet"
                    />
                    <Card.Body style={{ paddingBottom: '0' }} >
                      <Card.Title className="walletName">Metamask</Card.Title>

                      <div className="mx-auto w-auto d-flex justify-content-center align-items-center mb-3 mt-0 mt-sm-0 mt-md-2 ">
                        <button
                          className="border-0 text-light rounded pb-3 pt-3 px-3 btn-wallet-modal animated-button"
                          onClick={() => connectToMetamask()}
                        >
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <img
                            src="https://i.ibb.co/CBj8VVQ/af0137fd-42ad-4ca5-9e6c-3e8595fa77e2.jpg"
                            className="imgWalletBtn me-2"
                            alt="logo"
                          />
                          Click here to Login
                        </button>
                      </div>

                      {/* <button
                        className="border-0 text-light rounded pt-1 pb-1"
                        style={{ backgroundColor: "#ff6c09" }}
                        onClick={() => connectToMetamask()}
                      >
                        Click here to Login
                      </button> */}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <div className="contentDiv w-100">
                <p className="contents">
                  You can use Binance Chain to connect.
                </p>
                <p className="contents">
                  Add Binance Chain in your Metamask as follows.
                </p>
                <p className="contents px-2">
                  <a
                    className="contents1"
                    style={{ color: "#8484f8" }}
                    href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain"
                    target="_any"
                  >
                    https://academy.binance.com/ en/articles
                    /connecting-metamask-to-binance-smart-chain
                  </a>
                </p>
              </div>
              <p className="text-center mt-4">
                <Button
                  onClick={closeWalletModal}
                  className="text-white fs-6 bg-danger"
                >
                  Cancel
                </Button>
              </p>
              {/* <p className='contents wallet-texts'><span
                className='text-decoration-underline text-primary click-here'
                onClick={() => { openCoinbaseModal(); closeWalletModal() }}
              >Click here</span> for other wallet logins.</p> */}
            </DialogContentText>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default WalletModal;
