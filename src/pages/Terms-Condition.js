
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";


function Terms() {
 
  return (
    <>
	 <Helmet>
        <title>Terms & Conditions | Profs Training Course Access Policy </title>
        <meta
          name="description"
          content="Read Profs Training terms for webinar access, copyrighted training content, authorized use, vendor processing, and purchase conditions."
        />
     </Helmet>
    
		<section className="section-top">
			<div className="container">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>Terms & Conditions</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / Terms & Conditions</li>
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


	<div id="contact" className="contact_area section-padding">
		<div className="container">

			<div className="row justify-content-center">

				<div className="col-lg-10 col-md-10 col-12 wow fadeInUp"
					 data-wow-duration="1s"
					 data-wow-delay="0.2s"
					 data-wow-offset="0">

					<div className="card border-0 shadow-lg rounded-4">

						<div className="card-body p-4 p-lg-5 ll">
							<ul>
								<li>Our training content is copyrighted and intended only for registered professionals and authorized users within the purchasing organization.</li>
								<li>You may not distribute, forward, republish, resell, transmit, or share any webinar content with outside agencies, third parties, or individuals who are not employed by or authorized by the organization. </li>
								<li>We work with multiple training vendors and providers. Because purchases may involve processing, shipping, handling, transaction, and refund costs, we reserve the right to charge a return or cancellation fee when applicable.   </li>
								<li>Accessing or purchasing our training confirms your agreement to follow these usage terms. </li>
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

export default Terms;