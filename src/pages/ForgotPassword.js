import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleForgotPassword = async () => {

        setMessage("");

        if (!email) {
            setMessage("Please enter your registered email.");
            setMessageType("error");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                `${API_URL}/forgotpassword`,
                {
                    Email: email,
                    Website: WEBSITE
                }
            );

            if (response.data.success) {

                setMessage(
                    "A password reset link has been sent to your registered email."
                );

                setMessageType("success");

                setEmail("");

            } else {

                setMessage(
                    response.data.message || "Unable to send reset link."
                );

                setMessageType("error");

            }

        } catch (error) {

            console.log(error);

            setMessage("Unable to send reset link.");

            setMessageType("error");

        } finally {

            setLoading(false);

        }
    };

    return (
        <>
            <style>{`

.forgot-section{
    min-height:85vh;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:60px 15px;
    background:#f7f8fc;
}

.forgot-card{
    width:100%;
    max-width:520px;
    background:#fff;
    border-radius:15px;
    padding:40px;
    box-shadow:0 10px 30px rgba(0,0,0,.08);
}

.forgot-title{
    font-weight:700;
    margin-bottom:15px;
    color:#082567;
}

.forgot-text{
    color:#666;
    line-height:28px;
    margin-bottom:30px;
}

.form-label{
    font-weight:600;
}

.form-control{
    height:50px;
    border-radius:8px;
}

.submit-btn{
    width:100%;
}

.message-success{
    color:#198754;
    font-size:14px;
    font-weight:600;
    margin-top:10px;
}

.message-error{
    color:#dc3545;
    font-size:14px;
    font-weight:600;
    margin-top:10px;
}

.login-link{
    text-align:center;
    margin-top:25px;
}

.login-link a{
    color:#525fe1;
    font-weight:600;
    text-decoration:none;
}

.login-link a:hover{
    text-decoration:underline;
}

@media(max-width:576px){

.forgot-card{
    padding:25px;
}

}

            `}</style>

            <section className="forgot-section">

                <div className="forgot-card">

                    <h2 className="forgot-title">
                        Forgot Password
                    </h2>

                    <p className="forgot-text">
                        Enter your registered email address below, and we'll send you a secure link to reset your password.
                    </p>

                    <div className="mb-3">

                        <label className="form-label">
                            Email Address
                            <span className="text-danger">*</span>
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {message && (
                            <div
                                className={
                                    messageType === "success"
                                        ? "message-success"
                                        : "message-error"
                                }
                            >
                                {message}
                            </div>
                        )}

                    </div>

                    <button
                        className="btn_one submit-btn"
                        onClick={handleForgotPassword}
                        disabled={loading}
                    >
                        {loading
                            ? "Sending..."
                            : "Send Reset Link"}
                    </button>

                    <div className="login-link">

                        Remember your password?

                        <br />

                        <Link to="/login-register">
                            Back to Login
                        </Link>

                    </div>

                </div>

            </section>
        </>
    );
}

export default ForgotPassword;