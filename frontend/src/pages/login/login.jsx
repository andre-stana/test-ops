import "./css/login.css";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LoginForm } from './LoginForm.jsx';
import { API_PORT, API_URL } from "../../config/config.js";

function Login() {
  const navigate = useNavigate();

  const handleRegister = () => {
    document.querySelector('.login-container').classList.add('slide-out-left-log');
    document.querySelector('.page-container-login').classList.add('fade-out');

    setTimeout(() => {
      navigate("/register");
    }, 500);
  };

  useEffect(() => {
    const pageContainer = document.querySelector('.page-container-login');
    pageContainer.classList.add('fade-in');

    const loginContainer = document.querySelector('.login-container');
    loginContainer.classList.add('slide-in-right-log');
  }, []);

  return (
    <div className="page-container-login">
      <div className="login-container">
        <div className="login-title_container">
          <div className="login-logo_container">
            <img className="login-logo" src={require("../../assets/zonelol.webp")} alt="O-Zone Logo" />
            <p>O-ZONE</p>
          </div>
          <h1 className="login-title">Login</h1>
        </div>

        <LoginForm />

        <p className="login-form-title login-form-continue">or continue with</p>
        <div className="login-social_container">
          <a href={`${API_URL}:${API_PORT}/api/auth/google`} className="login-social-item login-social-item--google">
            <i className="fa-brands fa-google"></i>
          </a>
          <a href={`${API_URL}:${API_PORT}/api/auth/discord`} className="login-social-item login-social-item--discord">
            <i className="fa-brands fa-discord"></i>
          </a>
        </div>

        <div className="login-footer_container">
          <span className="login-footer-text">Dont have an account yet ?</span>
          <div className="login-footer-link" onClick={handleRegister}>Register for free</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
