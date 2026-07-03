import { useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";


function Subscribe() {

const [notification, setNotification] = useState("weekly");

const [formData, setFormData] = useState({
  subscriber_name: "",
  subscriber_email: "",
  subscriber_phone: "",
  subscriber_jobtitle: "",
  subscriber_country: "",
  industry: "",
});

const [successMsg, setSuccessMsg] = useState("");
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const payload = {
      subscriber_email: formData.subscriber_email,
      subscriber_name: formData.subscriber_name,
      subscriber_phone: formData.subscriber_phone,
      subscriber_jobtitle: formData.subscriber_jobtitle,
      subscriber_country: formData.subscriber_country,
      industry: formData.industry,
      subscription_type:
        notification === "weekly"
          ? "Weekly Newsletter"
          : "Monthly Newsletter",
      Website: WEBSITE,
    };

    const response = await axios.post(
      `${API_URL}/subscribe?website=${WEBSITE}`,
      payload
    );

    console.log(response.data);

    if (response.data.success) {
      setSuccessMsg(
  response.data.message.charAt(0).toUpperCase() +
  response.data.message.slice(1)
);

     // Auto hide after 3 seconds
  setTimeout(() => {
    setSuccessMsg("");
  }, 3000);

  setFormData({
    subscriber_name: "",
    subscriber_email: "",
    subscriber_phone: "",
    subscriber_jobtitle: "",
    subscriber_country: "",
    industry: "",
  });

      setNotification("weekly");
    }
  } catch (error) {
    console.log(error);
    alert("Unable to subscribe");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      
	<Helmet>
        <title>Subscribe for Webinar Updates | Profs Training Online </title>
        <meta
          name="description"
          content="Subscribe to Profs Training for webinar updates, expert-led courses, industry training alerts, and professional development opportunities."
        />
     </Helmet>
		<section className="section-top">
			<div className="container">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>Subscribe</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / Subscribe</li>
						</ul>
					</div>
				</div>
			</div>
		</section>	
		
		
		<style>{`
		
		.form-check-input{
			appearance: auto !important;
			-webkit-appearance: auto !important;
			-moz-appearance: auto !important;

			width: 16px !important;
			height: 16px !important;

			min-width: 16px !important;
			min-height: 16px !important;

			box-shadow: none !important;
			transform: none !important;

			cursor: pointer;
			vertical-align: middle;
		}


		.form-check-input[type="radio"]{
			border-radius: 50% !important;
		}


		.form-check-input[type="checkbox"]{
			border-radius: 3px !important;
		}


		.form-check-input:checked{
			background-color: #0d6efd !important;
			border-color: #0d6efd !important;
		}


		.form-check-label{
			cursor: pointer;
			margin-left: 4px;
		}


		.form-check-inline{
			margin-right: 18px;
		}
			

		.form-check.form-check-inline {
			margin-top: 26px;
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
             Subscribe for exclusive updates on webinars, expert-led training, new courses, and professional development opportunities.
              </p>
            </div>
         </div>
        
        <div className="row justify-content-center">

            <div className="col-lg-10 col-md-10 col-12 wow fadeInUp"
                 data-wow-duration="1s"
                 data-wow-delay="0.2s"
                 data-wow-offset="0">

                 <div className="card border-0 shadow-lg rounded-4">

                    <div className="card-body p-4 p-lg-5">
							
                    <div className="contact">
					{successMsg && (
						  <div className="alert alert-success mb-4 text-center">
							{successMsg}
						  </div>
						)}
						
                       <form className="form" onSubmit={handleSubmit}>

                            <div className="row">

                               
                                <div className="form-group col-md-6 mb-2">
                                    <label>Name <span className="text-danger">*</span></label>

                                   <input
									  type="text"
									  name="subscriber_name"
									  className="form-control"
									  placeholder="Your Name"
									  value={formData.subscriber_name}
									  onChange={handleChange}
									  required
									/>
                                </div>
								
								<div className="form-group col-md-6 mb-2">
                                    <label>Email <span className="text-danger">*</span></label>

                                    <input
										  type="email"
										  name="subscriber_email"
										  className="form-control"
										  placeholder="Your Email"
										  value={formData.subscriber_email}
										  onChange={handleChange}
										  required
										/>
								</div>
								<div className="form-group col-md-6 mb-2">
                                    <label>Phone <span className="text-danger">*</span></label>
								
                                   <input
										  type="text"
										  name="subscriber_phone"
										  className="form-control"
										  placeholder="Your Phone"
										  value={formData.subscriber_phone}
										  onChange={handleChange}
										  required
										/>
                                </div>
								
								 <div className="form-group col-md-6 mb-2">
                                    <label>Job Title</label>

                                   <input
										  type="text"
										  name="subscriber_jobtitle"
										  className="form-control"
										  placeholder="Job Title"
										  value={formData.subscriber_jobtitle}
										  onChange={handleChange}
										  
										/>
                                </div>
								
								
								<div className="form-group col-md-12 mb-3">
									<label>Your Industry</label>

									<select
										  name="industry"
										  className="form-control"
										  value={formData.industry}
										  onChange={handleChange}
										>
										  <option value="">---------Select Industry---------</option>
										  <option value="Healthcare">Healthcare</option>
										  <option value="IT">IT</option>
										  <option value="Finance">Finance</option>
										  <option value="Education">Education</option>
										  <option value="Manufacturing">Manufacturing</option>
										  <option value="Retail">Retail</option>
										</select>
								</div>

								
								<div className="form-group col-md-12 mb-2">
									<label>Country</label>

									<select
										  name="subscriber_country"
										  className="form-control"
										  value={formData.subscriber_country}
										  onChange={handleChange}
										  
										>
										  <option value="">Select Country</option>
										  <option value="India">India</option>
										  <option value="USA">USA</option>
										  <option value="UK">UK</option>
										  <option value="Canada">Canada</option>
										  <option value="Australia">Australia</option>
										</select>
								</div>
								
								<div className="form-group col-md-12 mb-2">
									  <div className="row align-items-center">

										<div className="col-md-2">
										  <label className="fw-bold mb-0">
											Notification
										  </label>
										</div>

										<div className="col-md-10">

										  <div className="form-check form-check-inline">
											<input
											  className="form-check-input"
											  type="radio"
											  name="notification"
											  id="weekly"
											  value="weekly"
											  checked={notification === "weekly"}
											  onChange={(e) => setNotification(e.target.value)}
											/>

											<label className="form-check-label" htmlFor="weekly">
											  Weekly
											</label>
										  </div>

										  <div className="form-check form-check-inline">
											<input
											  className="form-check-input"
											  type="radio"
											  name="notification"
											  id="monthly"
											  value="monthly"
											  checked={notification === "monthly"}
											  onChange={(e) => setNotification(e.target.value)}
											/>

											<label className="form-check-label" htmlFor="monthly">
											  Monthly
											</label>
										  </div>

										</div>

									  </div>
								</div>

							
								
								<div className="form-group col-md-12 mb-4">

									<div className="form-check d-flex align-items-start">

										<input className="form-check-input"
											   type="checkbox" defaultChecked
											   id="terms" />

										<label className="form-check-label terms_text ms-2" htmlFor="terms">

											By Agreeing to our Terms of Service and privacy policy,
											you can receive mail notifications.

											Enjoy a <span>$30</span> discount on your first event,
											and subscribe to our newsletter with the option
											to unsubscribe anytime.

										</label>

									</div>

								</div>

                                
                                <div className="col-md-12 text-center">
									<button
									  type="submit"
									  className="btn_one"
									  disabled={loading}
									>
									  {loading ? "Please Wait..." : "Subscribe"}
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
	</div>

     
    </>
  );
}

export default Subscribe;