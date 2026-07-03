import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";

function PaymentSuccess() {

const [displayOrderId, setDisplayOrderId] = useState("");
const [displayAmount, setDisplayAmount] = useState("");

useEffect(() => {

    savePurchasedOrder();

}, []);

const savePurchasedOrder = async () => {


try {

    const billing =
        JSON.parse(sessionStorage.getItem("billingDetails")) || {};

    const cart =
        JSON.parse(sessionStorage.getItem("cart")) || [];

    const orderId =
        sessionStorage.getItem("orderId");

    const grandTotal =
        sessionStorage.getItem("grandTotal");

    setDisplayOrderId(orderId);
    setDisplayAmount(grandTotal);

    const formData = new FormData();

    // Customer Details
    formData.append(
        "customeremail",
        billing.email || ""
    );

    formData.append(
        "billingemail",
        billing.email || ""
    );

    formData.append(
        "customername",
        billing.name || ""
    );

    formData.append(
        "country",
        billing.country || ""
    );

    formData.append(
        "zipcode",
        billing.zipcode || ""
    );

    // Payment Details
    formData.append(
        "paymentstatus",
        "purchased"
    );

    formData.append(
        "orderamount",
        grandTotal || "0"
    );

    formData.append(
        "invoice_number",
        "ORDER" + orderId
    );

    // IMPORTANT
    formData.append(
        "order_datetimezone",
        new Date().toUTCString()
    );

    formData.append(
        "Website",
        WEBSITE
    );

    // Webinar Details
    const firstItem = cart[0] || {};

    formData.append(
        "topic",
        firstItem.title || ""
    );

    formData.append(
        "webinardate",
        firstItem.date || ""
    );

    const live =
        cart.find(
            item => item.optionName === "Live Session"
        );

    const recording =
        cart.find(
            item => item.optionName === "Recording"
        );

    const digital =
        cart.find(
            item => item.optionName === "Digital Download"
        );

    const transcript =
        cart.find(
            item => item.optionName === "Transcript PDF"
        );

    formData.append(
        "sessionLive",
        live ? "true" : "false"
    );

    formData.append(
        "priceLive",
        live ? String(live.price) : "0"
    );

    formData.append(
        "sessionRecording",
        recording ? "true" : "false"
    );

    formData.append(
        "priceRecording",
        recording ? String(recording.price) : "0"
    );

    formData.append(
        "sessionDigitalDownload",
        digital ? "true" : "false"
    );

    formData.append(
        "priceDigitalDownload",
        digital ? String(digital.price) : "0"
    );

    formData.append(
        "sessionTranscript",
        transcript ? "true" : "false"
    );

    formData.append(
        "priceTranscript",
        transcript ? String(transcript.price) : "0"
    );

    console.log("=========== REQUEST DATA ===========");

    for (const pair of formData.entries()) {
        console.log(pair[0], ":", pair[1]);
    }

    const response = await axios.post(
        `${API_URL}/order?website=${WEBSITE}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    console.log("=========== RESPONSE ===========");
    console.log(response.data);


	// Save order id first
	// Save order id first
	const lastOrder = orderId;

	// Check login user
	const userInfo = sessionStorage.getItem("USERINFO");

	if (userInfo) {

		// Logged-in user
		// Keep login session, remove only shopping data

		sessionStorage.removeItem("cart");
		sessionStorage.removeItem("billingDetails");
		sessionStorage.removeItem("subtotal");
		sessionStorage.removeItem("discount");
		sessionStorage.removeItem("couponCode");
		sessionStorage.removeItem("grandTotal");
		sessionStorage.removeItem("invoice_number");
		sessionStorage.removeItem("orderId");
		sessionStorage.removeItem("order_datetimezone");
		sessionStorage.removeItem("GUEST_CHECKOUT");

	} else {

		// Guest user
		// Remove everything

		sessionStorage.clear();

	}

	// Keep last order id
	sessionStorage.setItem("lastOrderId", lastOrder);

	// Update Navbar cart count
	window.dispatchEvent(new Event("cartUpdated"));

} catch (error) {

    console.log("=========== ERROR ===========");

    if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", error.response.data);
    } else {
        console.log(error);
    }

}


};


return (
    <>
	
	<style>{`

.success-area{
    min-height:85vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background:linear-gradient(135deg,#f4f8ff,#eef8f4);
    padding:80px 15px;
}

.success-box{
    width:100%;
    max-width:700px;
    background:#fff;
    border-radius:20px;
    text-align:center;
    padding:55px 45px;
    box-shadow:0 15px 40px rgba(0,0,0,.08);
}

.success-icon{
    width:110px;
    height:110px;
    margin:auto;
    border-radius:50%;
    background:#22c55e;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:55px;
    color:#fff;
    margin-bottom:25px;
    box-shadow:0 10px 30px rgba(34,197,94,.35);
}

.success-box h2{
    font-size:38px;
    font-weight:700;
    color:#082567;
    margin-bottom:15px;
}

.success-box p{
    color:#666;
    font-size:18px;
    line-height:32px;
    margin-bottom:35px;
}

.order-card{
    background:#f7f9fc;
    border:1px dashed #4f46e5;
    border-radius:12px;
    padding:20px;
    margin-bottom:30px;
}

.order-card h5{
    margin:0;
    color:#555;
    font-size:16px;
    font-weight:600;
}

.order-card h3{
    margin-top:10px;
    color:#4f46e5;
    font-size:28px;
    font-weight:700;
}

.success-info{
    display:flex;
    justify-content:space-between;
    gap:20px;
    margin-bottom:35px;
    flex-wrap:wrap;
}

.info-box{
    flex:1;
    min-width:180px;
    background:#f8fafc;
    border-radius:12px;
    padding:18px;
}

.info-box h6{
    color:#777;
    margin-bottom:8px;
    font-size:15px;
}

.info-box h4{
    margin:0;
    color:#082567;
    font-size:22px;
    font-weight:700;
}

.success-buttons{
    display:flex;
    justify-content:center;
    gap:15px;
    flex-wrap:wrap;
}

.success-btn{
    background:#4f46e5;
    color:#fff;
    text-decoration:none;
    padding:14px 35px;
    border-radius:8px;
    font-weight:600;
    transition:.3s;
}

.success-btn:hover{
    background:#082567;
    color:#fff;
}

.secondary-btn{
    background:#fff;
    color:#4f46e5;
    border:2px solid #4f46e5;
}

.secondary-btn:hover{
    background:#4f46e5;
    color:#fff;
}

@media(max-width:768px){

.success-box{
    padding:35px 20px;
}

.success-box h2{
    font-size:30px;
}

.success-box p{
    font-size:16px;
    line-height:28px;
}

.success-info{
    flex-direction:column;
}

.order-card h3{
    font-size:24px;
}

}

`}</style>
        <section className="success-area">

            <div className="">

               <div className="success-box">

					<div className="success-icon">
						✓
					</div>

					<h2>Payment Successful</h2>

					<p>
						Thank you for your purchase.
						Your payment has been processed successfully.
						A confirmation email will be sent shortly.
					</p>

					<div className="order-card">

						<h5>Order Number</h5>

						<h3>{displayOrderId}</h3>

					</div>

					<div className="success-info">

						<div className="info-box">
							<h6>Payment Status</h6>
							<h4 style={{color:"#22c55e"}}>Paid</h4>
						</div>

						<div className="info-box">
							<h6>Order Amount</h6>
							<h4>${displayAmount}</h4>
						</div>

					</div>

					<div className="success-buttons">


						<Link
							to="/"
							className="success-btn secondary-btn"
						>
							Continue Shopping
						</Link>

					</div>

				</div>

            </div>

        </section>
    </>
);


}

export default PaymentSuccess;
