import LoginArea from "../../Components/Auth/LoginArea";
import PageTitle from "../../Components/Common/PageTitle";


function Login() {
  return (
    <div className="login-wrapper">
      <PageTitle title="Login" />
      <section className="login-area ptb-50 admin-login-section">
        <div className="container">
          <LoginArea />
        </div>
      </section>
    </div>
  );
}

export default Login;
