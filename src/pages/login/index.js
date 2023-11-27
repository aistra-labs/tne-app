import React, { memo, useState } from "react";
import "./login.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);

  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Email validation
    const isValid = EMAIL_REGEX.test(value);
    setEmailValid(isValid);
  };

  const handleSubmitClick = () => {
    if (isEmailValid) {
      navigate("/expense-approvals", { state: { email } });
    }
  };
  return (
    <div className="loginPage-container">
      <div className="login-container">
        <div className="email-field-container">
          <label className="email-label" htmlFor="email">
            Email*
          </label>
          <input
            type="email"
            id="email"
            className="email-field-input"
            placeholder="john.doe@example.com"
            value={email}
            onChange={handleEmailChange}
          />
          {!email.length && (
            <div className="error-message">*Email is required</div>
          )}
          {!isEmailValid && email.length > 0 && (
            <div className="error-message">*Email is invalid</div>
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          className="email-submit-btn"
          onClick={handleSubmitClick}
          disabled={!isEmailValid}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default memo(LoginPage);
