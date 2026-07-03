import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
        subject: formData.subject,
        Message: formData.message,
        Website: WEBSITE,
      };

      console.log("Payload =>", payload);

      const response = await axios.post(
        `${API_URL}/contactus?website=${WEBSITE}`,
        payload
      );

      console.log("Response =>", response.data);

      setSuccessMsg("Contact Request Submitted Successfully");

      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
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
	<Helmet>
	  <title>Contact Profs Training | Webinar Support Help Desk </title>
	  <meta
		name="description"
		content="Contact Profs Training for questions about webinars, course access, speaker opportunities, subscriptions, and professional training support."
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
              <h1>Get In Touch</h1>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li> / Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="address_area section-padding">
        <div className="container">
          <div className="row text-center">
            <div
              className="col-lg-6 col-sm-6 col-xs-12 no-padding wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.1s"
              data-wow-offset="0"
            >
              <div className="single_address sa_one">
                <i className="ti-mobile"></i>
                <h4>Telephone</h4>
                <p>
				  <a
					href="tel:+18444453653"
					style={{ color: "inherit", textDecoration: "none" }}
				  >
					(+1) 844-445-3653
				  </a>
				</p>
              </div>
            </div>

            <div
              className="col-lg-6 col-sm-6 col-xs-12 no-padding wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.1s"
              data-wow-offset="0"
            >
              <div className="single_address sa_two">
                <i className="ti-email"></i>
                <h4>Send Email</h4>
                <p>
				  <a href="mailto:support@profstraining.com" style={{ color: "inherit", textDecoration: "none" }}>
					support@profstraining.com
				  </a>
				</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="contact" className="contact_area section-padding contact-page">
        <div className="container">
          <div className="row justify-content-center">

            <div
              className="col-lg-10 col-md-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
            >
              <div className="card shadow border-0 rounded-4">
                <div className="card-body p-4 p-md-5">

                  <div className="contact">

                    {successMsg && (
                      <div className="alert alert-success text-center mb-4">
                        {successMsg}
                      </div>
                    )}

                    <form className="form" onSubmit={handleSubmit}>
                      <div className="row">

                        <div className="form-group col-md-6 mb-4">
                          <label className="form-label fw-semibold">
                            Name <span className="text-danger">*</span>
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

                        <div className="form-group col-md-6 mb-4">
                          <label className="form-label fw-semibold">
                            Your Email <span className="text-danger">*</span>
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

                        <div className="form-group col-md-12 mb-4">
                          <label className="form-label fw-semibold">
                            Your Subject <span className="text-danger">*</span>
                          </label>

                          <input
                            type="text"
                            name="subject"
                            className="form-control"
                            placeholder="Your Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group col-md-12 mb-4">
                          <label className="form-label fw-semibold">
                            Your Message <span className="text-danger">*</span>
                          </label>

                          <textarea
                            rows="6"
                            name="message"
                            className="form-control"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>

                        <div className="col-md-12 text-center">
                          <button
                            type="submit"
                            className="btn_one px-5 py-3"
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
      </div>
    </>
  );
}

export default Contact;