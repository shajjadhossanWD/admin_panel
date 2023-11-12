import RegisterArea from "../../Components/Auth/RegisterArea";
import PageTitle from "../../Components/Common/PageTitle";
import Support from "../../Components/Common/Support";

function Register() {
  return (
    <div className="register-wrapper">
      <PageTitle title="Register" />
      <section className="register-area ptb-50">
        <div className="container">
          <RegisterArea />
        </div>
      </section>
      <Support />
    </div>
  );
}

export default Register;
