import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";


function Unsubscribe() {
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  
  const [email, setEmail] = useState("");
const [successMsg, setSuccessMsg] = useState("");
const [loading, setLoading] = useState(false);

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let captcha = "";

    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setCaptchaValue(captcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

    
  const validation = async (e) => {
  e.preventDefault();

	if (captchaInput !== captchaValue) {
	  setCaptchaError("Invalid Captcha");
	  generateCaptcha();
	  setCaptchaInput("");
	  return;
	}

	setCaptchaError("");

  try {
	  
    setLoading(true);

    const response = await axios.post(
      `${API_URL}/unsubscribe`,
      {
        email: email,
        Website: WEBSITE,
      }
    );

    if (response.data.success) {
		  setCaptchaError("");
		  setSuccessMsg(response.data.message);
		  setEmail("");
		  setCaptchaInput("");
		  generateCaptcha();
		} else {
      alert(response.data.message || "Something went wrong");
    }
  } catch (error) {
    console.log(error);
    alert("Unable to unsubscribe");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
	
	<Helmet>
        <title>Unsubscribe from Webinar Updates | Profs Training Online </title>
        <meta
          name="description"
          content="Update your email preferences or unsubscribe from Profs Training webinar updates, course announcements, and professional training notifications."
        />
     </Helmet>
	
      <section className="section-top">
        <div className="container">
          <div className="col-lg-10 offset-lg-1 text-center">
            <div
              className="section-top-title wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
              data-wow-offset="0"
            >
              <h1>Unsubscribe</h1>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li> / Unsubscribe</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .unsubscribe_text{
          font-size:22px;
          line-height:38px;
          color:#222;
        }

        .unsubscribe_card{
          background:#fff;
          padding:50px;
          border-radius:12px;
          box-shadow:0 10px 30px rgba(0,0,0,0.08);
        }

        .unsubscribe_card .form-group label{
          font-size:18px;
          font-weight:600;
          margin-bottom:12px;
          color:#0b1f53;
        }

        .unsubscribe_card .form-control{
          height:60px;
          border:1px solid #e2e2e2;
          border-radius:8px;
          padding:15px 20px;
          font-size:16px;
          box-shadow:none;
        }

        .unsubscribe_card .form-control:focus{
          border-color:#5a5de6;
        }

        .captcha_text{
          font-size:28px;
          font-weight:600;
          color:#222;
          letter-spacing:3px;
          min-width:160px;
          padding:10px 20px;
          border:1px solid #ddd;
          background:#f5f5f5;
          border-radius:5px;
          text-align:center;
        }

        @media only screen and (max-width:767px){
          .unsubscribe_card{
            padding:30px 20px;
          }

          .unsubscribe_text{
            font-size:16px;
            line-height:30px;
          }
        }
		
		.unsubscribe_text {
    font-size: 22px;
    line-height: 38px;
    color: #222;
}
      `}</style>

      <div id="contact" className="contact_area section-padding">
        <div className="container">

          <div className="row justify-content-center mb-5 mt-5 mt-md-0">
            <div className="col-lg-10 text-center">
              <p className="unsubscribe_text">
               Simply email us from your registered email address. We'll verify your account and handle the unsubscribe process for you. You'll receive confirmation once it's done.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div
              className="col-lg-8 col-md-10 col-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
            >
              <div className="unsubscribe_card">
                <div className="contact">

                 <form
					  className="form"
					  onSubmit={validation}
					>
					  {successMsg && (
						<div
						  className="alert alert-success text-center mb-4"
						  role="alert"
						>
						  <i
							className="fa fa-check-circle"
							style={{
							  fontSize: "22px",
							  marginRight: "10px",
							}}
						  ></i>

						  <strong>{successMsg}</strong>
						</div>
					  )}

					  <div className="row">

						<div className="form-group col-md-12 mb-4">
						  <label>Email <span className="text-danger">*</span></label>

						  <input
							type="email"
							className="form-control"
							placeholder="Enter Your Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						  />
						</div>

						<div className="form-group col-md-12 mb-4">
						  <label>Enter Captcha Here <span className="text-danger">*</span></label>

						  <input
							type="text"
							className="form-control"
							placeholder="Enter Captcha"
							value={captchaInput}
							onChange={(e) => {
							  setCaptchaInput(e.target.value);
							  setCaptchaError("");
							}}
							required
						  />

						  {captchaError && (
							<div
							  style={{
								color: "#dc3545",
								marginTop: "8px",
								fontSize: "14px",
							  }}
							>
							  {captchaError}
							</div>
						  )}
						</div>

						<div className="col-md-12 mb-4">
						  <div className="d-flex align-items-center gap-3">

							<div className="captcha_text">
							  {captchaValue}
							</div>

							<button
							  type="button"
							  className="btn btn-primary btn-sm"
							  onClick={generateCaptcha}
							>
							  <i className="fa fa-refresh"></i>
							</button>

						  </div>
						</div>

						<div className="col-md-12 text-center">
						  <button
							type="submit"
							className="btn_one"
							disabled={loading}
						  >
							{loading ? "Please Wait..." : "Submit"}
						  </button>
						</div>

					  </div>
					</form>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Unsubscribe;