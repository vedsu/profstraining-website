import { useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";

function Testimonials() {
	


  return (
    <>
	<Helmet>
        <title>Profs Training Reviews & Testimonials from Learners </title>
        <meta
          name="description"
          content="Read testimonials from professionals who chose Profs Training for expert-led webinars, practical learning, and industry-focused courses."
        />
    </Helmet>
	 
	<section className="section-top">
			<div className="container">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>Testimonials</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / Testimonials</li>
						</ul>
					</div>
				</div>
			</div>
		</section>	
			
		
		<section id="blog" className="blog_area section-padding">
			<div className="container">	
				<div className="row">


					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
							
							<div className="testimonial_content">
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<p>The EEOC update was easy to follow and gave me clearer language for handling harassment and retaliation questions with our team.</p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Robyn Edwards</h4>
								<p>New Jersey</p>
							</div>
						</div>
						
					</div>
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
								
								<div className="testimonial_content">
									<i className="bi bi-star-fill"></i>
									<i className="bi bi-star-fill"></i>
									<i className="bi bi-star-fill"></i>
									<i className="bi bi-star-fill"></i>
									<i className="bi bi-star-fill"></i>
									<p>As a CEO, I appreciated how the Medicare billing session connected compliance expectations with real operational decisions.</p>
								</div>
								<div className="testi_pic_title">
									
									<h4>Patrick Fithen</h4>
									<p>Idaho</p>
								</div>
						</div>
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
							
							<div className="testimonial_content">
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<p>This provider enrollment training broke down denial risks in a way that felt directly relevant to my daily credentialing work.</p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Meredith Roberts</h4>
								<p>Texas</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
							
							<div className="testimonial_content">
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<p>The ChatGPT session gave me several simple admin workflows I could actually picture using the same week.</p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Michelle Dickey</h4>
								<p>Georgia</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> The examples around incident-to and split/shared billing were clear, especially for APP oversight and clinical team coordination.</p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Emily Kumazec</h4>
								<p>Ohio</p>
							</div>
						</div>
						
					</div>
					
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> I liked that the session moved beyond definitions and showed how 2026 billing changes can affect day-to-day review decisions.</p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Caressa Lynch</h4>
								<p>Ohio</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> This was a well-structured Medicare revenue session with compliance points that were easy to take back to leadership.</p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Bill Pye</h4>
								<p>New Jersey</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> The clinical operations angle was handled well, with practical guidance on keeping billing processes compliant without slowing teams down.</p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Tanya McGowan</h4>
								<p>Louisiana</p>
							</div>
						</div>
						
					</div>

					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> The enrollment guidance was specific and useful, especially the parts on avoiding incomplete submissions and preventable delays.</p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Erika Castro</h4>
								<p>New York</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> The Medicare 855 update clarified what has changed and what teams should review before submitting enrollment forms.</p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Nicole Byrd</h4>
								<p>Washington</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> The E/M coding session was direct and helpful for RCM work, especially the discussion around documentation gaps and medical necessity. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Taylor Campos</h4>
								<p>Texas</p>
							</div>
						</div>
						
					</div>
					
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> The 1099 session made the new reporting requirements feel much less confusing and gave our finance team a better checklist to work from. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Adri Hennessey</h4>
								<p>Washington</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> The CCM and RPM update was practical for managers trying to keep programs organized while staying aligned with 2026 expectations. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Nisha Bhalla</h4>
								<p>Kansas</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> The split/shared billing examples were especially helpful from a provider perspective and made the compliance rules easier to apply. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Abby Toth</h4>
								<p>Ohio</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> The E/M documentation training was very relevant to revenue cycle work and pointed out mistakes that can easily be missed during review. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Dianne Dagher</h4>
								<p>Michigan</p>
							</div>
						</div>
						
					</div>
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> This session gave me practical coding and billing reminders that connected directly to medical necessity and cleaner documentation. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Keenan Daly</h4>
								<p>New York</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								
								<p> The Medicare billing session was concise, practical, and useful for understanding where leadership should pay closer attention in 2026. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Glenn Heinrichs</h4>
								<p>Pennsylvania</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="ti-star-filled"></i>
								
								<p> The HIPAA content was practical and current. I would have liked a little more time for IT-specific examples, but it was still very useful. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Vincent Borgese</h4>
								<p>New Jersey</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="ti-star-filled"></i>
								
								<p> The EEOC reset webinar covered the major workplace issues well and gave managers a helpful refresher on documentation and response steps. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Tonita Addison</h4>
								<p>Delaware</p>
							</div>
						</div>
						
					</div>
					
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="ti-star-filled"></i>
								
								<p> The billing material was detailed and finance-focused enough to be worth the time. A few more payer comparison examples would make it even stronger. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Mark Gatley Hebard</h4>
								<p>Texas</p>
							</div>
						</div>
						
					</div>
					
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="ti-star-filled"></i>
								
								<p> The webinar gave me a solid understanding of split/shared billing updates. Some sections were dense, but the examples helped. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Angie Fredrickson</h4>
								<p>Michigan</p>
							</div>
						</div>
						
					</div>
					
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="ti-star-filled"></i>
								
								<p> The session was organized and easy to follow, with practical takeaways I could bring back to my team even without a heavy technical background. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Andrew Adams</h4>
								<p>Texas</p>
							</div>
						</div>
						
					</div>
					
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="ti-star-filled"></i>
								
								<p> The incident-to billing material was informative and relevant to specialty care. More oncology-specific scenarios would have made it even better. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Jackie Miller</h4>
								<p>Pennsylvania</p>
							</div>
						</div>
						
					</div>
					
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="ti-star-filled"></i>
								
								<p> The reporting update was clear and professional. I came away with a better sense of what needs attention before year-end processing. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Patricia Whitebread</h4>
								<p>North Carolina</p>
							</div>
						</div>
						
					</div>
					
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="ti-star-filled"></i>
								
								<p> The coding webinar was strong and financially relevant. It would be useful to add a few more executive-level summary slides next time. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Regina Oxford</h4>
								<p>Kansas</p>
							</div>
						</div>
						
					</div>
					
					<div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp mb-5">
						<div className="testimonial">
											
							<div className="testimonial_content">
							 
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="bi bi-star-fill"></i>
								<i className="ti-star-filled"></i>
								
								<p> The E/M coding topic was explained clearly, and the documentation examples were helpful for utilization review conversations. </p>
							</div>
							<div className="testi_pic_title">
								
								<h4>Candice Coley</h4>
								<p>Georgia</p>
							</div>
						</div>
						
					</div>

			    </div>
		    </div>
		</section>	
		
		

		
		
	
		
		
	
	</>
  );
}

export default Testimonials;

