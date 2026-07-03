import { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";


function Cart() {
	
const [cartItems, setCartItems] = useState([]);
const [grandTotal, setGrandTotal] = useState(0);
const [couponCode, setCouponCode] = useState("");
const [discount, setDiscount] = useState(0);
const [finalTotal, setFinalTotal] = useState(0);
const [couponMessage, setCouponMessage] = useState("");

const [country, setCountry] = useState("");
const [state, setState] = useState("");
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("");
const navigate = useNavigate();


const updateQuantity = (index, qty) => {

  qty = Number(qty);

  if (qty < 1) qty = 1;

  const updatedCart = [...cartItems];

  updatedCart[index].quantity = qty;

  updatedCart[index].totalPrice =
    Number(updatedCart[index].price) * qty;

  setCartItems(updatedCart);

  sessionStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

  const total = updatedCart.reduce(
    (sum, item) =>
      sum + Number(item.totalPrice),
    0
  );

	setGrandTotal(total);
	setFinalTotal(total);
	
};


const removeItem = (index) => {

  const updatedCart = [...cartItems];

  updatedCart.splice(index, 1);

  setCartItems(updatedCart);

  sessionStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

  const total = updatedCart.reduce(
    (sum, item) =>
      sum + Number(item.totalPrice || 0),
    0
  );

  setGrandTotal(total);
	setFinalTotal(total);
	
};

const applyCoupon = async () => {
  if (!couponCode.trim()) {
    setCouponMessage("Please enter coupon code.");
    return;
  }

  try {
	  
    const res = await axios.get(
      `${API_URL}/coupon?website=${WEBSITE}`
    );

    const coupons = res.data;

    const coupon = coupons.find(
      (item) =>
        item.coupon.toUpperCase() === couponCode.toUpperCase() &&
        item.status === "Active"
    );

    if (!coupon) {
      setCouponMessage("Invalid Coupon Code");
      setDiscount(0);
      setFinalTotal(grandTotal);
      return;
    }

    let discountAmount = 0;

    if (coupon.type === "per") {
      discountAmount = (grandTotal * Number(coupon.amount)) / 100;
    } else if (coupon.type === "dollar") {
      discountAmount = Number(coupon.amount);
    }

    if (discountAmount > grandTotal) {
      discountAmount = grandTotal;
    }

    const payable = grandTotal - discountAmount;

    setDiscount(discountAmount);
    setFinalTotal(payable);

    setCouponMessage(
      `Coupon Applied Successfully (${coupon.amount}${
        coupon.type === "per" ? "%" : "$"
      } OFF)`
    );
  } catch (err) {
    console.log(err);
    setCouponMessage("Unable to verify coupon.");
  }
};



const [billing, setBilling] = useState({
  name: "",
  contact: "",
  email: "",
  address1: "",
  address2: "",
  country: "",
  state: "",
  city: "",
  zipcode: "",
});

useEffect(() => {

  const cart =
    JSON.parse(sessionStorage.getItem("cart")) || [];

  setCartItems(cart);

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.totalPrice || 0),
    0
  );

  setGrandTotal(total);
setFinalTotal(total);


  // Auto-fill logged in user details
  const userInfo = JSON.parse(sessionStorage.getItem("USERINFO"));

  if (userInfo) {
    setBilling((prev) => ({
      ...prev,
      name: userInfo.name || "",
      contact: userInfo.contact || "",
      email: userInfo.email || "",
    }));
  }

}, []);

