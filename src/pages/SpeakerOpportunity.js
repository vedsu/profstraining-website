
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";


function SpeakerOpportunity() {
	
	const [formData, setFormData] = useState({
	  name: "",
	  email: "",
	  job_title: "",
	  company: "",
	  phone: "",
	  industries: "",
	  fax: "",
	});

	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState("");

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
		  Name: formData.name,
		  Email: formData.email,
		  Education: formData.job_title, // Job Title
		  Country: formData.company,     // Company
		  Phone: formData.phone,
		  Industries: formData.industries,
		  Bio: formData.fax, // Fax
		  Website: WEBSITE		  
		};
		
		console.log(payload);

		const response = await axios.post(
		  `${API_URL}/speakeropportunity`,
		  payload
		);

		console.log(response.data);

		setSuccessMsg("Speaker Opportunity Submitted Successfully");

		setTimeout(() => {
		  setSuccessMsg("");
		}, 3000);

		setFormData({
		  name: "",
		  email: "",
		  job_title: "",
		  company: "",
		  phone: "",
		  industries: "",
		  fax: "",
		});

	  } catch (error) {
		console.log("Full Error =>", error);
  console.log("Response =>", error.response);
  console.log("Response Data =>", error.response?.data);

  alert(
    error.response?.data?.Message ||
    error.response?.data?.message ||
    "Unable to submit"
  );
	  } finally {
		setLoading(false);
	  }
	};


  return (
    <>
	
	<style>{`
	.unsubscribe_text {
    font-size: 22px;
    line-height: 38px;
    color: #222;
}
	`}</style>
	
	<Helmet>
        <title>Speaker Opportunity | Profs Training Webinars Online</title>
        <meta
          name="description"
          content="Apply to speak with Profs Training and share your expertise through live webinars, industry education, and professional training sessions."
        />
     </Helmet>
    
		<section className="section-top">
			<div className="container">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>Speaker Opportunity</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / Speaker Opportunity</li>
						</ul>
					</div>
				</div>
			</div>
		</section>	
		
				
		<div id="contact" className="contact_area section-padding">
			<div className="container">		

				<div className="row justify-content-center mb-5 mt-5 mt-md-0">
					<div className="col-lg-10 text-center">
					  <p className="unsubscribe_text">
						Share your expertise through live webinars and industry training sessions.
					  </p>
					</div>
				</div>			
				<div className="row justify-content-center">					
					<div className="col-lg-10 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0">	
						<div className="card border-0 shadow-lg rounded-4">

							<div className="card-body p-4 p-lg-5">					
								<div className="contact">
									<form className="form" onSubmit={handleSubmit}>
										<div className="row">
											<div className="form-group col-md-6">
												<label>Name <span className="text-danger">*</span></label>
													<input
													  type="text"
													  name="name"
													  className="form-control"
													  placeholder="Your Name"
													  value={formData.name}
													  onChange={handleChange}
													  required
													/>
											</div>
											
											
											<div className="form-group col-md-6">
												<label>Email <span className="text-danger">*</span></label>
												<input
												  type="email"
												  name="email"
												  className="form-control"
												  placeholder="Your Email"
												  value={formData.email}
												  onChange={handleChange}
												  required
												/>
											</div>
											<div className="form-group col-md-6">
												<label>Job Title</label>
													<input
													  type="text"
													  name="job_title"
													  className="form-control"
													  placeholder="Job Title"
													  value={formData.job_title}
													  onChange={handleChange}
													/>
											</div>
											
											<div className="form-group col-md-6">
												<label>Company</label>
												<input
												  type="text"
												  name="company"
												  className="form-control"
												  placeholder="Company"
												  value={formData.company}
												  onChange={handleChange}
												/>
											</div>
											
											<div className="form-group col-md-6">
												<label>Phone <span className="text-danger">*</span></label>
													<input
													  type="text"
													  name="phone"
													  className="form-control"
													  placeholder="Phone"
													  value={formData.phone}
													  onChange={handleChange}
													  required
													/>
											</div>
											
											<div className="form-group col-md-6">
												<label>Fax </label>
												<input
												  type="text"
												  name="fax"
												  className="form-control"
												  placeholder="Fax"
												  value={formData.fax}
												  onChange={handleChange}
												/>
											</div>
											
											<div className="form-group col-md-12">
												<label>Industries</label>
												<textarea
												  rows="4"
												  name="industries"
												  className="form-control"
												  placeholder="Industries"
												  value={formData.industries}
												  onChange={handleChange}
												/>
											</div>
											<div className="col-md-12 text-center">
												<button type="submit" value="Send message" name="submit" id="submitButton" className="btn_one" title="Submit Your Message!">Submit</button>
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

export default SpeakerOpportunity;