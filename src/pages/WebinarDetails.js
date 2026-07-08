import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { API_URL, WEBSITE } from "../config";


function WebinarDetails() {

  const { slug } = useParams();
  const navigate = useNavigate();

  const [webinar, setWebinar] = useState(null);
  
  const [total, setTotal] = useState(0);

	const [selected, setSelected] = useState({
	  live: false,
	  recording: false,
	  download: false,
	  transcript: false,
	});
	
	
	const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
	const [modalTab, setModalTab] = useState("login");

	const [loginData, setLoginData] = useState({
	  Email: "",
	  Password: "",
	});

	const [registerData, setRegisterData] = useState({
	  Name: "",
	  Email: "",
	  Password: "",
	  Contact: "",
	  Role: "",
	  UserType: "",
	});
	
	

const handleModalLogin = async (e) => {
  e.preventDefault();
  if (!loginData.Email || !loginData.Password) {
    alert("Please enter email and password");
    return;
  }
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        Email: loginData.Email,
        Password: loginData.Password,
        UserType: loginData.UserType,
        Website: WEBSITE,
      }
    );
    if (response.data.success) {
      sessionStorage.setItem("USERINFO", JSON.stringify(response.data.message));
      setShowLoginRegisterModal(false);
      addToCart();
    } else {
      alert("Invalid Credentials");
    }
  } catch (error) {
    alert("Login Failed");
  }
};

const handleModalRegister = async (e) => {
  e.preventDefault();
  
  if (!registerData.Name || !registerData.Email || !registerData.Password || !registerData.Contact) {
    alert("Please fill all required fields");
    return;
  }
  
  const formData = new FormData();
  formData.append("Name", registerData.Name);
  formData.append("Email", registerData.Email);
  formData.append("Password", registerData.Password);
  formData.append("Contact", registerData.Contact);
  formData.append("Role", registerData.Role);
  formData.append("UserType", registerData.UserType);
  formData.append("Website", WEBSITE);
  
  try {
	  
    const response = await axios.post(
      `${API_URL}/register`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
	  
    );
	
    if (response.data.success) {
		
      alert("Registration Successful");
      sessionStorage.setItem("USERINFO", JSON.stringify(response.data.message));
      setShowLoginRegisterModal(false);
      addToCart();
	  
    } else {
      alert(response.data.message || "Registration Failed");
    }
	
  } catch (error) {
    if (error.response && error.response.status === 203) {
      alert(error.response.data.message || "User already registered");
    } else {
      alert("Registration Failed");
    }
  }
};

  useEffect(() => {

    axios
      .get(
        `${API_URL}/webinar/${slug}?Website=${WEBSITE}`
      )
      .then((res) => {

        console.log("WEBINAR DETAILS:", res.data);

        setWebinar(res.data);

		const savedSelection = sessionStorage.getItem(
		  `selected_${res.data.id}`
		);

		if (savedSelection) {

		  const parsed = JSON.parse(savedSelection);

		  setSelected(parsed);

		  let totalAmount = 0;

		  if (parsed.live)
			totalAmount += Number(res.data.priceLive || 0);

		  if (parsed.recording)
			totalAmount += Number(res.data.priceRecording || 0);

		  if (parsed.download)
			totalAmount += Number(res.data.priceDigitalDownload || 0);

		  if (parsed.transcript)
			totalAmount += Number(res.data.priceTranscript || 0);

		  setTotal(totalAmount);
		}

      })
      .catch((err) => {
        console.log(err);
      });

  }, [slug]);

  if (!webinar) {
    return (
      <div className="container text-center py-5">
        <h3>Loading...</h3>
      </div>
    );
  }
  
  
  const handleCheckbox = (type) => {

  const updated = {
    ...selected,
    [type]: !selected[type],
  };

  setSelected(updated);
  
  sessionStorage.setItem(
  `selected_${webinar.id}`,
  JSON.stringify(updated)
);

  let totalAmount = 0;

  if (updated.live) {
    totalAmount += Number(webinar.priceLive || 0);
  }

  if (updated.recording) {
    totalAmount += Number(webinar.priceRecording || 0);
  }

  if (updated.download) {
    totalAmount += Number(webinar.priceDigitalDownload || 0);
  }

  if (updated.transcript) {
    totalAmount += Number(webinar.priceTranscript || 0);
  }

  setTotal(totalAmount);
};