const savePendingOrder = async () => {

    try {

        const formData = new FormData();

        formData.append("customeremail", billing.email);
        formData.append("billingemail", billing.email);
        formData.append("customername", billing.name);

        formData.append("country", billing.country);
        formData.append("state", billing.state);
        formData.append("zipcode", billing.zipcode);

        formData.append("paymentstatus", "Pending");
        formData.append("orderamount", finalTotal);

        formData.append("invoice_number", "null");

        formData.append(
            "order_datetimezone",
            new Date().toUTCString()
        );

        formData.append("Website", WEBSITE);

        // =========================
// Build Multiple Webinar Array
// =========================

const webinarMap = {};

cartItems.forEach((item) => {

    if (!webinarMap[item.webinarId]) {

        webinarMap[item.webinarId] = {

            webinarId: item.webinarId,
            topic: item.title,
            webinardate: item.date,
            speaker: item.speaker,
            webinar_url: item.webinar_url,

            trainingOptions: []

        };

    }

    webinarMap[item.webinarId].trainingOptions.push({

        optionName: item.optionName,
        price: Number(item.price),
        quantity: Number(item.quantity),
        totalPrice: Number(item.totalPrice)

    });

});

const webinars = Object.values(webinarMap);

// send to backend
formData.append(
    "webinars",
    JSON.stringify(webinars)
);

console.log("========== WEBINARS ==========");
console.log(webinars);

        console.log("=========== REQUEST ===========");

        const requestObj = {};

        for (const [key, value] of formData.entries()) {
            requestObj[key] = value;
        }

        console.log(requestObj);

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
		return response.data; // <-- Return response

    } catch (error) {

        console.log("=========== ERROR ===========");

        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

    }

};

