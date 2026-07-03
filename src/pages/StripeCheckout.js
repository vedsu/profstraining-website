import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { API_URL, WEBSITE } from "../config";

function StripeCheckout() {

    const [stripePromise, setStripePromise] = useState(null);

    useEffect(() => {
        getStripeKey();
    }, []);

    const getStripeKey = async () => {

        try {

            const res = await axios.get(
                `${API_URL}/variables?website=${WEBSITE}`
            );

            const publishableKey =
                res.data.message.stripe_publishable_key;

            setStripePromise(loadStripe(publishableKey));

        } catch (err) {
            console.log(err);
        }

    };

    if (!stripePromise) {
        return (
            <div className="text-center mt-5">
                <h3>Loading Stripe...</h3>
            </div>
        );
    }

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}

export default StripeCheckout;