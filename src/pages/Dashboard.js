import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";

const Dashboard = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(
    sessionStorage.getItem("USERINFO") || "{}"
  );

  const [profileOpen, setProfileOpen] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [recommendOpen, setRecommendOpen] = useState(false);

  const [webinars, setWebinars] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [historyPurchased, setHistoryPurchased] = useState([]);
  const [historyPending, setHistoryPending] = useState([]);
  const [newsletterPurchased, setNewsletterPurchased] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo.email) {
      navigate("/login-register");
      return;
    }
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const role = userInfo.UserType || "Attendee";
      const res = await axios.get(
        `${API_URL}/dashboard/${userInfo.email}/${role}?website=${WEBSITE}`
      );

      const data = res.data;

      if (role === "Speaker") {
        setWebinars(data[0] || []);
      } else {
        setWebinars(data[0] || []);
        setHistoryPending(data[1] || []);
        setHistoryPurchased(data[2] || []);
        setNewsletters(data[3] || []);
        setNewsletterPurchased(data[4] || []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };
console.log(newsletters);
  return (
    <div className="container-fluid py-4">
      <div className="row">

        {/* Left Section — Purchased Webinars */}
        <div className="col-lg-8">

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h3 className="fw-bold">INSTRUCTIONS :</h3>
              <ol className="mt-3">
                <li>Live: Access starts 24 hours before the session.</li>
                <li>Recording, Digital Download & Transcript: Available 24–48 hours after the live session.</li>
                <li>Transcript will be provided alongside purchases.</li>
              </ol>
            </div>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "350px" }}>
              <h4>Loading...</h4>
            </div>
          ) : webinars.length === 0 && newsletters.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "350px" }}>
              <h4>No purchased webinars or newsletters to show.</h4>
            </div>
          ) : (
            <>
              {webinars.map((item, idx) => (
                <div key={idx} className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h5 className="fw-bold">{item.webinar}</h5>
                    <p className="mb-1"><strong>Speaker:</strong> {item.speaker}</p>
                    <p className="mb-1"><strong>Date:</strong> {item.date} | <strong>Time:</strong> {item.time} {item.timeZone}</p>
                    <p className="mb-1"><strong>Duration:</strong> {item.duration} mins</p>
                    {item.order_type === "corporate" && (
                      <p className="mb-1"><strong>Attendees:</strong> {item.total_attendee}</p>
                    )}

                    <div className="mt-2 d-flex gap-2 flex-wrap">
                      {item.live_url && (
                        <a href={item.live_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                          Join Live
                        </a>
                      )}
                      {item.recording_url && (
                        <a href={item.recording_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                          Recording
                        </a>
                      )}
                      {item.digitaldownload_url && (
                        <a href={item.digitaldownload_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                          Digital Download
                        </a>
                      )}
                      {item.transcript_url && (
                        <a href={item.transcript_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                          Transcript
                        </a>
                      )}
                      {item.document && (
                        <a href={item.document} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary">
                          Invoice
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
			
              {newsletters.map((item, idx) => (
			
                <div key={`nl-${idx}`} className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h5 className="fw-bold">{item.newsletter}</h5>
                    <p className="mb-1"><strong>Published:</strong> {item.published_date}</p>
                    <div className="mt-2 d-flex gap-2 flex-wrap">
					
                      {item.newsletter_doc && (
                        <a href={item.newsletter_doc} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                          Download Newsletter
                        </a>
                      )}
                      {item.document && (
                        <a href={item.document} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary">
                          Invoice
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

        </div>

        {/* Right Section — Profile, History, Recommendations */}
        <div className="col-lg-4">

          {/* Profile */}
          <div className="card mb-3">
            <div
              className="card-header d-flex justify-content-between"
              style={{ cursor: "pointer" }}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <strong>Profile</strong>
              <span>{profileOpen ? "−" : "+"}</span>
            </div>
            {profileOpen && (
              <div className="card-body">
                <p><strong>Name:</strong> {userInfo.name}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Contact:</strong> {userInfo.contact}</p>
              </div>
            )}
          </div>

          {/* History */}
          <div className="card mb-3">
            <div
              className="card-header d-flex justify-content-between"
              style={{ cursor: "pointer" }}
              onClick={() => setHistoryOpen(!historyOpen)}
            >
              <strong>History</strong>
              <span>{historyOpen ? "−" : "+"}</span>
            </div>
            {historyOpen && (
              <div className="card-body">
                {newsletterPurchased.length > 0 && (
                  <>
                    <h6 className="fw-bold">Purchased Newsletter(s)</h6>
                    <ul className="list-unstyled">
                      {newsletterPurchased.map((nl, i) => (
                        <li key={i} className="mb-1">◈ {nl}</li>
                      ))}
                    </ul>
                  </>
                )}

                {historyPurchased.length > 0 && (
                  <>
                    <h6 className="fw-bold mt-3">Purchased Webinar(s)</h6>
                    <ul className="list-unstyled">
                      {historyPurchased.map((w, i) => (
                        <li key={i} className="mb-1">◈ {w}</li>
                      ))}
                    </ul>
                  </>
                )}

                {historyPending.length > 0 && (
                  <>
                    <h6 className="fw-bold mt-3">Pending Webinar(s)</h6>
                    <ul className="list-unstyled">
                      {historyPending.map((w, i) => (
                        <li key={i} className="mb-1">◈ {w}</li>
                      ))}
                    </ul>
                  </>
                )}

                {newsletterPurchased.length === 0 &&
                  historyPurchased.length === 0 &&
                  historyPending.length === 0 && (
                  <div className="text-center py-3">Nothing to show here.</div>
                )}
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="card">
            <div
              className="card-header d-flex justify-content-between"
              style={{ cursor: "pointer" }}
              onClick={() => setRecommendOpen(!recommendOpen)}
            >
              <strong>Recommendations</strong>
              <span>{recommendOpen ? "−" : "+"}</span>
            </div>
            {recommendOpen && (
              <div className="card-body">
                No recommendations available.
              </div>
            )}
          </div>

          <button className="btn btn-dark w-100 mt-3" onClick={logout}>
            Logout
          </button>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
