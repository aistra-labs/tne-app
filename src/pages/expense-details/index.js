import React, { memo, useEffect, useState } from "react";
import "./expenseDetailsView.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ExpenseDetailsView = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { state: email } = useLocation();

  // Redirect to login page if email state is not present
  useEffect(() => {
    console.log('expense details email', email);
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  const handleApproveClick = () => {};

  const handleRejectClick = () => {};

  return (
    <div className="expense-details-body">
      <div className="expense-details-container">
        <div className="expense-details-top">
          <div className="expense-left-section">Receipt</div>
          <div className="expense-right-section">
            <div className="expense-observations">
                <div className="obsevation-title">Observations</div>
            </div>
            <div className="expense-action-btn">
              <Button
                variant="contained"
                color="primary"
                className="email-submit-btn"
                onClick={handleApproveClick}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="email-submit-btn"
                onClick={handleRejectClick}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
        <div className="expense-details-bottom">
          <div className="expense-bottom-thread">Comment Thread</div>
          <input
            type="text"
            className="comment-field-input"
            id="comment"
            placeholder="Enter your comment"
            value={comment}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ExpenseDetailsView);
