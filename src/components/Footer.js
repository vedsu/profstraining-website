import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer() {
  return (
  

    <>
	
	  <style>{`
  .footer_social h5{
    color:#525fe1;
    font-size:16px;
    font-weight:600;
    margin-bottom:12px;
}

.footer_social a{
    display:inline-block;
    margin-right:12px;
    font-size:22px;
    color:#525fe1;
    transition:0.3s;
}
/*
.footer_social a:hover{
    color:#f9b233;  Theme color 
}
  */
  
  
  `}</style>
      <div className="footer section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="single_footer">
                <h4>Contact Info</h4>

                <div className="sf_contact">
                  <span className="ti-map"></span>
                  <p>
                   
					3524 Silverside Road Suit 35B Wilmington,<br/> DE 19810-4929 United State
                  </p>
                </div>

                <div className="sf_contact">
                  <span className="ti-mobile"></span>
                  <a href="tel:+13025205300" className="footerinfo">+1 302 5205300 </a>
                </div>

                <div className="sf_contact">
                  <span className="ti-time"></span>
                  <p>Mon - Fri, 09 AM - 6 PM EST</p>
                </div>

                <div className="sf_contact">
                  <span className="ti-email"></span>
                  <a href="mailto:support@profstraining.com" className="footerinfo">
					support@profstraining.com
				  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_footer">
                <h4>Company Details</h4>
                <ul>
                  <li>
                    <a href="/about">About us</a>
                  </li>
                  <li>
                    <a href="/speakers">Speakers</a>
                  </li>
                  <li>
                    <a href="/contact">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_footer">
                <h4>Legal Links</h4>
                <ul>
                  <li>
                    <a href="/privacy-policy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/terms-condition">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="/refund-cancellation">Refund & Cancellation</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-xs-12">
              <div className="single_footer">
                <h4>Quick Access</h4>
                <ul>
                  <li>
                    <a href="/suggest-topic">Suggest a Topic</a>
                  </li>
                  <li>
                    <a href="/speaker-opportunity">
                      Speaker Opportunity
                    </a>
                  </li>
                  <li>
                    <a href="/unsubscribe">Unsubscribe</a>
                  </li>
                  <li>
                    <a href="/subscribe">Subscribe Now</a>
                  </li>
                </ul>
				 <div className="footer_social mt-4">
      <h5>Follow Us</h5>

      <a
        href="https://www.youtube.com/@BrianEdmonds-profs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="bi bi-youtube"></i>
      </a>

      <a
        href="https://www.linkedin.com/company/90914223/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="bi bi-linkedin"></i>
      </a>

      <a
        href="https://www.facebook.com/profile.php?id=100090375465921"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="bi bi-facebook"></i>
      </a>
    </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="foot_copy">
        <div className="container">
          <div className="footer_copyright">
            <p>
              &copy; 2026. All Rights Reserved by{" "}
              <a
                href="https://profstraining.com"
                target="_blank"
                rel="noreferrer"
              >
                Profstraining
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
