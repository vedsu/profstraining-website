import { useState } from "react";
import axios from "axios";

import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";
import { API_URL, WEBSITE } from "../config";

function CheckoutForm() {
	
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const billing = JSON.parse(
    sessionStorage.getItem("billingDetails")
  );

  const amount = Number(
    sessionStorage.getItem("grandTotal")
  );

  const invoice_number =
    sessionStorage.getItem("invoice_number");

  const orderId =
    sessionStorage.getItem("orderId");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {

      const cardElement =
        elements.getElement(CardElement);

      const { token, error } =
        await stripe.createToken(cardElement);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      console.log("Stripe Token");
      console.log(token);

      const response = await axios.post(
        `${API_URL}/create-payment-intent?website=${WEBSITE}`,
        {
          email: billing.email,
          name: billing.name,
          country: billing.country,
          amount: amount,
          invoice_number: invoice_number,
          stripeToken: token.id,
        }
      );

      if (response.data.success) {
        sessionStorage.setItem("paymentDate", response.data.date_time);
        navigate("/payment-success");
      } else {
        alert(response.data.error || "Payment failed");
      }

    } catch (err) {

      console.log(err);

      alert("Payment Failed");

    }

    setLoading(false);

  };

  return (

    <div className="checkout-container">

      <h2>Stripe Payment</h2>

      <h4>${amount}</h4>

      <form onSubmit={handleSubmit}>

        <div
          style={{
            border: "1px solid #ddd",
            padding: 15,
            borderRadius: 5,
            marginBottom: 20,
          }}
        >

          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: "16px",
                },
              },
            }}
          />

        </div>

        <button
          disabled={!stripe || loading}
          style={{
            width: "100%",
            height: 50,
            background: "#635bff",
            color: "#fff",
            border: 0,
            borderRadius: 5,
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          {loading
            ? "Processing..."
            : `Pay $${amount}`}
        </button>

      </form>

    </div>

  );
}

export default CheckoutForm;