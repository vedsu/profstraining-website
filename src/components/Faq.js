import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";

function Faq() {
  
 return (
 	<>
	
	<Helmet>
        <title>Profs Training FAQ | Webinar Questions Answered Online </title>
        <meta
          name="description"
          content="Find answers about Profs Training webinars, registration, access, speakers, live sessions, on-demand courses, and professional training support."
        />
      </Helmet>
		<section className="section-top">
			<div className="container">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>Frequently Asked Questions</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / FAQ</li>
						</ul>
					</div>
				</div>
			</div>
		</section>	
		
		
		
		<section className="faq_area section-padding">
			<div className="container">															
				<div className="row justify-content-center">		
					<div className="col-lg-7 col-sm-12 col-xs-12">
						<div className="accordion" id="accordionExample">
						  <div className="accordion-item">
							<h2 className="accordion-header" id="headingOne">
							  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								What is a webinar?
							  </button>
							</h2>
							<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								A webinar is a live online session that combines audio, presentation slides, polls, and Q&A. You can join from anywhere using an internet-connected device.
							  </div>
							</div>
						  </div>
						  <div className="accordion-item">
							<h2 className="accordion-header" id="headingTwo">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
								How do I join a live session?
							  </button>
							</h2>
							<div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Your live webinar instructions will be available on your dashboard and also sent to your registered email 12 hours before the session. Join 10–15 minutes early to test your internet, browser, and audio.
							  </div>
							</div>
						  </div>
						  <div className="accordion-item">
							<h2 className="accordion-header" id="headingThree">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								Do you offer free webinars?
							  </button>
							</h2>
							<div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Profs Training does not offer free webinars. All sessions require paid registration
							  </div>
							</div>
						  </div>
						  <div className="accordion-item">
							<h2 className="accordion-header" id="headingFour">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
								How to get a handout/presentation(pdf)?
							  </button>
							</h2>
							<div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Login to your dashboard and download the presentation(pdf).
							  </div>
							</div>
						  </div>	
						  <div className="accordion-item">
							<h2 className="accordion-header" id="headingFive">
							  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
								How do I access the course material during a live event?
							  </button>
							</h2>
							<div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Course materials will be shared via email, or you can download them from our GoTo Meeting webinar platform. Availability depends on the webinar and registration package.
							  </div>
							</div>
						  </div>

						<div className="accordion-item">
							<h2 className="accordion-header" id="headingSix">
							  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
								 What happens if I miss the live webinar?
							  </button>
							</h2>
							<div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								If you miss the live session, you are eligible to switch to the recording package at no additional cost upon requesting assistance from our support team.
							  </div>
							</div>
						</div>
						


						<div className="accordion-item">
							<h2 className="accordion-header" id="headingSeven">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
								 What is a Transcript?
							  </button>
							</h2>
							<div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								The transcript is a written record of the spoken words in a webinar. It includes the presenter’s words and any questions and comments from participants. Read at any time within 30 days of access.
							  </div>
							</div>
						</div>	
						
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingEight">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
								What is the difference between registration packages?
							  </button>
							</h2>
							<div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Live access lets you attend in real time, while a recording allows later viewing. Transcripts provide written content, and digital downloads allow permitted lifetime access.
							  </div>
							</div>
						</div>	
						
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingNine">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
								How do I update my registration?
							  </button>
							</h2>
							<div id="collapseNine" className="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Sign in to your account or contact Customer Support to update attendee or billing details. Submit all changes as early as possible before the webinar.
							  </div>
							</div>
						</div>
						
						
						
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingTen">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
								Where can I find my live webinar link?
							  </button>
							</h2>
							<div id="collapseTen" className="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								The joining link will be sent to your registered email address before the session. Check your inbox, spam, promotions folder, and Profs Training account.
							  </div>
							</div>
						</div>	
						
						
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingEleven">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
								 How do I receive the recording, transcript, or digital download?
							  </button>
							</h2>
							<div id="collapseEleven" className="accordion-collapse collapse" aria-labelledby="headingEleven" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Your purchased product will be delivered by email within 48 hours of the post-live session, or it will be available in your Profs Training account.
							  </div>
							</div>
						</div>	
						
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingTwl">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwl" aria-expanded="false" aria-controls="collapseTwl">
								How do I get an invoice or receipt?
							  </button>
							</h2>
							<div id="collapseTwl" className="accordion-collapse collapse" aria-labelledby="headingTwl" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Your invoice can be downloaded as a PDF from your dashboard. You will also receive an order confirmation email after successful payment.
							  </div>
							</div>
						</div>	
						
						
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingThrd">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThrd" aria-expanded="false" aria-controls="collapseThrd">
								  Is there a provision for a refund?
							  </button>
							</h2>
							<div id="collapseThrd" className="accordion-collapse collapse" aria-labelledby="headingThrd" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Review the conditions before proceeding:
		  						<ul style={{ listStyle: "inside" }}>
									<li>Cancel at least 72 hours before the webinar; approved refunds include a $30 processing fee.</li>
			  						<li>Registrations may also be transferred to another attendee or future webinar with prior notice.</li>
			  						<li>Refunds are not available for missed sessions, participant-side access issues, on-demand webinars, or delivered digital products.</li>
			  						<li>A full refund will be issued if Profs Training cancels the event due to technical issues.</li>
									</ul>
							  </div>
							</div>
						</div>	

			 			 <div className="accordion-item">
							<h2 className="accordion-header" id="headingFouty">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFouty" aria-expanded="false" aria-controls="collapseFouty">
								Do you offer discounts for non-profit organizations?
							  </button>
							</h2>
							<div id="collapseFouty" className="accordion-collapse collapse" aria-labelledby="headingFouty" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Contact us by email, and our team will confirm any available offers or discount options.
							  </div>
							</div>
						</div>	


			   <div className="accordion-item">
							<h2 className="accordion-header" id="headingFifty">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFifty" aria-expanded="false" aria-controls="collapseFifty">
								How do I access the podcast?
							  </button>
							</h2>
							<div id="collapseFifty" className="accordion-collapse collapse" aria-labelledby="headingFifty" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								You can access the podcast through the link below:<br/>
		  						<a
        href="https://www.youtube.com/@BrianEdmonds-profs"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#23282c" }}
      >https://www.youtube.com/@BrianEdmonds-profs</a>
							  </div>
							</div>
						</div>	


								   <div className="accordion-item">
							<h2 className="accordion-header" id="headingSixty">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSixty" aria-expanded="false" aria-controls="collapseSixty">
								When will I receive my Certificate of Completion?
							  </button>
							</h2>
							<div id="collapseSixty" className="accordion-collapse collapse" aria-labelledby="headingSixty" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Certificates are issued after verifying attendance and participation requirements. We will email and make it available within 24 hours with the Activity ID.
							  </div>
							</div>
						</div>	

		     <div className="accordion-item">
							<h2 className="accordion-header" id="headingSeventy">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeventy" aria-expanded="false" aria-controls="collapseSeventy">
								How do I add HRCI or SHRM credits to my account?
							  </button>
							</h2>
							<div id="collapseSeventy" className="accordion-collapse collapse" aria-labelledby="headingSeventy" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Sign in to your HRCI or SHRM account and report the activity using your certificate details. Keep the certificate and program information for your records.
							  </div>
							</div>
						</div>	


		   <div className="accordion-item">
							<h2 className="accordion-header" id="headingEightty">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEightty" aria-expanded="false" aria-controls="collapseEightty">
								Will I receive CPE credits for a recording?
							  </button>
							</h2>
							<div id="collapseEightty" className="accordion-collapse collapse" aria-labelledby="headingEightty" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Yes, you will receive CPE credits for a recording only if the session displays the green approval tick.
							  </div>
							</div>
						</div>	


						  
						</div>						
					</div>
					<div className="col-lg-5 col-sm-12 col-xs-12">
						<div className="faq_img">
							<img src="/assets/img/faq.jpg" alt="faq image" />
						</div>
					</div>					
				</div>
			</div>
		</section>
		
		</>				
		
  );
}

export default Faq;
