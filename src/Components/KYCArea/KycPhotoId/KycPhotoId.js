import { Close } from "@mui/icons-material";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { BsStarFill } from "react-icons/bs";
import swal from "sweetalert";
import { DSLCommerceContext } from "../../../contexts/DSLCommerceContext";
import { KycContext } from "../../../contexts/KycContext";

const KycPhotoId = ({ photoIddata }) => {
  const [photoIdType, setPhotoIdType] = useState("photoId");
  const [photoIdNumber, setPhotoIdNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState("");
  const [countryOfIssue, setCountryOfIssue] = useState("");

  // Photo id images
  const [photoIdFrontImg, setPhotoIdFrontImage] = useState("");
  const [photoIdFrontImgForPreview, setPhotoIdFrontImageForPreview] =
    useState("");
  const [photoIdBackImg, setPhotoIdBackImage] = useState("");
  const [photoIdBackImgForPreview, setPhotoIdBackImageForPreview] =
    useState("");

  // Driving license image
  const [
    drivingLicenseFrontImgForPreview,
    setDrivingLicenseFrontImageForPreview,
  ] = useState("");
  const [drivingLicenseFrontImg, setDrivingLicenseFrontImage] = useState("");
  const [
    drivingLicenseBackImgForPreview,
    setDrivingLicenseBackImageForPreview,
  ] = useState("");
  const [drivingLicenseBackImg, setDrivingLicenseBackImage] = useState("");

  // Passport imgs
  const [passportImg, setPassportImg] = useState("");
  const [passportImgForPreview, setPassportImgForPreview] = useState("");

  const [passportImgLoader, setPassportImgLoader] = useState(false);
  const [photoIdFrontLoader, setphotoIdFrontLoader] = useState(false);
  const [photoIdBackLoader, setphotoIdBackLoader] = useState(false);
  const [drivingBackLoader, setdrivingBackLoader] = useState(false);
  const [drivingFrontLoader, setdrivingFrontLoader] = useState(false);

  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const {
    kycUser,
    handleUpdateUser,
    setisVerifiedPhotId,
    isVerifiedPhotId,
    refetch,
    setRefetch,
  } = useContext(KycContext);

  console.log(photoIddata, "photo id data");

  useEffect(() => {
    // {    walletAddress: user?.walletAddress,
    //     photoId: photoIdNumber,
    //     photoIdType: photoIdType,
    //     countryOfIssue: countryOfIssue,
    //     photoIdFrontImg: photoIdFrontImg,
    //     photoIdBackImg: photoIdBackImg,
    //     passportNum: passportNumber,
    //     passportImg: passportImg,
    //     drivingNum: drivingLicenseNumber,
    //     drivingFrontImg: drivingLicenseFrontImg,
    //     drivingBackImg: drivingLicenseBackImg,}

    setPhotoIdFrontImageForPreview(photoIddata?.photoIdFrontImg);
    setPhotoIdBackImageForPreview(photoIddata?.photoIdBackImg);
    setDrivingLicenseFrontImageForPreview(photoIddata?.drivingFrontImg);
    setDrivingLicenseBackImageForPreview(photoIddata?.drivingBackImg);
    setPassportImgForPreview(photoIddata?.passportImg);
  }, [photoIddata]);

  const handlePhotoIdFrontImage = async (e) => {
    const image = e?.target?.files[0];

    const formdata = new FormData();
    formdata.append("file", image);

    setphotoIdFrontLoader(true);
    await axios
      .post(`https://backend.dslcommerce.com/api/photo-id/upload`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setphotoIdFrontLoader(false);
          setPhotoIdFrontImage(res.data.result);
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };
  const handlePhotoIdBackImage = async (e) => {
    const image = e?.target?.files[0];

    const formdata = new FormData();
    formdata.append("file", image);

    setphotoIdBackLoader(true);
    await axios
      .post(`https://backend.dslcommerce.com/api/photo-id/upload`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setphotoIdBackLoader(false);
          setPhotoIdBackImage(res.data.result);
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };
  const handleDrivingFrontImage = async (e) => {
    const image = e?.target?.files[0];

    const formdata = new FormData();
    formdata.append("file", image);

    setdrivingFrontLoader(true);
    await axios
      .post(`https://backend.dslcommerce.com/api/photo-id/upload`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setdrivingFrontLoader(false);
          setDrivingLicenseFrontImage(res.data.result);
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };
  const handleDrivingBackImage = async (e) => {
    const image = e?.target?.files[0];

    const formdata = new FormData();
    formdata.append("file", image);

    setdrivingBackLoader(true);
    await axios
      .post(`https://backend.dslcommerce.com/api/photo-id/upload`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setdrivingBackLoader(false);
          setDrivingLicenseBackImage(res.data.result);
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  const handlePassportImage = async (e) => {
    const image = e?.target?.files[0];

    const formdata = new FormData();
    formdata.append("file", image);

    setPassportImgLoader(true);
    await axios
      .post(`https://backend.dslcommerce.com/api/photo-id/upload`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPassportImgLoader(false);
          setPassportImg(res.data.result);
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const dataObj = {
      walletAddress: user?.walletAddress,
      photoId: photoIdNumber,
      photoIdType: photoIdType,
      countryOfIssue: countryOfIssue,
      photoIdFrontImg: photoIdFrontImg,
      photoIdBackImg: photoIdBackImg,
      passportNum: passportNumber,
      passportImg: passportImg,
      drivingNum: drivingLicenseNumber,
      drivingFrontImg: drivingLicenseFrontImg,
      drivingBackImg: drivingLicenseBackImg,
    };

    await axios
      .post(`https://backend.dslcommerce.com/api/photo-id`, dataObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const updatePhotoIdStatus = async () => {
            const data = {
              isPhotoId: true,
            };

            await axios
              .put(
                `https://backend.dslcommerce.com/api/user-panel/user/update/${kycUser?.walletAddress}`,
                data
              )
              .then((res) => {
                if (res.status === 200) {
                  setRefetch(!refetch);
                  setisVerifiedPhotId(!isVerifiedPhotId);
                  setPassportImg("");
                  setDrivingLicenseBackImage("");
                  setDrivingLicenseFrontImage("");
                  setPhotoIdBackImage("");
                  setPhotoIdFrontImage("");
                  setCountryOfIssue("");
                  setDrivingLicenseNumber("");
                  setPassportNumber("");
                  // setPhotoIdType("")
                  setPhotoIdNumber("");
                  // setRefetch(!refetch);
                  swal({
                    text: "Successfully updated your photo id.",
                    icon: "success",
                    button: "OK!",
                    className: "modal_class_success",
                  });
                }
              })
              .catch((err) => {
                console.log(err, "inside the update erro");
                console.dirxml(err);
                swal({
                  title: "Attention",
                  text: `${err.response.data.message}`,
                  icon: "warning",
                  button: "OK!",
                  className: "modal_class_success",
                });
              });
          };

          updatePhotoIdStatus();
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  const handleRemoveImage = (img) => {
    if (img == "photoIdFrontImage") {
      setPhotoIdFrontImage("");
    } else if (img == "photoIdBackImage") {
      setPhotoIdBackImage("");
    } else if (img == "drivingLicenseFrontImg") {
      setDrivingLicenseFrontImage("");
    } else if (img == "drivingLicenseBackImg") {
      setDrivingLicenseBackImage("");
    } else if (img == "passportImg") {
      setPassportImg("");
    }
  };

  // useEffect(() => {}, []);

  return (
    <div className="">
      <div
        className="mt-3"
        style={{
          background: "#fff",
          padding: "10px 20px",
          borderRadius: "3px",
        }}
      >
        <p className="text-danger">
          Note: If you change your ID with photo, your account will be
          downgraded till our admin approves it.
        </p>
      </div>
      <p className="pt-4">File size should not be more than 5 MB.</p>
      <p>
        Please upload a clear copy of your Government issued ID card, passport
        or driving licence.
      </p>
      <p className="fs-5 fw-bold">Do not upload your selfies here.</p>
      <Form onSubmit={(e) => onSubmit(e)} className="default-width-container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {photoIdType === "photoId" && (
            <>
              <Form.Label className="text-uppercase">
                Photo ID Number{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                defaultValue={photoIddata?.photoId}
                name="photoIdNumber"
                type="text"
                placeholder="Photo ID Number"
                required
                onChange={(e) => setPhotoIdNumber(e.target.value)}
              />
            </>
          )}
          {photoIdType === "passport" && (
            <>
              <Form.Label className="text-uppercase">
                Passport Number{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                defaultValue={photoIddata?.passportNum}
                name="passportNumber"
                type="text"
                placeholder="Passport Number"
                required
                onChange={(e) => setPassportNumber(e.target.value)}
              />
            </>
          )}
          {photoIdType === "drivingLicense" && (
            <>
              <Form.Label className="text-uppercase">
                Driving license Number{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                defaultValue={photoIddata?.drivingNum}
                name="drivingLicenseNumber"
                type="text"
                placeholder="Driving license Number"
                required
                onChange={(e) => setDrivingLicenseNumber(e.target.value)}
              />
            </>
          )}

          <Form.Label className="text-uppercase mt-4">
            Type of photo id{" "}
            <BsStarFill
              size={8}
              style={{ color: "#FF0000", marginTop: "-10px" }}
            />
          </Form.Label>

          <Form.Select
            onChange={(e) => setPhotoIdType(e.target.value)}
            aria-label="Default select example"
          >
            <option
              value="photoId"
              selected={photoIddata?.photoIdType == "photoId" && true}
            >
              Photo ID
            </option>
            <option
              value="passport"
              selected={photoIddata?.photoIdType == "passport" && true}
            >
              Passport
            </option>
            <option
              value="drivingLicense"
              selected={photoIddata?.photoIdType == "drivingLicense" && true}
            >
              Driving license
            </option>
          </Form.Select>

          <Form.Label className="text-uppercase mt-4">
            Country of issue{" "}
            <BsStarFill
              size={8}
              style={{ color: "#FF0000", marginTop: "-10px" }}
            />
          </Form.Label>
          <Form.Control
            defaultValue={photoIddata?.countryOfIssue}
            name="countryOfIssue"
            required
            type="text"
            placeholder="Country of issue"
            onChange={(e) => setCountryOfIssue(e.target.value)}
          />

          {/* If the photo id type is photo id */}
          {photoIdType === "photoId" && (
            <>
              <>
                {photoIdFrontImg && (
                  <div className="selected-video-container mt-4">
                    {/* {selectedImage?.map((image, index) => ( */}
                    <div
                      // key={index}
                      className="each-selected-video-for-priview"
                    >
                      <div className="each-selected-video-container">
                        <img
                          className="each-selected-image imageWidth"
                          // src={URL.createObjectURL(image)}
                          src={photoIdFrontImg}
                          alt=""
                        />
                        <Close
                          className="selected-image-remove-button"
                          fontSize="small"
                          onClick={() => handleRemoveImage("photoIdFrontImage")}
                        />
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                )}
                {photoIdFrontImgForPreview && !photoIdFrontImg && (
                  <div>
                    <img
                      src={photoIdFrontImgForPreview}
                      style={{ maxWidth: "100%", marginTop: "10px" }}
                      alt=""
                    />
                  </div>
                )}
              </>

              <Form.Label className="text-uppercase mt-4">
                {photoIdFrontLoader
                  ? "Uploading image..."
                  : "Photo id front image"}{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="photoIdFrontImg"
                accept=".jpg, .jpeg, .png"
                type="file"
                placeholder=""
                required
                onChange={(e) => handlePhotoIdFrontImage(e)}
              />

              <>
                {photoIdBackImg && (
                  <div className="selected-video-container mt-4">
                    {/* {selectedImage?.map((image, index) => ( */}
                    <div
                      // key={index}
                      className="each-selected-video-for-priview"
                    >
                      <div className="each-selected-video-container">
                        <img
                          className="each-selected-image imageWidth"
                          // src={URL.createObjectURL(image)}
                          src={photoIdBackImg}
                          alt=""
                        />
                        <Close
                          className="selected-image-remove-button"
                          fontSize="small"
                          onClick={() => handleRemoveImage("photoIdBackImage")}
                        />
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                )}
                {photoIdBackImgForPreview && !photoIdBackImg && (
                  <div>
                    <img
                      src={photoIdBackImgForPreview}
                      style={{ maxWidth: "100%", marginTop: "10px" }}
                      alt=""
                    />
                  </div>
                )}
              </>

              <Form.Label className="text-uppercase mt-4">
                {photoIdBackLoader
                  ? "Uploading image..."
                  : "Photo id back image"}{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="photoIdBackImg"
                accept=".jpg, .jpeg, .png"
                type="file"
                placeholder=""
                required
                onChange={(e) => handlePhotoIdBackImage(e)}
              />
            </>
          )}

          {/* If the photo id type is driving license */}
          {photoIdType === "drivingLicense" && (
            <>
              <>
                {drivingLicenseFrontImg && (
                  <div className="selected-video-container mt-4">
                    {/* {selectedImage?.map((image, index) => ( */}
                    <div
                      // key={index}
                      className="each-selected-video-for-priview"
                    >
                      <div className="each-selected-video-container">
                        <img
                          className="each-selected-image imageWidth"
                          // src={URL.createObjectURL(image)}
                          src={drivingLicenseFrontImg}
                          alt=""
                        />
                        <Close
                          className="selected-image-remove-button"
                          fontSize="small"
                          onClick={() =>
                            handleRemoveImage("drivingLicenseFrontImg")
                          }
                        />
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                )}
                {drivingLicenseFrontImgForPreview &&
                  !drivingLicenseFrontImg && (
                    <div>
                      <img
                        className="imageWidth"
                        src={drivingLicenseFrontImgForPreview}
                        style={{ maxWidth: "100%", marginTop: "10px" }}
                        alt=""
                      />
                    </div>
                  )}
              </>

              <Form.Label className="text-uppercase mt-4">
                {drivingFrontLoader
                  ? "Uploading image..."
                  : "Driving license front image"}{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="drivingLicenseFrontImg"
                type="file"
                placeholder=""
                accept=".jpg, .jpeg, .png"
                required
                onChange={(e) => handleDrivingFrontImage(e)}
              />

              <>
                {drivingLicenseBackImg && (
                  <div className="selected-video-container mt-4">
                    {/* {selectedImage?.map((image, index) => ( */}
                    <div
                      // key={index}
                      className="each-selected-video-for-priview"
                    >
                      <div className="each-selected-video-container">
                        <img
                          className="each-selected-image imageWidth"
                          // src={URL.createObjectURL(image)}
                          src={drivingLicenseBackImg}
                          alt=""
                        />
                        <Close
                          className="selected-image-remove-button"
                          fontSize="small"
                          onClick={() =>
                            handleRemoveImage("drivingLicenseBackImg")
                          }
                        />
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                )}
                {drivingLicenseBackImgForPreview && !drivingLicenseBackImg && (
                  <div>
                    <img
                      className="imageWidth"
                      src={drivingLicenseBackImgForPreview}
                      style={{ maxWidth: "100%", marginTop: "10px" }}
                      alt=""
                    />
                  </div>
                )}
              </>

              <Form.Label className="text-uppercase mt-4">
                {drivingBackLoader
                  ? "Uploading image..."
                  : "Driving license back image"}{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="drivingLicenseBackImg"
                type="file"
                placeholder=""
                accept=".jpg, .jpeg, .png"
                required
                onChange={(e) => handleDrivingBackImage(e)}
              />
            </>
          )}

          {/* If the photo id type is passport */}
          {photoIdType === "passport" && (
            <>
              <>
                {passportImg && (
                  <div className="selected-video-container mt-4">
                    {/* {selectedImage?.map((image, index) => ( */}
                    <div
                    // key={index}
                    // className="each-selected-video-for-priview"
                    >
                      <div className="each-selected-video-container">
                        <img
                          className="each-selected-image imageWidth"
                          // src={URL.createObjectURL(image)}
                          style={{ maxWidth: "100%" }}
                          src={passportImg}
                          alt=""
                        />
                        <Close
                          className="selected-image-remove-button"
                          fontSize="small"
                          onClick={() => handleRemoveImage("passportImg")}
                        />
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                )}

                {passportImgForPreview && !passportImg && (
                  <div>
                    <img
                      src={passportImgForPreview}
                      style={{ maxWidth: "100%", marginTop: "10px" }}
                      alt=""
                    />
                  </div>
                )}
              </>

              <Form.Label className="text-uppercase mt-4">
                {passportImgLoader ? "Uploading image..." : " Passport image"}{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="passportImg"
                type="file"
                accept=".jpg, .jpeg, .png"
                placeholder=""
                required
                onChange={(e) => handlePassportImage(e)}
              />
            </>
          )}

          <Button
            className="my-4 text-uppercase"
            as="input"
            type="submit"
            value="Submit"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default KycPhotoId;
