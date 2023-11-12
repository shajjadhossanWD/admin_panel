import LoginArea from "../../Components/Auth/LoginArea";
import PageTitle from "../../Components/Common/PageTitle";

import Support from "../../Components/Common/Support";
import Footer from "../../Components/Layout/Footer/Footer";

function Login() {
  return (
    <div className="login-wrapper">
      <PageTitle title="Login" />
      <section className="login-area ptb-50 admin-login-section">
        <div className="container">
          <LoginArea />
        </div>
      </section>
      {/* <Support /> */}
      <Footer />
    </div>
  );
}

export default Login;
