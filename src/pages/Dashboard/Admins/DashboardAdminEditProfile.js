import axios from "axios";
import { useEffect, useState } from "react";
import { BiLockOpen } from "react-icons/bi";
import { GrMail } from "react-icons/gr";
import { MdAccountCircle, MdOutlineAlternateEmail } from "react-icons/md";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./DashboardAdminEditProfile.css";
import swal from "sweetalert";

const DashboardAdminEditProfile = () => {
  const { id } = useParams();
  const [onLoading, setonLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(id.id);

  const [valueProfilePhn, setValueProfilePhn] = useState();
  const [visibleCPassword, setVisibleCPassword] = useState(false);
  const [visibleEnPassword, setVisibleEnPassword] = useState(false);
  const [visibleCnPassword, setVisibleCnPassword] = useState(false);
  const [singleAdmin, setSingleAdmin] = useState({});
  const [currentPasswordPro, setCurrentPasswordPro] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  // console.log(singleAdmin)
  useEffect(() => {
    if (id) {
      axios
        .get(`https://backend.dslcommerce.com/api/admin/${id}`)
        .then((res) => {
          setSingleAdmin(res.data.admin);
          setEmail(res.data.admin.email);
          setUserName(res.data.admin.username);
          setValueProfilePhn(res.data.admin.phone);
          setCurrentPasswordPro(res.data.admin.password);
        });
    }
  }, [id]);

  // if (onLoading) {
  //     return <Loader />
  // }

  const subProfile = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const phone = valueProfilePhn;
    const currentPassword = event.target.currentPassword.value;
    const password = event.target.password.value;
    const cPassword = event.target.cPassword.value;
    const avatar = event.target.avatar.files[0];

    const formDataSingleAdmin = new FormData();
    formDataSingleAdmin.append("name", name);
    formDataSingleAdmin.append("username", userName);
    formDataSingleAdmin.append("email", email);
    formDataSingleAdmin.append("phone", phone);
    formDataSingleAdmin.append("password", password);
    // formDataSingleAdmin.append('newPassword', newPassword)
    // formDataSingleAdmin.append('cPassword', cPassword)
    formDataSingleAdmin.append("image", avatar);
    console.log(...formDataSingleAdmin);
    setonLoading(true);

    if (password === cPassword) {
      await axios
        .put(
          `https://backend.dslcommerce.com/api/admin/update/${id}`,
          formDataSingleAdmin,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem(
                "adminDslCommerce"
              )}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            // alert(res.data.message);
            swal({
              // title: "Success",
              text: res.data.message,
              icon: "success",
              button: "OK!",
              className: "modal_class_success",
            });
            setonLoading(false);
            setSingleAdmin(res.data.admin);
            navigate("/admin/adminUser");
          }
        })
        .catch((error) => {
          // alert(error.response.data.message);
          swal({
            title: "Attention",
            text: `${error.response.data.message}`,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
          setonLoading(false);
        });
    } else {
      swal({
        title: "Attention",
        text: "Password does not matched",
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const cPassword = e.target.cPassword.value;

    if (newPassword !== cPassword) {
      return alert("Confirm Password not match!");
    }
    setonLoading(true);
    await axios
      .put(
        `https://backend.dslcommerce.com/api/admin/update/password/${id}`,
        { currentPassword, newPassword },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("admin")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          swal({
            // title: "Success",
            text: res.data.message,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          setonLoading(false);
        }
      })
      .catch((error) => {
        // alert(error.response.data.message);
        swal({
          title: "Attention",
          text: error.response.data.message,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
        setonLoading(false);
      });
  };

  return (
    <>
      <div className="handleEditAdminHeight">
        <h5
          className="text-start text-light"
          style={{ textTransform: "uppercase" }}
        >
          Profile
        </h5>
        <form onSubmit={subProfile}>
          <div className="profileDiv">
            <div className="row mx-auto g-5">
              <div className="col-lg-7 p-2">
                <p className="d-flex col-12 inputProfile">
                  <span className="iconCreator">
                    <MdAccountCircle className="text-light" />
                  </span>
                  <input
                    className="creatorsInput form-control"
                    type="text"
                    name="name"
                    placeholder="Admin Name"
                    defaultValue={singleAdmin?.name}
                  />
                </p>
                <p className="d-flex col-12 inputProfile">
                  <span className="iconCreator text-white">
                    <MdOutlineAlternateEmail className="text-light" />
                  </span>
                  <input
                    className="creatorsInput form-control"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) =>
                      setUserName(e.target.value.toLocaleLowerCase())
                    }
                  />
                </p>
                <p className="d-flex col-12 inputProfile">
                  <span className="iconCreator">
                    <GrMail className="text-light" />
                  </span>
                  <input
                    className="creatorsInput form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value.toLocaleLowerCase())
                    }
                  />
                </p>
                <p className="d-flex col-12 inputProfile">
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="SG"
                    value={valueProfilePhn}
                    onChange={setValueProfilePhn}
                    className="countryInput input_phone form-control"
                  />
                </p>
                <p className="d-flex col-12 inputProfile">
                  <span className="inputWpass">
                    <span className="iconCreator">
                      <BiLockOpen className="text-light" />
                    </span>
                    <input
                      className="creatorsInput1 password_input form-control"
                      type={visibleCPassword ? "text" : "password"}
                      name="currentPassword"
                      placeholder="Current Password"
                    />
                    <button
                      type="button"
                      onClick={() => setVisibleCPassword(!visibleCPassword)}
                      className="iconBoxBtn password_togoler text-center text-white"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </span>
                </p>
                <p className="d-flex col-12 inputProfile">
                  <span className="inputWpass">
                    <span className="iconCreator">
                      <BiLockOpen className="text-light" />
                    </span>
                    <input
                      className="creatorsInput1 password_input form-control"
                      type={visibleEnPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter New Password"
                    />
                    <button
                      type="button"
                      onClick={() => setVisibleEnPassword(!visibleEnPassword)}
                      className="iconBoxBtn password_togoler text-center text-white"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </span>
                </p>
                <p className="d-flex col-12 inputProfile">
                  <span className="inputWpass">
                    <span className="iconCreator">
                      <BiLockOpen className="text-light" />
                    </span>
                    <input
                      className="creatorsInput1 password_input form-control"
                      type={visibleCnPassword ? "text" : "password"}
                      name="cPassword"
                      placeholder="Confirm New Password"
                    />
                    <button
                      type="button"
                      onClick={() => setVisibleCnPassword(!visibleCnPassword)}
                      className="password_togoler iconBoxBtn text-white text-center"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </span>
                </p>
              </div>
              <div className="col-lg-5 text-center">
                {singleAdmin?.avatar ? (
                  <img
                    className="ProfileImg"
                    src={singleAdmin?.avatar}
                    alt="profilePic"
                  />
                ) : (
                  <img
                    className="ProfileImg"
                    src="https://backend.dslcommerce.com/assets/1660396587217.jpeg"
                    alt="profilePic"
                  />
                )}

                <br />
                <input
                  type="file"
                  className="ImageInput form-control"
                  name="avatar"
                />
              </div>
            </div>

            <div className="mx-auto text-center">
              <Link to="/admin/dashboard">
                <button className="profileBtnChange bg-danger me-3 text-white text-uppercase">
                  Cancel
                </button>
              </Link>
              <button
                className="profileBtnChange text-white text-uppercase"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default DashboardAdminEditProfile;
