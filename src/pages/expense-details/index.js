import React, { memo, useEffect, useState,useRef } from "react";
import "./expenseDetailsView.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useGetApi from "../../components/useGetApi";
import apiRequest from "../../components/api/api";
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
const ExpenseDetailsView = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { state: email } = useLocation();
  const location = useLocation();
  const [claimData , setClaimData] = useState('');
  const id = location.pathname.split('/').pop();
  const chatContainerRef = useRef(null);
  const [successAlert ,setSucessAlert] =useState(false);
 const [isLoading ,setIsLoading] =useState(true);
  // Redirect to login page if email state is not present
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
    getClaimDetals();
  }, [email, navigate]);

  const getClaimDetals = async() => {
    try {
      const url = 'claim/detail?claimId='+id;
      const result = await apiRequest(url, 'GET');
      setClaimData(result.data);
      setIsLoading(false);
    } catch (error) {
      // Handle error
      console.error('Error in POST request:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setComment(value);
  };
  
  const handleApproveClick = async(action) => {
    try {
      const url = 'claim/action';
      const data = { claimId : id, email : email.email.email, action:action };
      const result = await apiRequest(url, 'POST', data);
      if(result.statusCode===200){
        setSucessAlert(true);
        setTimeout(()=>{setSucessAlert(false)},2000)
      }
    } catch (error) {
      // Handle error
      console.error('Error in POST request:', error);
    }

  };

  const handleRejectClick = async(action) => {
    try {
      const url = 'claim/action';
      const data = { claimId : id, email : email.email.email, action:action };
      const result = await apiRequest(url, 'POST', data);
      if(result.statusCode===200){
        setSucessAlert(true);
        setTimeout(()=>{setSucessAlert(false)},2000)
      }
    } catch (error) {
      console.error('Error in POST request:', error);
    }
  };

  const ChatBox = ({ emailId, message, timestamp }) => {
    const isSender = emailId !== email.email.email; 
    return (
      <div className="expense-details-chat-chip" style={{  alignItems: isSender ? 'flex-start' : 'flex-end', }}>
       <Chip
        label={<Typography style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'left' }}>{message}</Typography>}
        color={isSender ? 'primary' : 'default'}
        style={{ maxWidth: 600, height:'100%', padding: 5}}
      />
         <Typography variant="caption" color="textSecondary" style={{ marginTop: 1, fontSize:'10px'}}>
        {timestamp}
      </Typography>
    </div>
    );
  };
 

  const handleSubmit = async (newMessage) => {

    try {
      const url = 'conversation';
      const data = { claimId : id, email : 'arpitcr@unconstrained.work', text:newMessage,  publishToSlack:true };
      const result = await apiRequest(url, 'POST', data);
      const updatedConversations = [...claimData.conversations,  result.data ];
      
      // Update the state with the new array of conversations
      setClaimData({ ...claimData, conversations: updatedConversations });
      setComment('');
      scrollToLastMessage();
    } catch (error) {
      // Handle error
      console.error('Error in POST request:', error);
    }
    
   
  };

  const scrollToLastMessage = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      if (scrollHeight > clientHeight) {
        chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
      }
    }
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [claimData]);

  return (
    <div className="expense-details-body">
      <div className="expense-details-container">
        <div className="expense-details-top">
          <div className="expense-left-section">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <React.Fragment>
                {claimData && (
                  <object
                    data={claimData.receiptURL}
                    type="application/pdf"
                    width="600px"
                    height="400px"
                    style={{ border: "none" }}
                  ></object>
                )}
              </React.Fragment>
            )}
          </div>

          <div className="expense-right-section">
            <div className="expense-observations">
              <div className="obsevation-title">Observations</div>
              <List>
                {claimData &&
                  claimData.observations.map((item) => (
                    <ListItem>
                      <ListItemText primary={"-  " + item} />
                    </ListItem>
                  ))}
              </List>
              {successAlert && (
                <Alert severity="success">Sucessfully Submitted</Alert>
              )}
            </div>
            <div className="expense-action-btn">
              <Button
                variant="contained"
                color="primary"
                className="email-submit-btn"
                onClick={() => handleApproveClick("approve")}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="email-submit-btn"
                onClick={() => handleRejectClick("reject")}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
        <div className="expense-details-bottom">
          <div className="expense-bottom-thread">Comment Thread</div>
          <div className="expense-details-chat" ref={chatContainerRef}>
            {claimData &&
              claimData.conversations.map((item) => (
                <ChatBox
                  emailId={email}
                  message={item.text}
                  timestamp={item.sendTime}
                />
              ))}
            <div style={{ height: "10px" }}></div>
          </div>
          <div className="expense-details-chat-input">
            <input
              type="text"
              className="comment-field-input"
              id="comment"
              placeholder="Enter your comment"
              value={comment}
              onChange={handleChange}
            />
            <Button
              size="md"
              variant="outlined"
              onClick={() => handleSubmit(comment)}
            >
              Submit
            </Button>
          </div>
        </div>
        {/* </div> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default memo(ExpenseDetailsView);
