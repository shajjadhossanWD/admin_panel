import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
import { KycContext } from "../../../contexts/KycContext";
import { time_zone } from "../CountryName/cData";
import "./KycProfile.css";
import QRCode from "react-qr-code";

const KycProfile = ({ getProfile }) => {
  const {
    kycUser,
    handleUpdateUser,
    isVerifiedProfile,
    setisVerifiedProfile,
    refetch,
    setRefetch,
  } = useContext(KycContext);

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [timeZone, setTimeZone] = useState([]);
  const [timeZ, setTimeZ] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  console.log(walletAddress, "KYC wallet address");

  useEffect(() => {
    setUserName(kycUser?.username);
    setFullName(kycUser?.name);
    setDateOfBirth(kycUser?.birthday);
    setGender(kycUser?.gender);
    setNationality(kycUser?.nationality);
    setTimeZ(kycUser?.timezone);
    setAboutMe(kycUser?.description);
    setWalletAddress(kycUser?.walletAddress);
  }, [kycUser]);

  useEffect(() => {
    if (nationality) {
      const selectedCountry = time_zone.find(
        (country) => country.country === nationality
      );

      setTimeZone(selectedCountry.zones);
    } else {
      setTimeZone([]);
    }
  }, [nationality]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (gender === "choose" || gender === "Gender") {
      toast.error("Gender is required ! ");
      return;
    }
    if (nationality === "choose") {
      toast.error("Nationality is required ! ");
      return;
    }

    const dataUser = {
      // walletAddress: kycUser?.walletAddress,
      username: userName,
      name: fullName,
      birthday: dateOfBirth,
      gender: gender,
      nationality: nationality,
      timezone: timeZ,
      description: aboutMe,
      ip: "118.179.99.1",
    };

    await axios
      .put(
        `https://backend.dslcommerce.com/api/user-panel/user/update/${kycUser?.walletAddress}`,
        dataUser
      )
      .then((res) => {
        console.log(res, "inside the update");
        if (res.status === 200) {
          getProfile();
          setisVerifiedProfile(!refetch);
          setRefetch(!refetch);
          // toast.success("Successfully updated your profile .");
          swal({
            text: "Successfully updated your profile .",
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
          text: `${err.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });

    // handleUpdateUser(dataUser);
  };

  return (
    <div className="merchant-profile-container">
      <Form
        className="default-width-container"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>MEMBERSHIP ID</Form.Label>
          <Form.Control
            name="memberShipId"
            value={kycUser?.memberId}
            type="text"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>USERNAME</Form.Label>
          <Form.Control
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value.toLocaleLowerCase())}
            type="text"
            placeholder=""
            required
          />
        </Form.Group>
        {walletAddress && (
          <div className="wallet-address-qr-code mb-3">
            <p style={{ marginBottom: "8px" }}>SCAN FOR WALLET ADDRESS</p>
            <div style={{ maxWidth: "fit-content" }} className="bg-white p-2">
              <QRCode value={walletAddress} />
            </div>
          </div>
        )}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>FULL NAME AS PER YOUR PHOTO ID*</Form.Label>
          <Form.Control
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder=""
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>DATE OF BIRTH*</Form.Label>
          <Form.Control
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            type="date"
            placeholder=""
            maxLength={10}
            required
          />
          <Form.Label>Use DD/MM/YYYY formate for date of birth</Form.Label>
        </Form.Group>
        <Form.Label>GENDER*</Form.Label>
        <Form.Select
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mb-3"
          required
        >
          <option value="choose"> Gender </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Form.Select>
        <Form.Label>NATIONALITY*</Form.Label>
        <Form.Select
          value={nationality}
          name="nationality"
          onChange={(e) => setNationality(e.target.value)}
          className="mb-3"
          required
        >
          <option value="choose"> Nationality </option>
          {time_zone?.map((country, index) => (
            <option
              key={index}
              style={{ padding: "5px" }}
              value={country.country}
            >
              {country?.country}
            </option>
          ))}
        </Form.Select>
        <Form.Label>TIME ZONE*</Form.Label>
        <Form.Select
          name="timeZone"
          value={timeZ}
          onChange={(e) => setTimeZ(e.target.value)}
          className="mb-3"
          required
        >
          <option value="choose"> -- Select time zone -- </option>
          {timeZone?.map((eachZone) => (
            <option value={eachZone}>{eachZone}</option>
          ))}
        </Form.Select>
        <Form.Group className="mb-6" controlId="exampleForm.ControlTextarea1">
          <Form.Label>ABOUT ME</Form.Label>
          <Form.Control
            name="aboutMe"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            as="textarea"
            rows={3}
            required
          />
        </Form.Group>
        <Button className="my-3" variant="primary" type="submit">
          SAVE
        </Button>
      </Form>
    </div>
  );
};

export default KycProfile;
