import RegisterArea from "../../Components/Auth/RegisterArea";
import PageTitle from "../../Components/Common/PageTitle";

function Register() {
  return (
    <div className="register-wrapper">
      <PageTitle title="Register" />
      <section className="register-area ptb-50">
        <div className="container">
          <RegisterArea />
        </div>
      </section>
    </div>
  );
}

export default Register;
