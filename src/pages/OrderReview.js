import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

function OrderReview() {


const navigate = useNavigate();

const [cartItems, setCartItems] = useState([]);
const [grandTotal, setGrandTotal] = useState(0);


const orderId = sessionStorage.getItem("orderId");


const billing =
  JSON.parse(sessionStorage.getItem("billingDetails")) || {};

const subtotal =
  Number(sessionStorage.getItem("subtotal")) || 0;

const discount =
  Number(sessionStorage.getItem("discount")) || 0;

const finalGrandTotal =
  Number(sessionStorage.getItem("grandTotal")) || subtotal;

const couponCode =
  sessionStorage.getItem("couponCode");

const invoice_number =
  sessionStorage.getItem("invoice_number");

const order_datetimezone =
  sessionStorage.getItem("order_datetimezone");

useEffect(() => {

    const cart =
        JSON.parse(sessionStorage.getItem("cart")) || [];

    setCartItems(cart);

}, []);


const handlePayment = () => {
    navigate("/stripe-checkout");
};

  return (
    <>		
		<section class="section-top">
			<div class="container">
				<div class="col-lg-10 offset-lg-1 text-center">
					<div class="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>Order-Review</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / Cart / Order-Review</li>
						</ul>
					</div>
				</div>
			</div>
		</section>	
		
		
	<style>{`


.order_review_area{
    background: #fff;
}

.order-review-box{
    border: 1px solid #ececec;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
}


.order-review-title{
    background: #f5f5f5;
    padding: 16px 25px;
    border-bottom: 1px solid #ececec;
}

.order-review-title h3{
    margin: 0;
    font-size: 26px;
    font-weight: 700;
    color: #082567;
}


.order-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 25px;
    border-bottom: 1px solid #f1f1f1;
    gap: 20px;
}


.order-left{
    width: 70%;
}

.order-left h4{
    font-size: 24px;
    font-weight: 600;
    color: #4f7df3;
    margin-bottom: 8px;
    line-height: 1.5;
}

.order-left p{
	
    margin: 0;
    font-size: 18px;
    color: #444;
}


.order-right{
	
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-right span{
	
    font-size: 20px;
    font-weight: 500;
    color: #222;
}


.grand-total-box{
	
    background: #f7f7f7;
    padding: 20px 25px;
}

.grand-total-content{
	
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 35px;
}

.grand-total-content h4{
	
    margin: 0;
    font-size: 28px;
    font-weight: 600;
    color: #222;
}

.grand-total-content span{
	
    font-size: 32px;
    font-weight: 700;
    color: #082567;
}


.payment-btn-area{
    text-align: right;
    padding: 20px 25px 30px;
}

.pay-btn{
	
    display: inline-block;
    background: linear-gradient(90deg,#4f7df3,#5f63ff);
    color: #fff;
    padding: 14px 30px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: 0.3s;
}

.pay-btn:hover{
    background: #082567;
    color: #fff;
}


@media(max-width:991px){

    .order-left h4{
        font-size: 20px;
    }

    .order-left p{
        font-size: 16px;
    }

    .order-right span{
        font-size: 18px;
    }

    .grand-total-content h4{
        font-size: 24px;
    }

    .grand-total-content span{
        font-size: 28px;
    }
}



@media(max-width:767px){

    .order-review-title h3{
        font-size: 22px;
		text-align: center;
    }

    .order-item{
        flex-direction: column;
        align-items: flex-start;
        padding: 18px 15px;
    }

    .order-left,
    .order-right{
        width: 100%;
    }

    .order-left h4{
        font-size: 18px;
        line-height: 1.5;
    }

    .order-left p{
        font-size: 14px;
    }

    .order-right{
        margin-top: 12px;
    }

    .order-right span{
        font-size: 15px;
    }
	
	.order-header .order-right {
		width: 100% !important;
	}

    .grand-total-content{
        justify-content: space-between;
        gap: 15px;
    }

    .grand-total-content h4{
        font-size: 20px;
    }

    .grand-total-content span{
        font-size: 24px;
    }

    .payment-btn-area{
        text-align: center;
        padding: 20px;
    }

    .pay-btn{
        width: 100%;
        text-align: center;
    }
}

.order-header{
    background:#f8f8f8;
    padding:18px 25px;
    font-weight:700;
    border-bottom:2px solid #ececec;
}

.order-header .order-left strong{
    font-size:18px;
    color:#082567;
    text-transform:uppercase;
}

.order-header .order-right{
    width:30%;
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.order-header .order-right strong{
    width:80px;
    text-align:center;
    color:#082567;
    font-size:16px;
    text-transform:uppercase;
}

.payment-footer{
    display:flex;
    justify-content:flex-end;
    align-items:center;
}



@media(max-width:767px){

    .payment-footer{
        flex-direction:column;
        gap:20px;
    }

   
}

`}</style>
		

<section class="order_review_area section-padding">
    <div class="container">

        <div class="order-review-box">

           
            <div class="order-review-title">
                <h3>Order-Review</h3>
            </div>

            <div className="order-item order-header">

				<div className="order-left">
					<strong>Product</strong>
				</div>

				<div className="order-right">
					<strong>Qty</strong>
					<strong>Price</strong>
					<strong>Total</strong>
				</div>

			</div>
           {cartItems.map((item, index) => (

				<div className="order-item" key={index}>

					<div className="order-left">

						<h4>{item.title}</h4>

						<p>{item.optionName}</p>

					</div>

					<div className="order-right">

						<span>{item.quantity}</span>

						<span>${item.price}</span>

						<span>
							$
							{(Number(item.price) * Number(item.quantity)).toFixed(2)}
						</span>

					</div>

				</div>

				))}
          
            

            
            <div className="grand-total-box">

				<div className="grand-total-content">
					<h4>Subtotal :</h4>
					<span>${subtotal.toFixed(2)}</span>
				</div>
				<hr/>
				<div className="grand-total-content">
					<h4>Discount :</h4>
					<span style={{ color: "green" }}>
						-${discount.toFixed(2)}
					</span>
				</div>

				<div
					className="grand-total-content"
					style={{
						borderTop: "1px solid #ddd",
						marginTop: "15px",
						paddingTop: "15px",
					}}
				>
					<h4>Grand Total :</h4>
					<span>${finalGrandTotal.toFixed(2)}</span>
				</div>

			</div>

            
            <div className="payment-btn-area">

				<div className="payment-footer">
					
						<button
								type="button"
								className="pay-btn"
								onClick={handlePayment}
							>
								Pay with Card
						</button>
				</div>
            </div>

        </div>

    </div>
</section>


	
	    </>
  );
}

export default OrderReview;

