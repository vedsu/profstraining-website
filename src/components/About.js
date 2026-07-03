import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";

function About() {

  return (
     <>
	 
	<Helmet>
	  <title>About Profs Training | Expert-Led Webinar Course Hub </title>
	  <meta
		name="description"
		content="Learn how Profs Training supports professionals with live and on-demand webinars across compliance, healthcare, HR, pharma, finance, and IT."
	  />
	</Helmet>
		<section className="section-top">
			<div className="container">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>About Us</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / About</li>
						</ul>
					</div>
				</div>
			</div>
		</section>	
		
			
	
	<section className="ab_area section-padding">
		<div className="container">									
			<div className="row">								
				<div className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0">
					<div className="ab_img">
						<img src="/assets/img/aboutus.png" className="img-fluid" alt="image" />
					</div>
				</div>						
				<div className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s" data-wow-offset="0">
					<div className="ab_content">
						<h2>Empower Your Professional Growth With Us</h2>
						<p>We the leading professional education and digital learning platform dedicated to advancing knowledge and skills in compliance and regulations. Our platform offers a wide range of webinars and online training sessions delivered by industry experts. With a keen eye on compliance issues and up-to-date knowledge of trending topics, our experts provide valuable insights into regulatory compliance across various industries.</p>
						<p>Our comprehensive training covers industries such as Human Resources, Information Technologies, Real Estate, Education, Transportation & Logistics, Banking, Insurance & Finance, Healthcare, Pharmaceutical, and Food & Beverage.</p>
						<p> Attending webinars on our platform equips you with the necessary skills to stay ahead in your professional career. We understand the demands of your busy schedule, which is why we offer flexible learning options including live webinars, recorded sessions, transcripts, and digital downloads. </p>
						
						
					</div>
				</div>				  
			</div>
		</div>
	</section>
		
	
			
	<section className="top_cat__area section-padding"  style={{
    backgroundImage: "url('/assets/img/bg/shape-1.png')",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  }}>
		<div className="container">									
			<div className="section-title text-center">
				<h2>Empower Your Professional Growth With Us</h2>
				<p>We provide expert-led webinars and professional training programs designed to help you upgrade your skills, stay compliant, and advance your career with flexible online learning solutions.</p>
			</div>						
			<div className="row">					
				<div className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0">
					<div className="single_tp">
						
						<h3>Our Vision</h3>
						<p>Our vision is to become a trusted global learning platform that bridges the gap between professional development and regulatory compliance. We aim to create a future where professionals across every industry have easy access to reliable, practical, and up-to-date education that helps them succeed with confidence in a rapidly changing world.</p>
					</div>
				</div>			
				<div className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
					<div className="single_tp">
						
						<h3>Our Mission</h3>
						<p>Our mission is to deliver accessible, industry-relevant, and expert-driven training programs that enhance professional skills and compliance awareness. Through live webinars, recorded sessions, digital resources, and flexible learning options, we strive to help professionals stay informed, competitive, and prepared for industry challenges across sectors, including Healthcare, IT, HR, Finance, Education, Real Estate, Transportation, and more.</p>
					</div>
				</div>		
										
			</div>
		</div>
	</section>
	
  </>
  );
}

export default About;