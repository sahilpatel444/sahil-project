import React, { useContext, } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { InputContext } from "../../Context/inputContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import axios from "axios";

const Login = () => {
  const { user, setUser } = useContext(InputContext);
  const navigate = useNavigate();



  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      // Send the token to the backend
      const response = await axios.post(
        // "http://localhost:5000/api/google-login",
        `${process.env.REACT_APP_BACKEND_URL}/api/google-login`,
        {
          token: credential,
        }
      );
    
      console.log("User data saved to MongoDB:", response.data);
    } catch (error) {
      console.error("Error during login:", error);
    }
    // console.log(credentialResponse, "Login Successfully");
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(user, "user info");
    
    
    const userData = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
    
    
    // Set user state and save to local storage    
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  } ;
  const handleLoginFail = () => {
    console.error("Login Fail");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  // console.log(user,"user data")
  return (
    <div>
      <GoogleOAuthProvider clientId='571743621526-mbe2mddaadlca0at1p0u3j1p0skfvcac.apps.googleusercontent.com' >
        {/* <div style={{ textAlign: "center" }}>
          <h6>Google Login</h6>
          {!user ? (
            <>
              <GoogleLogin
                className="Google-login-btn  "
                width={10}
              
                onSuccess={handleLoginSuccess}
                onError={handleLoginFail}
              />
             
            </>
          ) : (
            <div>
              <img
                style={{ borderRadius: "50%", justifyItems: "center" }}
                src={user.picture}
                alt="user profile"
              />
              <h2>Welcome, {user.name}</h2>
              <h2>Email :-{user.email}</h2>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "10px",
                  width: "60px",
                }}
              >
                {" "}
                logout
              </button>
            </div>
          )}
        </div> */}
        <div
          style={{
            textAlign: "center",
         
            padding: "20px",
            backgroundColor: "#f7f7f7",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            margin: "auto",
            marginTop:"50px"
          }}
        >
          <h6 style={{ fontSize: "1.5rem", color: "#333" }}>Google Login</h6>
          {!user ? (
            <div>
              <GoogleLogin
                className="Google-login-btn"
                // width={10}
                onSuccess={handleLoginSuccess}
                onError={handleLoginFail}
                style={{
                  backgroundColor: "#4285F4",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              />
            </div>
          ) : (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <img
                style={{
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  border: "2px solid #ddd",
                }}
                src={user.picture}
                alt="User Profile"
              />
              <h2
                style={{ fontSize: "1.5rem", color: "#333", margin: "10px 0" }}
              >
                Welcome, {user.name}
              </h2>
              <h4 style={{ color: "#666", margin: "5px 0" }}>
                Email: {user.email}
              </h4>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px",
                  padding: "8px 15px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "background-color 0.3s",
                }}
              
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
