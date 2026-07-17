import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";

function OrderForm() {
  const { slug } = useParams();

  const [webinar, setWebinar] = useState(null);

  useEffect(() => {
    axios
      .get(
         `${API_URL}/webinar/${slug}?Website=${WEBSITE}`
      )
      .then((res) => {
        setWebinar(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  if (!webinar) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <>
      <style>{`
      
      .order-form-page{
        
        min-height:100vh;
        padding:20px 0;
      }

     .order-sheet{
  width:100%;
  max-width:1200px;
  margin:0 auto;
  background:#fff;
  padding:20px;
}

      .logo{
        text-align:center;
      }

      .logo img{
        height:70px;
      }

      .order-title{
        text-align:center;
        font-size:40px;
        font-weight:700;
        margin:15px 0 25px;
      }

      .info-box{
        border:1px solid #000;
        min-height:260px;
        padding:15px;
		color: #000;
      }

      .info-box h5{
        text-align:center;
        margin-bottom:20px;
        font-weight:600;
      }

      .line{
        margin-bottom:10px;
      }

      .revert-text{
        margin:25px 0;
        font-weight:600;
		color:#000;
      }

      .revert-text a{
        color:#000;
      }

      .order-table{
        width:100%;
        border-collapse:collapse;
        margin-bottom:25px;
      }

      .order-table td,
      .order-table th{
        border:1px solid #000;
        padding:6px 10px;
		color: #000;
      }

      .order-table th{
        background:#f7f7f7;
      }

      .note-section{
        text-align:center;
        margin-top:30px;
        font-size:15px;
      }

      .note-section strong{
        font-weight:700;
      }

      .download-btn{
        background:#4f46e5;
        color:#fff;
        border:none;
        padding:12px 30px;
        border-radius:6px;
        font-weight:600;
      }

      .download-btn:hover{
        background:#3730a3;
      }

@media print {

  @page{
    size:A4;
    margin:8mm;
  }

  html,
  body{
    zoom:92%;
    margin:0 !important;
    padding:0 !important;
  }

  .order-form-page{
    padding:0 !important;
    margin:0 !important;
  }

  .order-sheet{
    width:100% !important;
    max-width:100% !important;
    padding:0 !important;
    margin:0 auto !important;
    box-shadow:none !important;
    border:none !important;
  }

  .row{
    display:flex !important;
    flex-wrap:nowrap !important;
  }

  .col-md-6{
    width:50% !important;
    max-width:50% !important;
    flex:0 0 50% !important;
  }

  .info-box{
    min-height:220px !important;
    padding:12px !important;
	color: #000;
  }

  .line{
    margin-bottom:4px !important;
    font-size:13px !important;
  }

  .revert-text{
    margin:12px 0 !important;
    font-size:13px !important;
	color: #000;
  }

  .order-table td,
  .order-table th{
    padding:3px 6px !important;
    font-size:12px !important;
	color: #000;
  }

  .note-section{
    margin-top:15px !important;
    font-size:12px !important;
    line-height:1.3 !important;
  }

  .logo img{
    height:55px !important;
  }

  .order-title{
    font-size:28px !important;
    margin:10px 0 !important;
  }

  .no-print{
    display:none !important;
  }
}

      `}</style>

      <div className="order-form-page">

        <div className="container-fluid px-4">

          <div className="text-center mb-4 no-print">

            <button
              onClick={() => window.print()}
              className="download-btn"
            >
              Download / Print Order Form
            </button>

          </div>

          <div className="order-sheet">

            <div className="logo">
              <img
                src="https://allconference.s3.amazonaws.com/New%20Pharma%20Profs%20(1).png?AWSAccessKeyId=AKIA4JNMSYDOKTNH5XP2&Expires=2072282731&Signature=41z%2BY02FDCYnY/wZcky7s4%2BLB/A%3D"
                alt="Logo"
              />
            </div>

            <h2 className="order-title">
              Order Form
            </h2>

            <div className="row">

              <div className="col-md-6 mb-4">

                <div className="info-box">

                  <h5>Payment Information</h5>

                  <div className="line">
                    Credit Card #: _________________________________________________
                  </div>

                  <div className="line">
                    Expiration Date: _____________ / __________________________ (mm/yy)
                  </div>

                  <div className="line">
                    Cardholder's Name: ___________________________________________
                  </div>

                  <div className="line">
                    CVV or CVC: ___________________________________________________
                  </div>

                  <div className="line">
                    Signature: _____________________________________________________
                  </div>

                  <div className="line">
                    Billing Info: ____________________________________________________
                  </div>

                <div className="line">
				  <input type="checkbox" /> Visa &nbsp;&nbsp;
				  <input type="checkbox" /> MasterCard &nbsp;&nbsp;
				  <input type="checkbox" /> Discover
				</div>

                  <div className="line">
                    <input type="checkbox" />  American Express
                  </div>

                  <div className="line">
                    <input type="checkbox" /> Others (Type Here)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ______________________________________
                  </div>

                </div>

              </div>

              <div className="col-md-6 mb-4">

                <div className="info-box">

                  <h5>Personal Information</h5>

                  <div className="line">
                    Name: _____________________________________________________
                  </div>

                  <div className="line">
                    Address: ___________________________________________________
                  </div>

                  <div className="line">
                    Address Line 2: ____________________________________________
                  </div>

                  <div className="line">
                    City: _______________________________________________________
                  </div>

                  <div className="line">
                    State: ______________________________________________________
                  </div>

                  <div className="line">
                    ZIP: ________________________________________________________
                  </div>

                  <div className="line">
                    Phone: _____________________________________________________
					</div>

                  <div className="line">
                    Fax: ________________________________________________________
                  </div>

                  <div className="line">
                    Email: ______________________________________________________
                  </div>

                  <div className="line">
                    Job title*: __________________________________________________
                  </div>

                </div>

              </div>

            </div>

            <div className="revert-text">
              Fill out the order form, and revert back at:
              {" "}
              <a href="mailto:support@profstraining.com">
                support@profstraining.com
              </a>
            </div>

            <table className="order-table">

              <tbody>

                <tr>
                  <td width="180">
                    Conference Title:
                  </td>

                  <td>
                    <strong>
                      {webinar.topic}
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td>
                    Conference Date:
                  </td>

                  <td>
                    <strong>
                        {new Date(webinar.date).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									  })}

									  {" , "}
									    
                 
									{new Date(`2000-01-01 ${webinar.time}`).toLocaleTimeString("en-US", {
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									  })} ET
                    </strong>
                  </td>
                </tr>

              </tbody>

            </table>

            <table className="order-table">

              <thead>

                <tr>
                  <th>Training Options</th>
                  <th width="100">Quantity</th>
                  <th width="100">Price</th>
                  <th width="100">Total</th>
                </tr>

              </thead>

              <tbody>
				 {webinar.sessionLive && (
								<tr>
								  <td>Live Session</td>
								  <td></td>
								  <td>${webinar.priceLive}</td>
								  <td></td>
								</tr>
				)}
                <tr>
                  <td>Recording</td>
                  <td></td>
                  <td>${webinar.priceRecording}</td>
                  <td></td>
                </tr>

                <tr>
                  <td>Digital Download</td>
                  <td></td>
                  <td>${webinar.priceDigitalDownload}</td>
                  <td></td>
                </tr>

                <tr>
                  <td>Transcript (PDF)</td>
                  <td></td>
                  <td>${webinar.priceTranscript}</td>
                  <td></td>
                </tr>

               
                <tr>
                  <td
                    colSpan="3"
                    align="right"
                  >
                    <strong>Coupon Code</strong>
                  </td>

                  <td></td>
                </tr>

                <tr>
                  <td
                    colSpan="3"
                    align="right"
                  >
                    <strong>Total</strong>
                  </td>

                  <td></td>
                </tr>

              </tbody>

            </table>

            <div className="note-section">

              <p>
                Please send the completed order form via fax or e-mail
              </p>

              <p>
                <strong>Note:</strong>
                {" "}
                All the order related material
                (Presentation, Transcript etc.)
                shall be fulfilled through the included
                email address only.
              </p>

              <p>
                <strong>
                  For any queries call at
                  {" "}
                  +1 844-445-3653
                </strong>
                {" "}
                or email at
                {" "}
                <a href="mailto:support@profstraining.com">
                  support@profstraining.com
                </a>
              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default OrderForm;
