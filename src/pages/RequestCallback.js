import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";

function RequestCallback() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    preferred_datetime: "",
    message: "",
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
  Name: `${formData.first_name.trim()} ${formData.last_name.trim()}`,
  Email: formData.email,
  Phone: formData.phone,
  Date: formData.preferred_datetime,
  Message: formData.message,
  Website: WEBSITE,
};

    console.log("REQUEST PAYLOAD:", payload);

    const response = await axios.post(
      `${API_URL}/contactus`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "REQUEST CALLBACK RESPONSE:",
      response.data
    );

    alert("Request submitted successfully!");

    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      preferred_datetime: "",
      message: "",
    });

  } catch (error) {
    console.log(
      "REQUEST CALLBACK ERROR:",
      error.response?.data || error
    );

    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Helmet>
        <title>
          Request a Callback | Profs Training Webinar Support
        </title>
        <meta
          name="description"
          content="Request a callback from Profs Training to discuss webinars, course access, group training, registration support, or speaker opportunities."
        />
      </Helmet>

      <section className="section-top">
        <div className="container">
          <div className="col-lg-10 offset-lg-1 text-center">
            <div className="section-top-title">
              <h1>Request Callback</h1>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li> / Request Callback</li>
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
          <div className="row justify-content-center">
            <div className="col-lg-10 col-sm-12">
              <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body p-4 p-lg-5">
                  <div className="contact">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="form-group col-md-6 mb-3">
                          <label>
                            First Name{" "}
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group col-md-6 mb-3">
                          <label>
                            Last Name{" "}
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group col-md-6 mb-3">
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

                        <div className="form-group col-md-6 mb-3">
                          <label>
                            Phone Number{" "}
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group col-md-12 mb-3">
                          <label>
                            Preferred Date and Time{" "}
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <input
                            type="datetime-local"
                            name="preferred_datetime"
                            className="form-control"
                            value={
                              formData.preferred_datetime
                            }
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group col-md-12 mb-3">
                          <label>
                            Your Query{" "}
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <textarea
                            rows="6"
                            name="message"
                            className="form-control"
                            placeholder="Your Query"
                            value={formData.message}
                            onChange={handleChange}
                            required
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

export default RequestCallback;