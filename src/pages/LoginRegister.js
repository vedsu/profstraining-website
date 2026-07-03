import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, WEBSITE } from "../config";
function LoginRegister() {
	
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
    UserType: "Attendee",
  });

  const [registerData, setRegisterData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Contact: "",
    Role: "",
    UserType: "",
  });
  
  
  const handleLogin = async () => {
	  
  try {
	  
    if (!loginData.Email || !loginData.Password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    const payload = {
      Email: loginData.Email,
      Password: loginData.Password,
      UserType: loginData.UserType || "Attendee",
      Website: WEBSITE,
    };

    const response = await axios.post(
      `${API_URL}/login`,
      payload
    );

    if (response.data.success) {

      sessionStorage.setItem(
        "USERINFO",
        JSON.stringify(response.data.message)
      );


		console.log("API Response:", response.data);
		console.log("Message:", response.data.message);

      navigate("/dashboard");

    } else {
      alert("Invalid Credentials");
    }

  } catch (error) {
    console.log(error);
    alert("Login Failed");
  } finally {
    setLoading(false);
  }
};

const handleRegister = async () => {
  try {
    if (
      !registerData.Name ||
      !registerData.Email ||
      !registerData.Password ||
      !registerData.Contact ||
      !registerData.UserType
    ) {
      alert("Please fill all required fields and select a user type");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("Name", registerData.Name);
    formData.append("Email", registerData.Email);
    formData.append("Password", registerData.Password);
    formData.append("Contact", registerData.Contact);
    formData.append("Role", registerData.Role || "");
    formData.append("UserType", registerData.UserType);
    formData.append("Website", WEBSITE);

    const response = await axios.post(
      `${API_URL}/register`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (response.data.success) {
      alert("Registration Successful! Please login.");
      setActiveTab("login");
      setRegisterData({
        Name: "",
        Email: "",
        Password: "",
        Contact: "",
        Role: "",
        UserType: "",
      });
    } else {
      alert(response.data.message || "Registration Failed");
    }
  } catch (error) {
    if (error.response && error.response.status === 203) {
      alert(error.response.data.message || "User already registered");
    } else {
      alert("Registration Failed");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container py-5">
      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          border: "1px solid #ddd",
          padding: "20px",
        }}
      >
        {/* Tabs */}
        <div className="d-flex mb-4">
          <button
            className={`btn w-50 ${
              activeTab === "login" ? "btn_one" : "btn-light"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>

          <button
            className={`btn w-50 ${
              activeTab === "register" ? "btn_one" : "btn-light"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* LOGIN */}
        {activeTab === "login" ? (
          <>
            <h3 className="text-center mb-4">LOGIN HERE</h3>

            <input
              className="form-control mb-3"
              placeholder="Email"
              value={loginData.Email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  Email: e.target.value,
                })
              }
            />
			
            <div style={{ position: "relative" }}>
              <input
                type={showLoginPassword ? "text" : "password"}
                className="form-control mb-3"
                placeholder="Password"
                value={loginData.Password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    Password: e.target.value,
                  })
                }
              />

              <i
                className={`fa ${
                  showLoginPassword ? "fa-eye" : "fa-eye-slash"
                }`}
                onClick={() =>
                  setShowLoginPassword(!showLoginPassword)
                }
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "15px",
                  cursor: "pointer",
                  color: "#666",
                }}
              ></i>
            </div>
			
			      {/* User Type */}

            <div className="row mb-3">
              <div className="col-6">
                <label>
                  <input
                    type="checkbox"
                    checked={loginData.UserType === "Attendee"}
                    onChange={() => setLoginData({ ...loginData, UserType: "Attendee" })}
                  />{" "}
                  Customer
                </label>
              </div>

              <div className="col-6">
                <label>
                  <input
                    type="checkbox"
                    checked={loginData.UserType === "Speaker"}
                    onChange={() => setLoginData({ ...loginData, UserType: "Speaker" })}
                  />{" "}
                  Speaker
                </label>
              </div>
            </div>

           <button
			  className="btn btn_one w-100"
			  onClick={handleLogin}
			  disabled={loading}
			>
			  {loading ? "Please Wait..." : "Login"}
			</button>
			
			<div className="mt-3">
				  <p className="mb-0">Forgot password?</p>

				 <Link
						to="/forgot-password"
						style={{
							color: "#000080",
							textDecoration: "underline",
							fontWeight: "500",
						}}
					>
						Click here
					</Link>
			</div>
          </>
        ) : (
          <>
            {/* REGISTER */}

            <h3 className="text-center mb-4">
              REGISTER HERE
            </h3>

            <input
              className="form-control mb-3"
              placeholder="Name"
              value={registerData.Name}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  Name: e.target.value,
                })
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Email"
              value={registerData.Email}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  Email: e.target.value,
                })
              }
            />

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control mb-3"
                placeholder="Password"
                value={registerData.Password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    Password: e.target.value,
                  })
                }
              />

              <i
                className={`fa ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                }`}
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "15px",
                  cursor: "pointer",
                  color: "#666",
                }}
              ></i>
            </div>

            <input
              className="form-control mb-3"
              placeholder="Contact"
              value={registerData.Contact}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  Contact: e.target.value,
                })
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Role"
              value={registerData.Role}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  Role: e.target.value,
                })
              }
            />

            {/* User Type */}

            <div className="row mb-3">
              <div className="col-6">
                <label>
                  <input
                    type="checkbox"
                    checked={
                      registerData.UserType ===
                      "Attendee"
                    }
                    onChange={() =>
                      setRegisterData({
                        ...registerData,
                        UserType: "Attendee",
                      })
                    }
                  />{" "}
                  Customer
                </label>
              </div>

              <div className="col-6">
                <label>
                  <input
                    type="checkbox"
                    checked={
                      registerData.UserType ===
                      "Speaker"
                    }
                    onChange={() =>
                      setRegisterData({
                        ...registerData,
                        UserType: "Speaker",
                      })
                    }
                  />{" "}
                  Speaker
                </label>
              </div>
            </div>

            <button className="btn btn_one w-100" onClick={handleRegister} disabled={loading}>
              {loading ? "Please Wait..." : "Register"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginRegister;