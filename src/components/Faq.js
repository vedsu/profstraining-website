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
								What is a live session?
							  </button>
							</h2>
							<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								 Live webinar training is a virtual event that takes place in real time, where a speaker presents information, and participants can interact with them through a web conferencing platform.
							  </div>
							</div>
						  </div>
						  <div className="accordion-item">
							<h2 className="accordion-header" id="headingTwo">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
								How to join the live session?
							  </button>
							</h2>
							<div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Login to your dashboard and get your Live Instruction. Also, you will get a notification via email. We will drop you live instructions via email 12 hours before the live webinar.
							  </div>
							</div>
						  </div>
						  <div className="accordion-item">
							<h2 className="accordion-header" id="headingThree">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								When will the recording be available after the live session?
							  </button>
							</h2>
							<div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Recording and Transcript will be available 24 hours after the live date.
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
								 What is Digital Download?
							  </button>
							</h2>
							<div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								A Digital download is a digital file that can be downloaded at your end and used without any further processing. This could include a webinar, video, audio file, or other digital content. Please save it in your local storage so that you will be able to have lifetime access. The digital download link is valid for 30 Days. The information in this email is unique to you and valid only for you. Please do not share the information with others.
							  </div>
							</div>
						  </div>

						<div className="accordion-item">
							<h2 className="accordion-header" id="headingSix">
							  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
								  How to get Digital Download?
							  </button>
							</h2>
							<div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Login to your dashboard and click on Digital Download to get lifetime access. Also, we will drop you download instructions via email for the same.
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
								 How to get a transcript(pdf)?
							  </button>
							</h2>
							<div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Login to your dashboard and download the transcript(pdf). Also, we will drop you download instructions via email for the same. The Transcript pdf file will be available in your dashboard for the duration of 30 days of access.
							  </div>
							</div>
						</div>	
						
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingNine">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
								 What is an on-demand(recording) session?
							  </button>
							</h2>
							<div id="collapseNine" className="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								A recorded webinar is an online event that has been pre-recorded and can be watched at any time with 30 days’ access.
							  </div>
							</div>
						</div>
						
						
						
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingTen">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
								 How to watch an on-demand(recording) session?
							  </button>
							</h2>
							<div id="collapseTen" className="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Login to your dashboard and watch the recording. Also, we will drop you download instructions via email for the same. The recording access will be available in your dashboard for the duration of 30 days with unlimited watch access.
							  </div>
							</div>
						</div>	
						
						
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingEleven">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
								 How to get an invoice?
							  </button>
							</h2>
							<div id="collapseEleven" className="accordion-collapse collapse" aria-labelledby="headingEleven" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Login to your dashboard and download the Invoice(pdf). Also, we will drop Thank You email once the order is confirmed.
							  </div>
							</div>
						</div>	
						
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingTwl">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwl" aria-expanded="false" aria-controls="collapseTwl">
								 Is there any other option for registration?
							  </button>
							</h2>
							<div id="collapseTwl" className="accordion-collapse collapse" aria-labelledby="headingTwl" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								You can download the registration form or request a call.
							  </div>
							</div>
						</div>	
						
						
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingThrd">
							  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThrd" aria-expanded="false" aria-controls="collapseThrd">
								  How can I change my password?
							  </button>
							</h2>
							<div id="collapseThrd" className="accordion-collapse collapse" aria-labelledby="headingThrd" data-bs-parent="#accordionExample">
							  <div className="accordion-body">
								Login to your dashboard and go to my profile and change the password.
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