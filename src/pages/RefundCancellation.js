
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";


function RefundCancellation() {
  

  return (
    <>
     
		<Helmet>
			<title>Refund & Cancellation Policy | Profs Training Webinars </title>
			<meta
			  name="description"
			  content="Review refund and cancellation terms for Profs Training webinars, including applicable processing, handling, transaction, or return fees."
			/>
		 </Helmet>
		<section className="section-top">
			<div className="container">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>Refund & Cancellation</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / Refund & Cancellation</li>
						</ul>
					</div>
				</div>
			</div>
		</section>	
		
		
		<style>{`


			.ll ul{
				list-style: disc;
				padding-left: 35px;
			  
			}


		`}</style>


<div id="contact" className="contact_area section-padding">
    <div className="container">

      
        
        <div className="row justify-content-center">

            <div className="col-lg-10 col-md-10 col-12 wow fadeInUp"
                 data-wow-duration="1s"
                 data-wow-delay="0.2s"
                 data-wow-offset="0">

                 <div className="card border-0 shadow-lg rounded-4">

                    <div className="card-body p-4 p-lg-5 ll">
					<h4 className="mb-2">Cancellation Policy for Live Conferences</h4>
					<ul>
						<li> Cancellations are allowed and accepted for Virtual live conferences only if the request to cancel is placed at least 72 hours before the scheduled time of the conference.  </li>
						<li> Cancellations to webinars are refundable; only a small fee of $30 is deducted and used for processing the request. </li>
						<li> If you cannot participate in a webinar you registered for, please let us know as soon as possible. </li>
                    </ul>
					
					<h4 className="mb-2 mt-4">Substitution Policy for Live Conferences</h4>
					<ul>
					 <li>  Participants can opt for substitution in place of cancellation to avoid the processing fee that comes with canceling.</li>
					 <li>Substitution can either replace a webinar with another one at a different time or day or substitute the registered participant with another person taking their place.  </li>
					 <li> Substitution is free, but we require a period for proper processing for on-demand webinars. </li>
					</ul>
					
					<h4 className="mb-2 mt-4">Cases and Situations in which we do not allow Substitutions and Cancellations</h4>
					<ul>
					 <li>  Substitution/Cancellation is not allowed if the attendee misses the scheduled session and does not offer any kind of refund.</li>
					 <li>If the attendee or participant does not get webinar information due to issues like bounced emails, restricted emails, or any other system issues on the attendee or participant's end.  </li>
					
					</ul>
					
						<h4 className="mb-2 mt-4">Our REFUND Policy</h4>
					<ul>
					 <li>  If our website cancels a webinar due to technical faults or related challenges, a 100% refund of the participation fees is done.</li>
					 <li>No refund is offered in cases of digital downloads and transcripts.  </li>
					 <li> If a participant needs to receive the login instructions, they can contact customer services at least 24 hours before the scheduled time of the webinar and can reach us by email, chat, and toll-free number. </li>
					
					</ul>

                </div>

            </div>

			</div>

		</div>
	</div>
	</div>

			
    </>
  );
}

export default RefundCancellation;