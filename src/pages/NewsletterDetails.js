import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { API_URL, WEBSITE } from "../config";

// ── Stripe card form — must live inside <Elements> ────────────────────────────
function NewsletterPayForm({ newsletter, billing, userEmail, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    try {
      const { token, error } = await stripe.createToken(
        elements.getElement(CardElement)
      );
      if (error) { onError(error.message); setBusy(false); return; }

      const invoiceNumber = "NL-" + Date.now();

      const piRes = await axios.post(
        `${API_URL}/create-payment-intent?website=${WEBSITE}`,
        {
          email: billing.email,
          name: billing.name,
          country: billing.country,
          amount: Number(newsletter.price),
          invoice_number: invoiceNumber,
          stripeToken: token.id,
        }
      );

      if (!piRes.data.success) {
        onError(piRes.data.error || "Payment failed");
        setBusy(false);
        return;
      }

      const fd = new FormData();
      fd.append("customeremail", userEmail);
      fd.append("billingemail", billing.email);
      fd.append("customername", billing.name);
      fd.append("country", billing.country);
      fd.append("zipcode", billing.zipcode || "N/A");
      fd.append("paymentstatus", "purchased");
      fd.append("topic", newsletter.topic);
      fd.append("orderamount", newsletter.price);
      fd.append("invoice_number", invoiceNumber);
      fd.append("order_datetimezone", new Date().toUTCString());
      fd.append("Website", WEBSITE);

      await axios.post(
        `${API_URL}/newsletterorder?website=${WEBSITE}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      onSuccess();
    } catch {
      onError("Payment failed. Please try again.");
    }
    setBusy(false);
  };

  return (
    <form onSubmit={handlePay}>
      <div style={{ border: "1px solid #ddd", padding: 14, borderRadius: 6, marginBottom: 14 }}>
        <CardElement options={{ hidePostalCode: true, style: { base: { fontSize: "15px" } } }} />
      </div>
      <button
        type="submit"
        disabled={!stripe || busy}
        className="pdf-btn"
        style={{ width: "100%", cursor: busy ? "wait" : "pointer" }}
      >
        {busy ? "Processing..." : `Pay $${newsletter.price}`}
      </button>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function NewsletterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newsletter, setNewsletter] = useState(null);

  // "idle" | "login" | "billing" | "payment" | "success" | "error"
  const [step, setStep] = useState("idle");
  const [pendingPaid, setPendingPaid] = useState(false);
  const [modalTab, setModalTab] = useState("login");
  const [authMsg, setAuthMsg] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [loginData, setLoginData] = useState({ Email: "", Password: "", UserType: "Attendee" });
  const [registerData, setRegisterData] = useState({
    Name: "", Email: "", Password: "", Contact: "", UserType: "Attendee",
  });

  const [billingData, setBillingData] = useState({ name: "", email: "", country: "", zipcode: "" });
  const [billingError, setBillingError] = useState("");
  const [payError, setPayError] = useState("");

  const [stripePromise, setStripePromise] = useState(null);

  const getUser = () => {
    try { return JSON.parse(sessionStorage.getItem("USERINFO") || "null"); }
    catch { return null; }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/newsletter_panel/${id}?website=${WEBSITE}`)
      .then((res) => {
        setNewsletter(res.data);
        if (Number(res.data.price) > 0) loadStripeKey();
      })
      .catch(console.log);
  }, [id]);

  const loadStripeKey = async () => {
    try {
      const res = await axios.get(`${API_URL}/variables?website=${WEBSITE}`);
      setStripePromise(loadStripe(res.data.message.stripe_publishable_key));
    } catch (e) {
      console.log(e);
    }
  };

  // ── Auth ──────────────────────────────────────────────────────────────────

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthMsg("");
    try {
      const res = await axios.post(`${API_URL}/login`, {
        Email: loginData.Email,
        Password: loginData.Password,
        UserType: loginData.UserType || "Attendee",
        Website: WEBSITE,
      });
      if (res.data.success) {
        sessionStorage.setItem("USERINFO", JSON.stringify(res.data.message));
        afterAuth(res.data.message);
      } else {
        setAuthMsg("Invalid credentials. Please try again.");
      }
    } catch {
      setAuthMsg("Login failed. Please try again.");
    }
    setAuthLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerData.Name || !registerData.Email || !registerData.Password || !registerData.Contact) {
      setAuthMsg("Please fill all required fields.");
      return;
    }
    setAuthLoading(true);
    setAuthMsg("");
    const fd = new FormData();
    fd.append("Name", registerData.Name);
    fd.append("Email", registerData.Email);
    fd.append("Password", registerData.Password);
    fd.append("Contact", registerData.Contact);
    fd.append("UserType", registerData.UserType || "Attendee");
    fd.append("Website", WEBSITE);
    try {
      const res = await axios.post(`${API_URL}/register`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        sessionStorage.setItem("USERINFO", JSON.stringify(res.data.message));
        afterAuth(res.data.message);
      } else {
        setAuthMsg(res.data.message || "Registration failed.");
      }
    } catch (err) {
      if (err.response?.status === 203) {
        setAuthMsg(err.response.data.message || "Email already registered. Please login.");
      } else {
        setAuthMsg("Registration failed. Please try again.");
      }
    }
    setAuthLoading(false);
  };

  const afterAuth = (user) => {
    if (pendingPaid) {
      setBillingData((b) => ({ ...b, email: user.email || "", name: user.name || "" }));
      setStep("billing");
    } else {
      placeNewsletterOrder(user.email, user.name || "");
    }
  };

  // ── Order placement ───────────────────────────────────────────────────────

  const placeNewsletterOrder = async (email, name) => {
    try {
      const fd = new FormData();
      fd.append("customeremail", email);
      fd.append("billingemail", email);
      fd.append("customername", name || "");
      fd.append("paymentstatus", "purchased");
      fd.append("topic", newsletter.topic);
      fd.append("orderamount", "0");
      fd.append("invoice_number", "NL-" + Date.now());
      fd.append("order_datetimezone", new Date().toUTCString());
      fd.append("Website", WEBSITE);

      await axios.post(
        `${API_URL}/newsletterorder?website=${WEBSITE}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setStep("success");
    } catch {
      setStep("error");
    }
  };

  // ── Button handlers ───────────────────────────────────────────────────────

  const handleGetFree = () => {
    const u = getUser();
    if (u) {
      placeNewsletterOrder(u.email, u.name || "");
    } else {
      setPendingPaid(false);
      setModalTab("login");
      setAuthMsg("");
      setStep("login");
    }
  };

  const handleBuyPaid = () => {
    const u = getUser();
    if (u) {
      setBillingData((b) => ({ ...b, email: u.email || "", name: u.name || "" }));
      setStep("billing");
    } else {
      setPendingPaid(true);
      setModalTab("login");
      setAuthMsg("");
      setStep("login");
    }
  };

  const handleBillingNext = (e) => {
    e.preventDefault();
    if (!billingData.name || !billingData.email || !billingData.country) {
      setBillingError("Please fill Name, Email and Country.");
      return;
    }
    setBillingError("");
    setPayError("");
    setStep("payment");
  };

  // ─────────────────────────────────────────────────────────────────────────

  if (!newsletter) {
    return (
      <div className="text-center py-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  const isFree = Number(newsletter.price) === 0;
  const u = getUser();

  return (
    <>
      <style>{`
.newsletter-detail-card{
    background:#fff;
    border-radius:16px;
    overflow:hidden;
    box-shadow:0 10px 30px rgba(0,0,0,0.08);
}

.newsletter-banner{
    width:100%;
    height:500px;
    object-fit:cover;
    display:block;
}

.newsletter-content{
    padding:40px;
}

.newsletter-title{
    font-size:38px;
    font-weight:700;
    line-height:1.3;
    color:#1a1a1a;
    margin-bottom:25px;
}

.newsletter-meta{
    display:flex;
    align-items:center;
    gap:15px;
    flex-wrap:wrap;
    margin-bottom:30px;
}

.category-badge,
.date-badge,
.pdf-btn{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    padding:12px 22px;
    border-radius:30px;
    font-size:15px;
    font-weight:600;
    text-decoration:none;
    min-height:48px;
}

.category-badge{
    background:#4f46e5;
    color:#fff;
}

.date-badge{
    background:#f1f5f9;
    color:#334155;
}

.pdf-btn{
    background:#4f46e5;
    color:#fff;
    border:none;
    transition:all 0.3s ease;
    cursor:pointer;
}

.pdf-btn:hover{
    background:#3730a3;
    color:#fff;
    transform:translateY(-2px);
}

.newsletter-description{
    font-size:16px;
    line-height:1.9;
    color:#555;
}

.newsletter-description p{ margin-bottom:18px; }
.newsletter-description ul,
.newsletter-description ol{ padding-left:22px; margin-bottom:20px; }
.newsletter-description li{ margin-bottom:10px; }

.newsletter-description h1,
.newsletter-description h2,
.newsletter-description h3,
.newsletter-description h4{
    color:#1a1a1a;
    margin-bottom:15px;
    margin-top:25px;
}

.newsletter-description img{
    max-width:100%;
    height:auto;
    border-radius:10px;
    margin:20px 0;
}

.newsletter-description table{ width:100%; border-collapse:collapse; margin:20px 0; }
.newsletter-description table th,
.newsletter-description table td{ border:1px solid #ddd; padding:10px; }
.newsletter-description table th{ background:#f8f9fa; }

@media(max-width:991px){
    .newsletter-banner{ height:350px; }
    .newsletter-title{ font-size:32px; }
}

@media(max-width:768px){
    .newsletter-banner{ height:250px; }
    .newsletter-content{ padding:20px; }
    .newsletter-title{ font-size:26px; }
    .newsletter-meta{ gap:10px; }
    .category-badge,.date-badge,.pdf-btn{ width:100%; justify-content:center; }
}

@media(max-width:480px){
    .newsletter-title{ font-size:22px; }
    .newsletter-description{ font-size:15px; }
}

.newsletter-author{
    margin-top:60px;
    padding-top:50px;
    border-top:1px solid #ececec;
}

.author-row{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:50px;
    flex-wrap:wrap;
}

.author-left{
    flex:1;
}

.author-left h3{
    font-size:25px;
    font-weight:700;
    color:#111;
    margin-bottom:12px;
}

.author-left p{
    font-size:18px;
    color:#666;
    margin-bottom:25px;
}

.author-social a{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    width:48px;
    height:48px;
    margin-right:12px;
    border-radius:50%;
    background:#525fe1;
    color:#fff;
    text-decoration:none;
    font-size:22px;
    transition:.3s;
}

.author-social a:hover{
    background:#525fe1;
    color:#fff;
}

.author-right{
    width:220px;
    text-align:center;
}

.author-image{
    width:180px;
    height:180px;
    border-radius:50%;
    overflow:hidden;
    border:6px solid #fff;
    box-shadow:0 10px 30px rgba(0,0,0,.15);
    margin:0 auto 15px;
}

.author-image img{
    width:100%;
    height:100%;
    object-fit:cover;
}

.author-name{
    font-size:28px;
    font-weight:700;
    color:#111;
    margin-bottom:4px;
}

.author-title{
    color:#666;
    font-size:15px;
}

@media(max-width:768px){
    .author-row{
        flex-direction:column-reverse;
        text-align:center;
    }

    .author-left{
        text-align:center;
    }

    .author-left h3{
        font-size:32px;
    }
}

@media(max-width:768px){
    .newsletter-author{ margin-top:40px; padding-top:40px; }
    .newsletter-author h3{ font-size:28px; }
    .newsletter-author p{ font-size:16px; }
    .author-image{ width:140px; height:140px; margin-bottom:20px; }
    .author-sign{ max-width:260px; width:60%; }
}

/* ── Buy area ── */
.nl-buy-area{
    display:flex;
    align-items:center;
    gap:18px;
    margin-top:28px;
    padding-top:28px;
    border-top:1px solid #ececec;
    flex-wrap:wrap;
}

.nl-price-tag{
    font-size:30px;
    font-weight:800;
    color:#082567;
}

.nl-price-free{
    font-size:16px;
    font-weight:700;
    color:#22c55e;
    background:#f0fdf4;
    border:1px solid #86efac;
    padding:7px 18px;
    border-radius:20px;
}

.nl-buy-btn{
    display:inline-flex;
    align-items:center;
    background:linear-gradient(90deg,#5663e9,#6c63ff);
    color:#fff;
    padding:13px 28px;
    border-radius:8px;
    border:none;
    font-size:15px;
    font-weight:700;
    cursor:pointer;
    transition:0.3s;
}

.nl-buy-btn:hover{ background:#082567; }

.nl-success-box{
    display:flex;
    align-items:center;
    gap:16px;
    flex-wrap:wrap;
    margin-top:28px;
    padding:20px 24px;
    background:#f0fdf4;
    border:1px solid #86efac;
    border-radius:12px;
}

.nl-success-icon{
    width:44px;
    height:44px;
    background:#22c55e;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    font-size:22px;
    flex-shrink:0;
}

.nl-error-box{
    margin-top:28px;
    padding:16px 20px;
    background:#fef2f2;
    border:1px solid #fca5a5;
    border-radius:10px;
    color:#dc2626;
    display:flex;
    align-items:center;
    gap:12px;
}

/* ── Modals ── */
.nl-modal-overlay{
    position:fixed;
    top:0; left:0;
    width:100%; height:100%;
    background:rgba(0,0,0,0.55);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:99999;
    padding:15px;
}

.nl-modal{
    background:#fff;
    width:460px;
    max-width:100%;
    max-height:90vh;
    overflow-y:auto;
    padding:32px;
    border-radius:14px;
    position:relative;
}

.nl-modal h3{
    text-align:center;
    margin-bottom:20px;
    color:#082567;
    font-weight:700;
    font-size:20px;
}

.nl-modal input,
.nl-modal select{
    width:100%;
    padding:11px 14px;
    margin-bottom:12px;
    border:1px solid #ddd;
    border-radius:6px;
    font-size:14px;
    box-sizing:border-box;
}

.nl-close{
    position:absolute;
    right:14px; top:10px;
    background:none; border:none;
    font-size:28px; cursor:pointer;
    color:#666;
    line-height:1;
}

.nl-tab-row{ display:flex; margin-bottom:18px; }
.nl-tab{
    flex:1;
    padding:10px;
    border:1px solid #ddd;
    background:#f5f5f5;
    cursor:pointer;
    font-size:14px;
    font-weight:600;
}
.nl-tab.active{ background:#082567; color:#fff; border-color:#082567; }
.nl-tab:first-child{ border-radius:6px 0 0 6px; }
.nl-tab:last-child{ border-radius:0 6px 6px 0; }

.nl-msg{ font-size:13px; color:red; margin-bottom:10px; text-align:center; }

.nl-usertype-row{
    display:flex;
    gap:24px;
    margin-bottom:14px;
    font-size:14px;
}

.nl-submit{
    width:100%;
    padding:12px;
    background:linear-gradient(90deg,#5663e9,#6c63ff);
    color:#fff;
    border:none;
    border-radius:6px;
    font-size:15px;
    font-weight:700;
    cursor:pointer;
}

.nl-submit:disabled{ opacity:0.6; cursor:wait; }
.nl-submit:hover:not(:disabled){ background:#082567; }

.nl-back-link{
    display:block;
    margin-top:12px;
    background:none;
    border:none;
    color:#888;
    cursor:pointer;
    width:100%;
    font-size:13px;
    text-align:center;
}

.nl-billing-summary{
    background:#f8fafc;
    border-radius:8px;
    padding:12px 16px;
    margin-bottom:16px;
    font-size:14px;
    color:#444;
}

.nl-total-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:14px;
    font-size:16px;
    font-weight:700;
    color:#082567;
}

hr.nl-divider{ border:none; border-top:1px solid #eee; margin:14px 0; }
      `}</style>

      <section className="section-padding">
        <div className="container">
          <div className="newsletter-detail-card">

            <img
              src={newsletter.thumbnail}
              alt={newsletter.topic}
              className="newsletter-banner"
            />

            <div className="newsletter-content">

              <div className="newsletter-meta">
                <span className="category-badge">{newsletter.category}</span>

                <span className="date-badge">
                  📅{" "}
                  {new Date(newsletter.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>

               
              </div>

              <h1 className="newsletter-title">{newsletter.topic}</h1>

              <div
                className="newsletter-description"
                dangerouslySetInnerHTML={{ __html: newsletter.description }}
              />

              {/* ── Buy / Success area ─────────────────────────────────── */}
              {step === "success" ? (
                <div className="nl-success-box">
                  <div className="nl-success-icon">✓</div>
                  <div style={{ flex: 1 }}>
                    <strong>Successfully added to your dashboard!</strong>
                    <div style={{ marginTop: 5, fontSize: 14, color: "#555" }}>
                      Access this newsletter anytime from your dashboard.
                    </div>
                  </div>
                  <button className="nl-buy-btn" onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                  </button>
                </div>
              ) : step === "error" ? (
                <div className="nl-error-box">
                  <span>⚠</span>
                  <span>
                    Something went wrong. Please{" "}
                    <button
                      style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                      onClick={() => setStep("idle")}
                    >
                      try again
                    </button>.
                  </span>
                </div>
              ) : (
                <div className="nl-buy-area">
                  {isFree ? (
                    <span className="nl-price-free">FREE</span>
                  ) : (
                    <span className="nl-price-tag">${newsletter.price}</span>
                  )}
                  <button
                    className="nl-buy-btn"
                    onClick={isFree ? handleGetFree : handleBuyPaid}
                  >
                    {isFree
                      ? (u ? "Add to My Dashboard" : "Get Free Issue")
                      : `Buy Now – $${newsletter.price}`}
                  </button>
                </div>
              )}
              {/* ─────────────────────────────────────────────────────── */}

              <div className="newsletter-author">
  <div className="author-row">

    {/* Left Side */}
    <div className="author-left">
      <h3>Enjoy this article?</h3>

      <p>Subscribe to never miss an issue.</p>

      <div className="author-social">

        <a
          href="https://www.linkedin.com/in/brian-edmonds-vedsu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-linkedin"></i>
        </a>

        <a
          href="https://www.instagram.com/iambrianedmonds/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-instagram"></i>
        </a>

      </div>
    </div>

    {/* Right Side */}
    <div className="author-right">

      <div className="author-image">
        <img
          src="/assets/img/brianpro2.jpg"
          alt="Brian Edmonds"
        />
      </div>

      <div className="author-name">
        Brian Edmonds
      </div>

      <div className="author-title">
        Compliance Expert
      </div>

    </div>

  </div>
</div>

            </div>
          </div>
        </div>
      </section>

      {/* ── LOGIN / REGISTER MODAL ────────────────────────────────────────── */}
      {step === "login" && (
        <div className="nl-modal-overlay">
          <div className="nl-modal">
            <button className="nl-close" onClick={() => setStep("idle")}>×</button>
            <h3>Sign In to Continue</h3>

            <div className="nl-tab-row">
              <button
                className={`nl-tab ${modalTab === "login" ? "active" : ""}`}
                onClick={() => { setModalTab("login"); setAuthMsg(""); }}
              >Login</button>
              <button
                className={`nl-tab ${modalTab === "register" ? "active" : ""}`}
                onClick={() => { setModalTab("register"); setAuthMsg(""); }}
              >Register</button>
            </div>

            {authMsg && <div className="nl-msg">{authMsg}</div>}

            {modalTab === "login" ? (
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.Email}
                  onChange={(e) => setLoginData({ ...loginData, Email: e.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.Password}
                  onChange={(e) => setLoginData({ ...loginData, Password: e.target.value })}
                  required
                />
                <div className="nl-usertype-row">
                  <label>
                    <input type="radio" name="lut" checked={loginData.UserType === "Attendee"}
                      onChange={() => setLoginData({ ...loginData, UserType: "Attendee" })}
                    /> Customer
                  </label>
                  <label>
                    <input type="radio" name="lut" checked={loginData.UserType === "Speaker"}
                      onChange={() => setLoginData({ ...loginData, UserType: "Speaker" })}
                    /> Speaker
                  </label>
                </div>
                <button type="submit" disabled={authLoading} className="nl-submit">
                  {authLoading ? "Please wait..." : "Login & Continue"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={registerData.Name}
                  onChange={(e) => setRegisterData({ ...registerData, Name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={registerData.Email}
                  onChange={(e) => setRegisterData({ ...registerData, Email: e.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={registerData.Password}
                  onChange={(e) => setRegisterData({ ...registerData, Password: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={registerData.Contact}
                  onChange={(e) => setRegisterData({ ...registerData, Contact: e.target.value })}
                  required
                />
                <div className="nl-usertype-row">
                  <label>
                    <input type="radio" name="rut" checked={registerData.UserType === "Attendee"}
                      onChange={() => setRegisterData({ ...registerData, UserType: "Attendee" })}
                    /> Customer
                  </label>
                  <label>
                    <input type="radio" name="rut" checked={registerData.UserType === "Speaker"}
                      onChange={() => setRegisterData({ ...registerData, UserType: "Speaker" })}
                    /> Speaker
                  </label>
                </div>
                <button type="submit" disabled={authLoading} className="nl-submit">
                  {authLoading ? "Please wait..." : "Register & Continue"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── BILLING MODAL (paid newsletters only) ────────────────────────── */}
      {(step === "billing" || step === "payment") && !isFree && (
        <div className="nl-modal-overlay">
          <div className="nl-modal">
            <button className="nl-close" onClick={() => setStep("idle")}>×</button>

            {step === "billing" ? (
              <>
                <h3>Billing Details</h3>
                <form onSubmit={handleBillingNext}>
                  {billingError && <div className="nl-msg">{billingError}</div>}
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={billingData.name}
                    onChange={(e) => setBillingData({ ...billingData, name: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Billing Email"
                    value={billingData.email}
                    onChange={(e) => setBillingData({ ...billingData, email: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={billingData.country}
                    onChange={(e) => setBillingData({ ...billingData, country: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Zip Code (optional)"
                    value={billingData.zipcode}
                    onChange={(e) => setBillingData({ ...billingData, zipcode: e.target.value })}
                  />
                  <button type="submit" className="nl-submit">
                    Continue to Payment
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3>Payment</h3>
                <div className="nl-billing-summary">
                  <strong>Billing to:</strong> {billingData.name} ({billingData.email})
                </div>
                <hr className="nl-divider" />
                <div className="nl-total-row">
                  <span>Total</span>
                  <span>${newsletter.price}</span>
                </div>
                {payError && <div className="nl-msg">{payError}</div>}
                {stripePromise ? (
                  <Elements stripe={stripePromise}>
                    <NewsletterPayForm
                      newsletter={newsletter}
                      billing={billingData}
                      userEmail={u ? u.email : billingData.email}
                      onSuccess={() => setStep("success")}
                      onError={(msg) => setPayError(msg)}
                    />
                  </Elements>
                ) : (
                  <div className="text-center py-3">Loading payment form...</div>
                )}
                <button className="nl-back-link" onClick={() => setStep("billing")}>
                  ← Back to Billing Details
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NewsletterDetails;
