import "./css/registration.css";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { RegisterForm } from "./RegisterForm";
import { API_PORT, API_URL } from "../../config/config";

function Registration() {
  const navigate = useNavigate();

  const handleLogin = () => {
    document.querySelector('.registration-container').classList.add('slide-out-left-reg');
    document.querySelector('.page-container-register').classList.add('fade-out');

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  useEffect(() => {
    const pageContainer = document.querySelector('.page-container-register');
    pageContainer.classList.add('fade-in');

    const registrationContainer = document.querySelector('.registration-container');
    registrationContainer.classList.add('slide-in-right-reg');

    const button = document.querySelector('.registration-button');
    if (button) {
      button.addEventListener('click', handleLogin);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', handleLogin);
      }
    };
  }, []);

  return (
    <div className="page-container-register">
      <div className="registration-container">
        <div className="registration-title_container">
          <div className="registration-logo_container">
            <img className="registration-logo" src={require("../../assets/zonelol.webp")} alt="O-Zone Logo" />
            <p>O-ZONE</p>
          </div>
          <h1 className="registration-title">Registration</h1>
        </div>

        <RegisterForm />

        <p className="registration-form-title registration-form-continue">or continue with</p>
        <div className="registration-social_container">
          <a href={`${API_URL}:${API_PORT}/api/auth/google`} className="registration-social-item registration-social-item--google">
            <i className="fa-brands fa-google"></i>
          </a>
          <a href={`${API_URL}:${API_PORT}/api/auth/discord`} className="registration-social-item registration-social-item--discord">
            <i className="fa-brands fa-discord"></i>
          </a>
        </div>

        <div className="registration-footer_container">
          <span className="registration-footer-text">Do you have an account?</span>
          <div className="registration-footer-link" onClick={handleLogin}>Login</div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
