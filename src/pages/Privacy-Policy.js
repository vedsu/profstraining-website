
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";


function PrivacyPolicy() {
  
  return (
    <>
	
	<Helmet>
        <title>Privacy Policy | Profs Training Data Practices Guide</title>
        <meta
          name="description"
          content="Review how Profs Training handles personal information, webinar updates, communication preferences, and training registration support."
        />
    </Helmet>
     
		<section class="section-top">
			<div class="container">
				<div class="col-lg-10 offset-lg-1 text-center">
					<div class="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>Privacy Policy</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / Privacy Policy</li>
						</ul>
					</div>
				</div>
			</div>
		</section>	
		
		
				<style>{`
					.ll ul {
						list-style: disc;
					}
				`}</style>


		<div id="contact" class="contact_area section-padding">
			<div class="container">

			  
			   
				<div class="row justify-content-center">

					<div class="col-lg-10 col-md-10 col-12 wow fadeInUp"
						 data-wow-duration="1s"
						 data-wow-delay="0.2s"
						 data-wow-offset="0">

						 <div class="card border-0 shadow-lg rounded-4">

							<div class="card-body p-4 p-lg-5 ll">
								<ul>
									<li>We value your privacy and treat your personal information with care and responsibility. We do not sell your information or share it with third parties for unrelated marketing purposes.</li>
									<li>Any information you provide is used only to keep you informed about webinars, compliance training, and related educational programs, or to support your registration and participation in events you choose to attend. </li>
									<li>You are always in control of your communication preferences. If you no longer wish to receive webinar updates or email notifications, you may contact us at any time, and we will remove you from our mailing list.</li>
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

export default PrivacyPolicy;