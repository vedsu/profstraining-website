import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";

function SuggestTopic() {
	const [successMsg, setSuccessMsg] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    job_title: "",
    topic: "",
  });

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
        Name: formData.name,
        Email: formData.email,
        Phone_Number: formData.phone,
        Date: formData.job_title,
        Message: formData.topic,
        Website: WEBSITE,
      };

      console.log("PAYLOAD:", payload);

      const response = await axios.post(
        `${API_URL}/contactus`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

		console.log("API RESPONSE:", response.data);

		setSuccessMsg("Topic Suggestion Submitted Successfully");

		setTimeout(() => {
		  setSuccessMsg("");
		}, 5000);

      setFormData({
        name: "",
        email: "",
        phone: "",
        job_title: "",
        topic: "",
      });

    } catch (error) {
      console.log(
        "API ERROR:",
        error.response?.data || error
      );

      setErrorMsg(
		  error.response?.data?.Message ||
		  "Unable to submit"
		);

		setTimeout(() => {
		  setErrorMsg("");
		}, 5000);
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
        <title>
          Suggest a Professional Webinar Topic | Profs Training
        </title>
        <meta
          name="description"
          content="Suggest a webinar topic for Profs Training and help us create relevant professional courses in compliance, healthcare, HR, finance, IT, and pharma."
        />
      </Helmet>

      <section className="section-top">
        <div className="container">
          <div className="col-lg-10 offset-lg-1 text-center">
            <div className="section-top-title wow fadeInRight">
              <h1>Suggest a Topic</h1>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li> / Suggest a Topic</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div
        id="contact"
        className="contact_area section-padding"
      >
        <div className="container">
		
		<div className="row justify-content-center mb-5 mt-5 mt-md-0">
            <div className="col-lg-10 text-center">
              <p className="unsubscribe_text">
              Share a topic you'd like us to cover. Your ideas help us create more valuable learning experiences.
              </p>
            </div>
         </div>
		
          <div className="row justify-content-center">
            <div
              className="col-lg-10 col-sm-12 col-xs-12 wow fadeInUp"
            >
              <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body p-4 p-lg-5">
                  <div className="contact">
					{successMsg && (
					  <div className="alert alert-success mb-4">
						{successMsg}
					  </div>
					)}
					
					{errorMsg && (
					  <div className="alert alert-danger mb-4">
						{errorMsg}
					  </div>
					)}
                    <form
                      className="form"
                      onSubmit={handleSubmit}
                    >
                      <div className="row">

                        <div className="form-group col-md-6">
                          <label>
                            Name{" "}
                            <span className="text-danger">
                              *
                            </span>
                          </label>

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
                          <label>
                            Your Email{" "}
                            <span className="text-danger">
                              *
                            </span>
                          </label>

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
                          <label>
                            Phone{" "}
                            <span className="text-danger">
                              *
                            </span>
                          </label>

                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="Your Phone Number"
                            value={formData.phone}
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
                            placeholder="Your Job Title"
                            value={formData.job_title}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group col-md-12">
                          <label>
                            Topic Suggestion
                          </label>

                          <textarea
                            rows="6"
                            name="topic"
                            className="form-control"
                            placeholder="Enter your topic suggestion"
                            value={formData.topic}
                            onChange={handleChange}
                          ></textarea>
                        </div>
						
                        <div className="col-md-12 text-center">
                          <button
                            type="submit"
                            className="btn_one"
                            disabled={loading}
                          >
                            {loading
                              ? "Submitting..."
                              : "Submit"}
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

export default SuggestTopic;