const proceedToPay = async () => {
	
	const isGuest =
  sessionStorage.getItem("GUEST_CHECKOUT") === "true";

    if (
        billing.name.trim() === "" ||
        billing.contact.trim() === "" ||
        billing.email.trim() === "" ||
        billing.country.trim() === "" ||
        billing.state.trim() === "" ||
        billing.city.trim() === "" ||
        billing.zipcode.trim() === ""
    ) {
        setMessage("Please fill all billing details.");
        return;
    }

    // Save Billing
    sessionStorage.setItem(
        "billingDetails",
        JSON.stringify(billing)
    );

    sessionStorage.setItem(
        "cart",
        JSON.stringify(cartItems)
    );

    sessionStorage.setItem("subtotal", grandTotal);
    sessionStorage.setItem("discount", discount);
    sessionStorage.setItem("grandTotal", finalTotal);
    sessionStorage.setItem("couponCode", discount > 0 ? couponCode : "");

    sessionStorage.setItem(
        "order_datetimezone",
        new Date().toUTCString()
    );

    sessionStorage.setItem(
        "invoice_number",
        "null"
    );

    // Save Pending Order
  
	
	
	
	if (isGuest) {

    const password =
        billing.name.replace(/\s/g, "") +
        Math.floor(1000 + Math.random() * 9000);

    const formData = new FormData();

    formData.append("Name", billing.name);
    formData.append("Email", billing.email);
    formData.append("Password", password);
    formData.append("Contact", billing.contact);
    formData.append("Role", "");
    formData.append("UserType", "Attendee");
    formData.append("Website", WEBSITE);

    try {
		
		setMessage("");
		setMessageType("");

        const registerResponse = await axios.post(
            `${API_URL}/register`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        if (registerResponse.data.success) {

            setMessage("");
			setMessageType("");

			sessionStorage.setItem(
				"USERINFO",
				JSON.stringify(registerResponse.data.message)
			);

        }

    } catch (error) {

    if (error.response?.status === 203) {

        setMessage(
            error.response.data.message ||
            "User already registered."
        );

        setMessageType("error");

        return;
    }

    setMessage("Registration failed.");
    setMessageType("error");

    console.log(error);
}

	}
	
	//const insertId = response.data.insert_id;
	
	const response = await savePendingOrder();

	console.log("FULL RESPONSE:", response);

	const insertId = response[0][0].message.id;

	console.log("Insert ID:", insertId);

	sessionStorage.setItem("orderId", insertId);


    // Go to Order Review
    navigate("/OrderReview");
};

  return (
    <>
	
		<section class="section-top">
			<div class="container">
				<div class="col-lg-10 offset-lg-1 text-center">
					<div class="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>Your Shopping Cart</h1>
						
					</div>
				</div>
			</div>
		</section>	
	
		
		<style>{`
		


.cart-wrapper{
    background: #fff;
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.05);
    border: 1px solid #ececec;
}


.cart-title{
    font-size: 22px;
    font-weight: 500;
    color: #082567;
    margin-bottom: 20px;
}


.cart-alert{
    background: #c9f0d5;
    color: #106b2d;
    padding: 14px 22px;
    border-radius: 50px;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.cart-alert i{
    font-size: 24px;
}


.cart-table{
    width: 100%;
    border-collapse: collapse;
}

.cart-table thead th{
    font-size: 14px;
    color: #082567;
    padding-bottom: 15px;
    border-bottom: 2px solid #ececec;
    text-transform: uppercase;
    font-weight: 700;
}

.cart-table tbody td{
    padding: 22px 0;
    border-bottom: 1px solid #f1f1f1;
    vertical-align: top;
}


.cart-product-title{
	
    font-size: 14px;
    font-weight: 700;
    color: #082567;
    line-height: 1.4;
    margin-bottom: 8px;
}

.cart-product-sub{
    color: #666;
    font-size: 14px;
}


.qty-box{
    width: 55px;
    height: 42px;
    border-radius: 8px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 16px;
}


.cart-price{
    font-size: 16px;
    font-weight: 700;
    color: #082567;
}


.remove-btn{
    color: red;
    font-size: 22px;
    cursor: pointer;
}


.coupon-area{
    display: flex;
    gap: 10px;
    margin-top: 25px;
}

.coupon-input{
    flex: 1;
    height: 52px;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 0 18px;
    font-size: 15px;
}

.apply-btn{
    padding: 0 24px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(90deg,#5663e9,#6d63ff);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
}


.grand-total{
    margin-top: 25px;
    text-align: right;
}

.grand-total h3{
    font-size: 16px;
    color: #666;
    margin-bottom: 5px;
}

.grand-total .amount{
    font-size: 19px;
    font-weight: 700;
    color: #082567;
}


.billing-box{
    background: #fff;
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.05);
    border: 1px solid #ececec;
}

.billing-box h3{
    text-align: center;
    color: #082567;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 22px;
}


.billing-box input,
.billing-box select{
    width: 100%;
    height: 52px;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 0 16px;
    margin-bottom: 16px;
    font-size: 14px;
    color: #444;
}


.pay-btn{
    width: 100%;
    height: 55px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(90deg,#5663e9,#6d63ff);
    color: #fff;
    font-size: 17px;
    font-weight: 700;
    transition: 0.3s;
}

.pay-btn:hover{
    background: #082567;
}


.access-info{
    margin-top: 45px;
}

.access-info h2{
    color: #082567;
    font-size: 21px;
    font-weight: 800;
    margin-bottom: 18px;
}

.access-info p,
.access-info li{
    font-size: 15px;
    color: #444;
    line-height: 1.8;
}



@media(max-width:991px){

   
    .cart-wrapper{
        padding: 22px;
        margin-bottom: 25px;
    }

    .billing-box{
        padding: 22px;
        margin-top: 25px;
    }

   
    .cart-title{
        font-size: 24px;
        margin-bottom: 20px;
    }

    .billing-box h3{
        font-size: 24px;
        margin-bottom: 20px;
    }

   
    .cart-alert{
        padding: 14px 20px;
        font-size: 16px;
    }

    .cart-alert i{
        font-size: 20px;
    }

   
    .cart-table thead th{
        font-size: 13px;
    }

    .cart-product-title{
        font-size: 17px;
    }

    .cart-product-sub{
        font-size: 14px;
    }

    .cart-price{
        font-size: 16px;
    }

    .qty-box{
        width: 60px;
        height: 40px;
        font-size: 15px;
    }

    .remove-btn{
        font-size: 20px;
    }

   
    .coupon-input{
        height: 48px;
        font-size: 14px;
    }

    .apply-btn{
        height: 48px;
        padding: 0 22px;
        font-size: 14px;
    }

   
    .grand-total h3{
        font-size: 15px;
    }

    .grand-total .amount{
        font-size: 28px;
    }

   
    .access-info{
        margin-top: 35px;
    }

    .access-info h2{
        font-size: 24px;
    }

    .access-info p,
    .access-info li{
        font-size: 14px;
        line-height: 1.7;
    }

   
    .billing-box input,
    .billing-box select{
        height: 48px;
        font-size: 14px;
    }

    .pay-btn{
        height: 50px;
        font-size: 15px;
    }
}



@media(max-width:767px){

    .row{
        margin: 0;
    }

    .col-lg-8,
    .col-lg-4{
        padding: 0 8px;
    }

   
    .cart-wrapper,
    .billing-box{
        padding: 18px;
        border-radius: 14px;
    }

    .cart-wrapper{
        margin-bottom: 20px;
    }

   
    .cart-title{
        font-size: 22px;
        margin-bottom: 18px;
    }

    .billing-box h3{
        font-size: 22px;
        margin-bottom: 18px;
    }

   
    .cart-alert{
        font-size: 15px;
        padding: 12px 16px;
        gap: 10px;
    }

    .cart-alert i{
        font-size: 18px;
    }

  
    .cart-table thead{
        display: none;
    }

    .cart-table,
    .cart-table tbody,
    .cart-table tr,
    .cart-table td{
        display: block;
        width: 100%;
    }

    .cart-table tr{
        padding: 16px 0;
        border-bottom: 1px solid #eee;
    }

    .cart-table td{
        border: none;
        padding: 7px 0;
    }

   
    .cart-product-title{
        font-size: 16px;
        line-height: 1.4;
    }

    .cart-product-sub{
        font-size: 13px;
    }

   
    .cart-table td:nth-child(2)::before{
        content: "Quantity: ";
        font-weight: 700;
        color: #082567;
    }

    .cart-table td:nth-child(3)::before{
        content: "Price: ";
        font-weight: 700;
        color: #082567;
    }

    .cart-table td:nth-child(4)::before{
        content: "Total: ";
        font-weight: 700;
        color: #082567;
    }

    .cart-table td:nth-child(5)::before{
        content: "Remove: ";
        font-weight: 700;
        color: #082567;
    }

  
    .cart-price{
        font-size: 15px;
    }

  
    .qty-box{
        width: 58px;
        height: 38px;
        font-size: 14px;
    }

   
    .remove-btn{
        font-size: 18px;
    }

   
   .coupon-area {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
    }

    .coupon-input {
        width: 100% !important;
        max-width: 100%;
        min-width: 100%;
        box-sizing: border-box;
        flex: none;
        height: 40px;
    }

    .apply-btn {
        width: 100%;
    }

    /* Total */
    .grand-total{
        text-align: left;
        margin-top: 18px;
    }

    .grand-total h3{
        font-size: 14px;
    }

    .grand-total .amount{
        font-size: 24px;
    }

   
    .access-info{
        margin-top: 30px;
    }

    .access-info h2{
        font-size: 22px;
        margin-bottom: 14px;
    }

    .access-info p,
    .access-info li{
        font-size: 13px;
        line-height: 1.7;
    }

 
    .billing-box input,
    .billing-box select{
        height: 46px;
        font-size: 13px;
        margin-bottom: 14px;
    }

    .pay-btn{
        height: 48px;
        font-size: 15px;
    }
}
`}</style>
		
		
		<section class="our_event section-padding">
			<div class="container">
				<div class="row">


    <div class="col-lg-8">

        <div class="cart-wrapper">

            <h3 class="cart-title">PRODUCT-CART</h3>

            <div class="cart-alert">
                <i class="fa fa-check"></i>
                Cart updated..
            </div>

            <table class="cart-table">

                <thead>
                    <tr>
                        <th align="left">PRODUCT</th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
                        <th>TOTAL</th>
                        <th>REMOVE</th>
                    </tr>
                </thead>
				
							

            <tbody>

				{cartItems.length > 0 ? (

				  cartItems.map((item, index) => (

					<tr key={index}>

					  <td>

						<div className="cart-product-title">
						  {item.title}
						</div>

						<div className="cart-product-sub">
						  {item.optionName} - ${item.price}
						</div>

					  </td>

					  <td>
						  <input
							type="number"
							min="1"
							value={item.quantity}
							className="qty-box"
							onChange={(e) =>
							  updateQuantity(
								index,
								parseInt(e.target.value) || 1
							  )
							}
						  />
						</td>

					<td className="cart-price">
					  ${item.price}
					</td>

					<td className="cart-price">
					  ${item.totalPrice}
					</td>

					  <td>
						<span
						  className="remove-btn"
						  onClick={() => removeItem(index)}
						>
						  ×
						</span>
					  </td>

					</tr>

				  ))

				) : (

				  <tr>
					<td colSpan="5" className="text-center py-4">
					  No Item In Cart
					</td>
				  </tr>

				)}

				</tbody>
            </table>

           
            <div className="coupon-area">

				<input
					type="text"
					className="coupon-input"
					placeholder="Coupon Code"
					value={couponCode}
					onChange={(e) => setCouponCode(e.target.value)}
				/>

				<button
					className="apply-btn"
					onClick={applyCoupon}
					type="button"
				>
					Apply
				</button>

			</div>

			{couponMessage && (
				<p
					style={{
						color:
							couponMessage.includes("Successfully")
								? "green"
								: "red",
						marginTop: 10,
						fontWeight: 600,
					}}
				>
					{couponMessage}
				</p>
			)}

            
            <div className="grand-total">

				<h3>Subtotal</h3>
				<div className="amount">
					${grandTotal.toFixed(2)}
				</div>

				{discount > 0 && (
					<>
						<h3 style={{ marginTop: 10 }}>
							Discount
						</h3>

						<div
							className="amount"
							style={{ color: "green" }}
						>
							-${discount.toFixed(2)}
						</div>
					</>
				)}

				<h3 style={{ marginTop: 15 }}>
					Grand Total
				</h3>

				<div
					className="amount"
					style={{
						color: "#082567",
						fontWeight: "700",
					}}
				>
					${finalTotal.toFixed(2)}
				</div>

			</div>

            
            <div class="access-info">

                <h2>Access Information:</h2>

                <ul>
                    <li><strong>Live Session:</strong> Access details will be emailed 12 hours before the scheduled session.</li>

                    <li><strong>On-Demand & Transcript:</strong> Access details will be provided 24 hours after the live session.</li>

                    <li><strong>Dashboard Access:</strong> You can log in to your dashboard anytime to view training materials.</li>
                </ul>

            </div>

        </div>

    </div>

    <div class="col-lg-4">

        <div class="billing-box">

            <h3>BILLING DETAILS</h3>

            <input
				type="text"
				placeholder="Your Name"
				value={billing.name}
				onChange={(e)=>
					setBilling({...billing,name:e.target.value})
				}
			/>
            <input
				type="text"
				placeholder="Your Contact Number"
				value={billing.contact}
				onChange={(e)=>
					setBilling({...billing,contact:e.target.value})
				}
			/>
			
            <input
				type="email"
				placeholder="Shipping Email"
				value={billing.email}
				onChange={(e)=>
					setBilling({...billing,email:e.target.value})
				}
			/>
			
			{message && (
				<div
					style={{
						color:
							messageType === "success"
								? "green"
								: "red",
						fontSize: "14px",
						fontWeight: "500",
						marginTop: "-10px",
						marginBottom: "15px"
					}}
				>
					{message}
				</div>
			)}
           <input
				type="text"
				placeholder="Address 1"
				value={billing.address1}
				onChange={(e)=>
					setBilling({...billing,address1:e.target.value})
				}
			/>
			
			<input
				type="text"
				placeholder="Address 2"
				value={billing.address2}
				onChange={(e)=>
					setBilling({...billing,address2:e.target.value})
				}
			/>
			
			
            

            <select
					  value={billing.country}
					  onChange={(e) => {

						setBilling({
						  ...billing,
						  country: e.target.value,
						  state: "",
						});

						setCountry(e.target.value);
						setState("");
					  }}
					>
				  <option value="">Select Country</option>

				  {Country.getAllCountries().map((item) => (
					<option key={item.isoCode} value={item.isoCode}>
					  {item.name}
					</option>
				  ))}
			</select>

				<select
				  value={billing.state}
				  onChange={(e) => {

					setBilling({
					  ...billing,
					  state: e.target.value,
					});

					setState(e.target.value);
				  }}
				>
				  <option value="">Select State</option>

				  {State.getStatesOfCountry(country).map((item) => (
					<option key={item.isoCode} value={item.name}>
					  {item.name}
					</option>
				  ))}
			</select>

            <input
				type="text"
				placeholder="Your City"
				value={billing.city}
				onChange={(e)=>
					setBilling({
						...billing,
						city:e.target.value
					})
				}
			/>
           
		   
		   <input
				type="text"
				placeholder="Your Zipcode"
				value={billing.zipcode}
				onChange={(e)=>
					setBilling({
						...billing,
						zipcode:e.target.value
					})
				}
			/>

          <button
				className="pay-btn"
				onClick={proceedToPay}
			>
				Proceed To Pay
			</button>

        </div>

    </div>

</div>
			</div>
		</section>
		
		
	
	    </>
  );
}

export default Cart;