const addToCart = () => {

  if (total === 0) {
    alert("Please select at least one training option");
    return;
  }

  const selectedOptions = [];

  if (selected.live) {
    selectedOptions.push({
      name: "Live Session",
      price: webinar.priceLive || 0,
    });
  }

  if (selected.recording) {
    selectedOptions.push({
      name: "Recording",
      price: webinar.priceRecording || 0,
    });
  }

  if (selected.download) {
    selectedOptions.push({
      name: "Digital Download",
      price: webinar.priceDigitalDownload || 0,
    });
  }

  if (selected.transcript) {
    selectedOptions.push({
      name: "Transcript PDF",
      price: webinar.priceTranscript || 0,
    });
  }

  const cartItemsToAdd = [];

  selectedOptions.forEach((option) => {

    cartItemsToAdd.push({
      webinarId: webinar.id,
      webinarSlug: webinar.webinar_url,
      title: webinar.topic,
      speaker: webinar.speaker,
      category: webinar.category,
	  
	    date: webinar.date,          // ADD THIS
    time: webinar.time,          // optional
    duration: webinar.duration,  // optional

      optionName: option.name,
      price: Number(option.price),

      quantity: 1,
      totalPrice: Number(option.price),
    });

  });
  
  
  const existingCart =
    JSON.parse(sessionStorage.getItem("cart")) || [];

  const updatedCart = [...existingCart];

	cartItemsToAdd.forEach((newItem) => {

	  const exists = updatedCart.find(
		(item) =>
		  item.webinarId === newItem.webinarId &&
		  item.optionName === newItem.optionName
	  );

	  if (!exists) {
		updatedCart.push(newItem);
	  }

	});

  sessionStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

 // alert("Added to cart successfully");

  navigate("/Cart");
};

  return (
  

    <>
     <style>{`

.training-options-box{
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid #ececec;
    box-shadow: 0 6px 20px rgba(0,0,0,0.05);
}


.training-header{
    background: linear-gradient(90deg,#efdfc9,#dfe3ff);
    padding: 18px 15px;
    text-align: center;
    border-bottom: 1px solid #ececec;
}

.training-header h3{
    margin: 0;
    font-size: 20px;
    font-weight: 800;
    color: #082567;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}


.training-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #f1f1f1;
    transition: 0.3s;
}

.training-item:hover{
    background: #fafbff;
}


.training-left{
    font-size: 15px;
    color: #3c3c3c;
    font-weight: 500;
    line-height: 1.5;
    width: 68%;
}


.training-right{
    display: flex;
    align-items: center;
    gap: 14px;
}


.training-price{
    font-size: 16px;
    font-weight: 700;
    color: #082567;
    min-width: 65px;
    text-align: right;
}


.training-check{
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: #5663e9;
}

/* Total */
.training-total{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px;
    background: #fafafa;
}

.training-total h4{
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #082567;
}

.training-total .total-price{
    font-size: 22px;
    font-weight: 800;
    color: #5663e9;
}


.cart-btn-area{
    padding: 0 20px 20px;
    text-align: right;
}

.cart-btn{
    display: inline-block;
    background: linear-gradient(90deg,#5663e9,#6c63ff);
    color: #fff;
    padding: 11px 19px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: 0.3s;
}

.cart-btn:hover{
    background: #f26b65;
    color: #fff;
}


@media(max-width:991px){

    .training-options-box{
        margin-top: 30px;
    }
}

@media(max-width:767px){

    .training-item{
        padding: 14px 16px;
    }

    .training-header h3{
        font-size: 18px;
    }

    .training-total h4{
        font-size: 17px;
    }

    .training-total .total-price{
        font-size: 20px;
    }

    .cart-btn{
        width: 100%;
        text-align: center;
    }
}




@media(max-width:767px){

    .single_event_text_single h4{
        font-size: 24px !important;
        line-height: 1.4;
        margin-bottom: 15px;
        word-break: break-word;
    }
		
   
    .training-options-box{
        margin-top: 25px;
    }

    .container{
        padding-left: 15px;
        padding-right: 15px;
    }
}



.register-modal-overlay{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.6);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:99999;
}

.register-modal{
    background:#fff;
    width:500px;
    max-width:95%;
    padding:30px;
    border-radius:10px;
    position:relative;
}

.register-modal h3{
    text-align:center;
    margin-bottom:20px;
    color:#082567;
    font-weight:700;
}

.register-modal input{
    width:100%;
    padding:12px;
    margin-bottom:15px;
    border:1px solid #ddd;
    border-radius:6px;
}

.close-modal{
    position:absolute;
    right:15px;
    top:10px;
    background:none;
    border:none;
    font-size:30px;
    cursor:pointer;
}
	 `}</style>

	
		<section className="section-top">
			<div className="container">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>{webinar.topic}</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / Webinars Details</li>
						</ul>
					</div>
				</div>
			</div>
		</section>	
		
		<style>{`
		.btn-order{
		
        background-color: #0b104a;
    color: #ffffff;
      border-style: groove;
       border-color: #0b104a;
    border-radius: 6px;
    padding: 2px;
	    font-size: inherit;
}


.speaker-bio{
    margin-top:20px;
    text-align:left;
    line-height:1.8;
    font-size:16px;
}

.speaker-bio p{
    margin-bottom:15px;
}

.speaker-bio ul{
    padding-left:20px;
}

.speaker-bio li{
    margin-bottom:8px;
}

.instructor-thumb img {
    width: 12%;
}


.user-type-row{
    display:flex;
    justify-content:space-between;
    margin-bottom:20px;
}

.user-type-label{
   
    align-items:center;
    gap:8px;
    font-size:16px;
    font-weight:500;
    cursor:pointer;
}

.user-type-label input{
    width:18px;
    height:18px;
    cursor:pointer;
}

.detail-icon{
    font-size:16px;
   color: #cdc4c4;
    margin-right:15px;
    margin-top:4px;
    flex-shrink:0;
}

button.btn_one.webinar-details {
    padding: 8px 20px !important;
    font-size: 15px;
    border-radius: 4px;
    min-width: 140px;
}
		
	 `}</style>
		
		<section className="our_event section-padding">
			<div className="container">
				<div className="row">	
					<div className="col-12 col-lg-8">
						<div className="single_event_single">
							
							<div className="card shadow-sm border-0 mb-4 webinar-info-card">

  <div className="card-body">

    <div className="row g-4">

      {/* Date */}
      <div className="col-lg-3 col-md-6 col-12">

        <div className="d-flex">

        <i className="fa fa-calendar detail-icon"></i>

          <div>

            <small className="text-muted d-block">
              Date
            </small>

            <strong>

              {webinar.sessionLive ? (
                new Date(webinar.date).toLocaleDateString("en-US",{
                  weekday:"long",
                  month:"long",
                  day:"numeric",
                  year:"numeric",
                })
              ) : (
                "All Days"
              )}

            </strong>

          </div>

        </div>

      </div>


      {/* Time */}

      <div className="col-lg-3 col-md-6 col-12">

        <div className="d-flex">

          <i className="fa fa-clock-o detail-icon"></i>

          <div>

            <small className="text-muted d-block">
              Time
            </small>

            <strong>

              {webinar.sessionLive ? (
                <>
                  {new Date(`2000-01-01 ${webinar.time}`).toLocaleTimeString(
                    "en-US",
                    {
                      hour:"2-digit",
                      minute:"2-digit",
                      hour12:true,
                    }
                  )} ET
                </>
              ) : (
                <>
                  <b>Access:</b> 6 Months
                </>
              )}

            </strong>

          </div>

        </div>

      </div>


      {/* Duration */}

      <div className="col-lg-3 col-md-6 col-12">

        <div className="d-flex">

         <i className="fa fa-hourglass-half detail-icon"></i>

          <div>

            <small className="text-muted d-block">
              Duration
            </small>

            <strong>

              {webinar.sessionLive
                ? `${webinar.duration} Minutes`
                : "6 Months"}

            </strong>

          </div>

        </div>

      </div>


      {/* Webinar ID */}

      <div className="col-lg-3 col-md-6 col-12">

        <div className="d-flex">

          <i className="fa fa-id-card detail-icon"></i>

          <div>

            <small className="text-muted d-block">
              Webinar ID
            </small>

            <strong>
              {`PT${webinar.speaker_id}00${webinar.id}`}
            </strong>

          </div>

        </div>

      </div>

    </div>

    <hr />

    <div className="text-lg-end text-center">

      <button
        className="btn_one webinar-details"
        onClick={() =>
          window.open(
            `/order-form/${webinar.webinar_url}`,
            "_blank"
          )
        }
      >
        Order Form
      </button>

    </div>

  </div>

</div>

<div
  dangerouslySetInnerHTML={{
    __html: webinar.description,
  }}
/>
						</div>
                            <div className="course-details-content section-bg">
                                <ul className="nav nav-tabs" role="tablist">
                                  
                                    <li className="nav-item">
                                        <a href="#instructor" className="nav-link active" data-bs-toggle="tab">Speaker</a>
                                    </li>
                                  
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                  
                                  
                                    <div className="tab-pane show fade active" id="instructor">
                                        <div className="overview text-center">
                                            <div className="instructor-item">
                                                <div className="instructor-thumb">
                                                   
														  <img
															src={webinar.speaker_image}
															alt={webinar.speaker}
														  />
														
                                                </div>
                                                <div className="instructor-content">
                                                    <h6 className="title">
													  {webinar.speaker}
													</h6>
                                                    <span className="details">{webinar.industry}</span>
                                                </div>
                                            </div>
                                           <div
											  className="speaker-bio"
											  dangerouslySetInnerHTML={{
												__html: webinar.speaker_bio || ""
											  }}
											/>

                                          
                                        </div>
                                    </div>
                             
                                </div>
                            </div>						
					</div>
				<div className="col-12 col-lg-4">
    
	<div className="training-options-box">

    
			<div className="training-header">
				<h3>Training Options</h3>
			</div>

   
		    {webinar.sessionLive && (
				<div className="training-item">
					<div className="training-left">Live Session</div>

					<div className="training-right">
					  <div
						className="training-price"
						data-price={webinar.priceLive || 0}
					  >
						${webinar.priceLive || 0}
					  </div>

					  <input
						type="checkbox"
						className="training-check"
						checked={selected.live}
						onChange={() => handleCheckbox("live")}
					  />
					</div>
				</div>
		    )}

   
    <div className="training-item">
		<div className="training-left">Recording</div>
			<div className="training-right">
				<div className="training-price" data-price={webinar.priceRecording || 0}>
				  ${webinar.priceRecording || 0}
				</div>
				<input
				  type="checkbox"
				  className="training-check"
				  checked={selected.recording}
				  onChange={() => handleCheckbox("recording")}
				/>
			</div>
		</div>

   
    <div className="training-item">
	  <div className="training-left">Digital Download</div>
		<div className="training-right">
			<div className="training-price" data-price={webinar.priceDigitalDownload || 0}>
			  ${webinar.priceDigitalDownload || 0}
			</div>
			<input
			  type="checkbox"
			  className="training-check"
			  checked={selected.download}
			  onChange={() => handleCheckbox("download")}
			/>
		</div>
	</div>

   
    <div className="training-item">
		<div className="training-left">Transcript (PDF)</div>
			<div className="training-right">
				<div className="training-price" data-price={webinar.priceTranscript || 0}>
				  ${webinar.priceTranscript || 0}
				</div>
				<input
				  type="checkbox"
				  className="training-check"
				  checked={selected.transcript}
				  onChange={() => handleCheckbox("transcript")}
				/>
			</div>
		</div>

   
    

   
    <div className="training-total">
        <h4>Total</h4>
        <div className="total-price">${total}</div>
    </div>

  
    <div className="cart-btn-area">
        {sessionStorage.getItem("USERINFO") ? (
          <button className="cart-btn" onClick={addToCart}>
            Add to Cart
          </button>
        ) : (
          <>
           <button
			  className="cart-btn me-3 mb-2 mb-md-0"
			  onClick={() => {

				  // Guest checkout flag
				  sessionStorage.setItem("GUEST_CHECKOUT", "true");

				  addToCart();

			  }}
			>
			  Continue As Guest
			</button>
            <button
              className="cart-btn register-btn"
              onClick={() => setShowLoginRegisterModal(true)}
            >
              Login / Register
            </button>
          </>
        )}
    </div>

</div>

</div>
				</div>
			</div>
		</section>
		
		
    

{showLoginRegisterModal && (
  <div className="register-modal-overlay">
    <div className="register-modal">
      <button className="close-modal" onClick={() => setShowLoginRegisterModal(false)}>×</button>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <button
          className={`btn w-50 ${modalTab === "login" ? "btn_one" : "btn-light"}`}
          onClick={() => setModalTab("login")}
          style={{ borderRadius: "6px 0 0 6px" }}
        >Login</button>
        <button
          className={`btn w-50 ${modalTab === "register" ? "btn_one" : "btn-light"}`}
          onClick={() => setModalTab("register")}
          style={{ borderRadius: "0 6px 6px 0" }}
        >Register</button>
      </div>
      {modalTab === "login" ? (
        <form onSubmit={handleModalLogin}>
		
          <input type="email" placeholder="Email" value={loginData.Email} onChange={(e) => setLoginData({ ...loginData, Email: e.target.value })} required />
          <input type="password" placeholder="Password" value={loginData.Password} onChange={(e) => setLoginData({ ...loginData, Password: e.target.value })} required />
		  
			<div className="user-type-row">

				<label className="user-type-label me-4">
					<input
						type="radio"
						name="UserType"
						value="Attendee"
						required
						checked={loginData.UserType === "Attendee"}
						onChange={(e) =>
							setLoginData({
								...loginData,
								UserType: e.target.value,
							})
						}
					/>{" "}
					Customer
				</label>
			
				<label className="user-type-label">
					<input
						type="radio"
						name="UserType"
						value="Speaker"
						required
						checked={loginData.UserType === "Speaker"}
						onChange={(e) =>
							setLoginData({
								...loginData,
								UserType: e.target.value,
							})
						}
					/>{" "}
					Speaker
				</label>

			</div>
          <button type="submit" className="cart-btn" style={{ width: "100%" }}>Login & Continue</button>
        </form>
      ) : (
        <form onSubmit={handleModalRegister}>
          <input type="text" placeholder="Name" value={registerData.Name} onChange={(e) => setRegisterData({ ...registerData, Name: e.target.value })} required />
          <input type="email" placeholder="Email" value={registerData.Email} onChange={(e) => setRegisterData({ ...registerData, Email: e.target.value })} required />
          <input type="password" placeholder="Password" value={registerData.Password} onChange={(e) => setRegisterData({ ...registerData, Password: e.target.value })} required />
          <input type="text" placeholder="Contact" value={registerData.Contact} onChange={(e) => setRegisterData({ ...registerData, Contact: e.target.value })} required />
          <input type="text" placeholder="Role / Job Title" value={registerData.Role} onChange={(e) => setRegisterData({ ...registerData, Role: e.target.value })} />
		<div className="user-type-row">
		
			<label className="user-type-label me-4">
				<input
					type="radio"
					name="UserType"
					value="Attendee"
					required
					checked={registerData.UserType === "Attendee"}
					onChange={(e) =>
						setRegisterData({
							...registerData,
							UserType: e.target.value,
						})
					}
				/>{" "}
				Customer
			</label>

			<label className="user-type-label">
				<input
					type="radio"
					name="UserType"
					value="Speaker"
					required
					checked={registerData.UserType === "Speaker"}
					onChange={(e) =>
						setRegisterData({
							...registerData,
							UserType: e.target.value,
						})
					}
				/>{" "}
				Speaker
			</label>

		</div>
          <button type="submit" className="cart-btn" style={{ width: "100%" }}>Register & Continue</button>
        </form>
      )}
    </div>
  </div>
)}

    </>
  );
}


		

export default WebinarDetails;
