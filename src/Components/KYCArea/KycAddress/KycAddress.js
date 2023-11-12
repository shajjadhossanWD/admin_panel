import { Close } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
import { DSLCommerceContext } from "../../../contexts/DSLCommerceContext";
import { KycContext } from "../../../contexts/KycContext";
import { countryName } from "../CountryName/cData";
import "./KycAddress.css";

const KycAddress = ({ addressData }) => {
  const {
    kycUser,
    handleAddress,
    refetch,
    setRefetch,
    isVerifiedAddress,
    setisVerifiedAddress,
  } = useContext(KycContext);
  const { user, openWalletModal } = useContext(DSLCommerceContext);

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [file, setFile] = useState("");
  const [addressProofImg, setAddressProofImg] = useState("");

  console.log("KYC USER ADDRESS", addressData);

  useEffect(() => {
    setAddress1(kycUser?.address1);
    setAddress2(kycUser?.address2);
    setCity(kycUser?.city);
    setState(kycUser?.state);
    setCountry(kycUser?.country);
    setZipCode(kycUser?.zipCode);
  }, [kycUser]);

  // Setting the address prof img initially
  useEffect(() => {
    setAddressProofImg(addressData?.file);
  }, [addressData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("walletAddress", user?.walletAddress);
    formData.append("address1", address1 || addressData?.address1);
    formData.append("address2", address2 || addressData?.address2);
    formData.append("city", city || addressData?.city);
    formData.append("state", state || addressData?.state);
    formData.append("country", country || addressData?.country);
    formData.append("zipCode", zipCode || addressData?.zipCode);
    formData.append("file", file);

    const data = {
      walletAddress: user?.walletAddress,
      address1: address1 || addressData?.address1,
      address2: address2 || addressData?.address2,
      city: city || addressData?.city,
      state: state || addressData?.state,
      country: country || addressData?.country,
      zipCode: zipCode || addressData?.zipCode,
      file: file,
    };

    await axios
      .post(`https://backend.dslcommerce.com/api/address`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const updateAddressStatus = async () => {
            const data = {
              isAddress: true,
            };

            await axios
              .put(
                `https://backend.dslcommerce.com/api/user-panel/user/update/${kycUser?.walletAddress}`,
                data
              )
              .then((res) => {
                if (res.status === 200) {
                  // console.log(res, "updating the user addresss, isAddress");
                  // console.log(res);
                  setisVerifiedAddress(!isVerifiedAddress);
                  setRefetch(!refetch);
                  swal({
                    text: "Successfully updated your address .",
                    icon: "success",
                    button: "OK!",
                    className: "modal_class_success",
                  });
                }
              })
              .catch((err) => {
                // console.log(err, "inside the update error");
                // console.dirxml(err);
                swal({
                  title: "Attention",
                  text: `${err.response.data.message}`,
                  icon: "warning",
                  button: "OK!",
                  className: "modal_class_success",
                });
              });
          };
          updateAddressStatus();
        }
      })
      .catch((err) => {
        console.dir(err);
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });

    // console.log(data);
    // handleAddress(data)
  };

  const handleRemoveImage = () => {
    setFile("");
  };
  return (
    <div>
      <div
        style={{
          background: "#fff",
          padding: "10px 20px",
          borderRadius: "3px",
        }}
      >
        <p className="text-danger">
          Note: If you change your Address, your account will be downgraded till
          our admin approves it.
        </p>
      </div>
      <p className="pt-4">File size should not be more than 5 MB.</p>

      <Form
        onSubmit={(e) => handleFormSubmit(e)}
        className="default-width-container"
      >
        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label>
            Address Line 1 <span>★</span>{" "}
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={addressData?.address1}
            onChange={(e) => setAddress1(e.target.value)}
            name="address1"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label>Address Line 2 </Form.Label>
          <Form.Control
            type="text"
            defaultValue={addressData?.address2}
            onChange={(e) => setAddress2(e.target.value)}
            name="address2"
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label>
            City <span>★</span>{" "}
          </Form.Label>
          <Form.Control
            type="text"
            name="city"
            defaultValue={addressData?.city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label>
            State / province <span>★</span>{" "}
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={addressData?.state}
            onChange={(e) => setState(e.target.value)}
            name="state"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label>
            country <span>★</span>{" "}
          </Form.Label>
          <Form.Select
            name="country"
            defaultValue={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option defaultValue=""> Country </option>
            {countryName?.map((country, index) => (
              <option
                key={index}
                style={{ padding: "5px" }}
                selected={addressData?.country == country && true}
              >
                {country}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label>
            postal / zip code <span>★</span>{" "}
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={addressData?.zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            name="zipCode"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label>
            address proof <span>★</span>{" "}
          </Form.Label>
          <p className="pt-1">
            Please provide the following documents which clearly reflects your
            Full Name and Address . The document must not be order than 3 months
            from the date this verification.
          </p>
          <ol>
            <li>Utilities Bill</li>
            <li>Mobile Phone Bill</li>
            <li>Bank Statement</li>
            <li>Government Letter</li>
          </ol>

          <>
            {file && (
              <div className="selected-video-container mb-3">
                <div className="">
                  <div className="each-selected-video-container">
                    <img
                      className="each-selected-image imageWidth"
                      style={{ maxWidth: "100px", }}
                      src={URL.createObjectURL(file)}
                      alt=""
                    />
                    <Close
                      className="selected-image-remove-button"
                      fontSize="small"
                      onClick={handleRemoveImage}
                    />
                  </div>
                </div>
                {/* ))} */}
              </div>
            )}

            {addressProofImg && !file && (
              <img
                style={{ maxWidth: "100%", marginBottom: "10px" }}
                src={addressProofImg}
                alt=""
              />
            )}
          </>

          <Form.Control
            type="file"
            defaultValue={file}
            onChange={(e) => setFile(e?.target?.files[0])}
            name="addressProof"
            required
          />
        </Form.Group>

        <Button
          className="my-3"
          variant="primary"
          type="submit
        
        "
        >
          SAVE
        </Button>
      </Form>
    </div>
  );
};

export default KycAddress;
