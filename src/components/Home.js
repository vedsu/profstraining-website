import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";



function Home() {
	
	const [webinars, setWebinars] = useState([]);
	const [speakers, setSpeakers] = useState([]);
	const navigate = useNavigate();
	const [searchKeyword, setSearchKeyword] = useState("");
	
const upcomingWebinars = webinars.filter(
  (item) =>
    item?.status?.toLowerCase() === "active" &&
    (
      item.sessionLive === true ||
      item.sessionLive === "true"
    )
);

const onDemandWebinars = webinars.filter(
  (item) =>
    item?.status?.toLowerCase() === "active" &&
    (
      item.sessionLive === false ||
      item.sessionLive === "false"
    )
);


	useEffect(() => {
		 axios
    .get(`${API_URL}/?Website=${WEBSITE}`)
    .then((res) => {

      console.log("FULL RESPONSE:", res.data);

      let data = [];

      if (Array.isArray(res.data)) {
        data = res.data;
      }
      else if (Array.isArray(res.data.data)) {
        data = res.data.data;
      }
      else if (Array.isArray(res.data.body)) {
        data = res.data.body;
      }
      else if (
        res.data &&
        Array.isArray(res.data[0])
      ) {
        data = res.data[0];
      }

      console.log("WEBINARS:", data);

      setWebinars(data);

    })
    .catch((err) => {
      console.log(err);
    });
	
	
	
	 // SPEAKERS API
  axios
    .get(`${API_URL}/speaker?Website=${WEBSITE}`)
    .then((res) => {

      console.log("SPEAKERS:", res.data);

      if (Array.isArray(res.data)) {
		  
       const activeSpeakers = res.data.filter(
            (item) => item.status === "Active"
          );

          setSpeakers(activeSpeakers);
      }

    })
    .catch((err) => {
      console.log(err);
    });



		if (window.Swiper) {
  new window.Swiper(".categorySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}
		

  
  
   const counters = document.querySelectorAll(".counter-num");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent, 10);

    let current = 0;
    counter.textContent = "0";

    const timer = setInterval(() => {
      current += Math.ceil(target / 50);

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      counter.textContent = current;
    }, 30);
  });
  
  
  
	if (window.$ && window.$.fn.owlCarousel) 
	{

		  const $slider = window.$("#testimonial-slider2");

		  if ($slider.hasClass("owl-loaded")) {
			$slider.data("owlCarousel").destroy();
			$slider.removeClass("owl-loaded");
			$slider.find(".owl-wrapper-outer").children().unwrap();
		  }

		  $slider.owlCarousel({
			items: 2,
			itemsDesktop: [1400, 2],
			itemsDesktopSmall: [1199, 3],
			itemsTablet: [1024, 2],
			itemsMobile: [767, 1],

			pagination: true,
			navigation: true,
			navigationText: ["", ""],
			slideSpeed: 1000,
			autoPlay: true
		  });

	}

}, 
 []);


  return (

  <>
  
  <style>{`
  /* iPad Pro */
/* ===========================
   iPad Pro (768px - 1194px)
=========================== */

@media only screen and (min-width:768px) and (max-width:1194px){

    /* Hero Section */
    .home_bg{
        padding:60px 0;
        min-height:auto !important;
        height:auto !important;
    }

    /* Hide left image column */
    .home_bg .row > div:first-child{
        display:none !important;
    }

    /* Right column full width */
    .home_bg .row > div:last-child{
        flex:0 0 100%;
        max-width:100%;
    }

    /* Hero Content */
    .hero-right{
        width:100%;
        max-width:900px;
        margin:0 auto;
        padding:0;
    }

    /* Search Box */
    .home_sb2{
        margin:0 0 25px;
    }

    .banner_subs2{
        display:flex;
        width:100%;
    }

    .home_si2{
        flex:1;
        height:52px;
        font-size:15px;
    }

    .subscribe__btn{
        height:52px;
        padding:0 25px;
        white-space:nowrap;
    }

    /* Cards */
    .hero-boxes{
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:18px;
    }

    .hero-card{
        width:100%;
        min-height:180px;
        margin:0;
    }

    .card-three{
        grid-column:auto;
    }

    .hero-card h5{
        font-size:18px;
    }

    .hero-card p{
        font-size:14px;
        line-height:1.6;
    }
	
	 
	
	
	   
 
}
  `}</style>
  
	<Helmet>
        <title>Expert-Led Compliance Webinars Online | Profs Training </title>
        <meta
          name="description"
          content="Join live and on-demand professional webinars in healthcare, HR, pharma, finance, IT, compliance, and corporate training."
        />
     </Helmet>
	  
	  
	<section className="home_bg hb_height"
		style={{
    backgroundImage: "url('/assets/img/bg/home-bg2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  }}>
		<div className="container">
			<div className="row">
				<div className="col-lg-6 col-md-6 col-12">
					<div className="hero-text-img2">
						<img src="/assets/img/home-img1.png" className="img-fluid" alt="" />
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-12">

    <div className="hero-right">

        <div className="hero-boxes">
		
		 <div className="hero-card card-two">
                <div className="hero-icon">
                    <i className="fa fa-desktop"></i>
                </div>

                <div>
                    <h5>Live Webinars</h5>
                    <p>
                        Join live interactive sessions with industry professionals.
                    </p>
                </div>
            </div>

            <div className="hero-card card-one">
                <div className="hero-icon">
                    <i className="fa fa-video-camera"></i>
                </div>

                <div>
                    <h5>Recorded Webinars</h5>
                    <p>
                        Watch expert-led recorded webinars anytime at your convenience.
                    </p>
                </div>
            </div>

           

            <div className="hero-card card-three">
                <div className="hero-icon">
                    <i className="fa fa-handshake-o"></i>
                </div>

                <div>
                    <h5>Digital Download</h5>
                    <p>
                        Digital Download provides you the lifetime access for a webinar. So you can watch it anytime as per your convenience.
                    </p>
                </div>
            </div>

        </div>

        <div className="home_sb2 mt-4">

            <form className="banner_subs2">

                <input
                    type="text"
                    className="form-control home_si2"
                    placeholder="Search Your Webinar Here"
                    value={searchKeyword}
                    onChange={(e)=>setSearchKeyword(e.target.value)}
                />

                <button
                    type="button"
                    className="subscribe__btn"
                    onClick={() =>
                        navigate(`/webinars?keyword=${encodeURIComponent(searchKeyword)}`)
                    }
                >
                    Search
                    <i className="fa fa-paper-plane ms-2"></i>
                </button>

            </form>

        </div>

    </div>

</div>
			</div>
		</div>
	</section>
	
		
<style>{`


.custom-tabs{
    display:flex;
    gap:15px;
    margin-bottom:40px;
}

.custom-tabs .nav-item{
    flex:1;
}

.custom-tabs .nav-link{
    width:100%;
    border:none;
    border-radius:6px;
    padding:18px;
    font-size:20px;
    font-weight:600;
    background:#b9bde5;
    color:#714ab1;
    transition:0.3s;
}

.custom-tabs .nav-link.active{
    background:#726ccf !important;
    color:#fff !important;
}



.webinar-card{
    background:#fff;
    border:1px solid #e5e5e5;
    border-radius:20px;
    padding:22px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:25px;
    margin-bottom:25px;
}



.webinar-date{
    width:120px;
    min-width:120px;
    text-align:center;
    background:#f2f4ff;
    border-radius:14px;
    padding:15px;
}

.webinar-date .month{
    display:block;
    color:#6765f2;
    font-size:18px;
    font-weight:700;
    margin-bottom:5px;
}

.webinar-date h3{
    color:#f26b65;
    font-size:40px;
    font-weight:500;
    margin:0;
}



.webinar-content{
    flex:1;
}

.webinar-badge{
    background:#f8dfe3;
    color:#6765f2;
    padding:8px 14px;
    border-radius:6px;
    font-size:14px;
    font-weight:600;
    display:inline-block;
    margin-bottom:15px;
}

.webinar-content h3{
    color:#143d8d;
    font-size:20px;
    font-weight:600;
    line-height:1.4;
    margin-bottom:15px;
}

.webinar-meta{
    display:flex;
    gap:20px;
    flex-wrap:wrap;
}

.webinar-meta span{
    color:#444;
    font-size:18px;
}

.webinar-meta i{
    color:#f26b65;
    margin-right:6px;
}



.webinar-action{
    width:220px;
    text-align:center;
    border-left:1px solid #e5e5e5;
    padding-left:20px;
}



.days-left{
    display:inline-flex;
    align-items:center;
    gap:10px;
    border:3px solid #6765f2;
    border-radius:40px;
    padding:10px 22px;
    color:#111;
    font-weight:700;
    font-size:18px;
    margin-bottom:18px;
}

.triangle{
    width:0;
    height:0;
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    border-right:18px solid #f26b65;
}



.details-btn{
    display:block;
    background:#525fe1;
    color:#fff;
    text-decoration:none;
    padding:14px;
    border-radius:6px;
    font-weight:700;
}

.details-btn:hover{
    color:#fff;
}



@media(max-width:991px){

    .webinar-card{
        flex-direction:column;
        align-items:flex-start;
    }

    .webinar-action{
        width:100%;
        border-left:none;
        border-top:1px solid #eee;
        padding-left:0;
        padding-top:20px;
        text-align:left;
    }

    .webinar-content h3{
        font-size:22px;
    }

    .custom-tabs{
        flex-direction:column;
    }
}
`}</style>



<section className="home_course section-padding py-5">

    <div className="container">

       
        <div className="row align-items-center mb-4">

            <div className="col-lg-8">
                <div className="section-title">
                    <h3>
                        Stay industry-ready with curated live and on-demand webinars designed for professionals in Healthcare, HR, Pharma, Banking, Compliance, and corporate fields.
                    </h3>
                </div>
            </div>

            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0 mobile-view">
                <a href="/webinars" className="btn_one">
                    View All Webinars
                    <i className="ti-arrow-top-right"></i>
                </a>
            </div>

        </div>


       
        <ul className="nav custom-tabs" id="courseTab" role="tablist">

            <li className="nav-item" role="presentation">
                <button className="nav-link active"
                        id="upcoming-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#upcoming"
                        type="button">
                    Upcoming
                </button>
            </li>

            <li className="nav-item" role="presentation">
                <button className="nav-link"
                        id="ondemand-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#ondemand"
                        type="button">
                    Recorded
                </button>
            </li>

        </ul>


       
        <div className="tab-content" id="courseTabContent">

           

            <div className="tab-pane fade show active" id="upcoming">

                <div className="row">
					
					   {upcomingWebinars.length > 0 ? (

						  upcomingWebinars.map((item) => {

						const [year, monthNo, day] = item.date.split("-");

const months = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const month = months[parseInt(monthNo, 10) - 1];

// Days Left
const webinarDate = new Date(item.date);

const daysLeft = Math.max(
  0,
  Math.ceil(
    (webinarDate.getTime() - new Date().getTime()) /
    (1000 * 60 * 60 * 24)
  )
);

					
                     return (
						<div className="col-12" key={item.id}>

							<div className="webinar-card">

								<div className="webinar-date">
									<span className="month">{month}</span>
									<h3>{day}</h3>
								 </div>

								<div className="webinar-content">

									<span className="webinar-badge">
										<i className="fa fa-video-camera"></i> Live Webinar
									</span>

									 <h3>{item.topic}</h3>

									<div className="webinar-meta">
									  <span>
										  <i className="fa fa-calendar"></i>
										  {`${month} ${day}, ${year}`}
										</span>

									  <span>
										<i className="fa fa-clock-o"></i>
										  {new Date(`2000-01-01 ${item.time}`).toLocaleTimeString("en-US", {
											hour: "2-digit",
											minute: "2-digit",
											hour12: true,
										  })} ET
									  </span>
									  
									  <span><i class="fa fa-building"></i>{item.industry}</span>
									  
									  <span><i class="fa fa-user"></i>{item.speaker}</span>

									  <span>
										<i className="fa fa-hourglass-half"></i>
										{item.duration} mins
									  </span>
									</div>

								</div>

								<div className="webinar-action">

									<div
										  className="days-left"
										  style={{
											color: daysLeft <= 0 ? "#28a745" : "",
											fontWeight: "600"
										  }}
										>
										  <span className="triangle"></span>

										  {daysLeft <= 0
											? "Today"
											: `${daysLeft} days left`}
									</div>

									<Link
									  to={`/WebinarDetails/${item.webinar_url}`}
									  className="details-btn"
									>
									  View Details
									</Link>

								</div>

							</div>

                    </div>

				  );
				 })
                   ) : (

				  <div className="col-12">
					<div className="text-center py-5">
					  <h4>No Record Found</h4>
					</div>
				  </div>

				)}
                   

                </div>

            </div>



           
            <div className="tab-pane fade" id="ondemand">

                <div className="row">
				
				 {onDemandWebinars.length > 0 ? (

				  onDemandWebinars.slice(0, 5).map((item) => {

				const [year, monthNo, day] = item.date.split("-");

const months = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const month = months[parseInt(monthNo, 10) - 1];
					  
					return (
					
                    <div className="col-12" key={item.id}>

                        <div className="webinar-card">

                            <div className="webinar-date">
							  <span className="month">{month}</span>
							  <h3>{day}</h3>
							</div>

                            <div className="webinar-content">

                                <span className="webinar-badge">
                                    <i className="fa fa-play-circle"></i>
                                    Recorded Webinar
                                </span>

                               <h3>{item.topic}</h3>

                                <div className="webinar-meta">

								   <span>
  <i className="fa fa-calendar"></i>
  {`${month} ${day}, ${year}`}
</span>
									<span>
									  <i className="fa fa-clock-o"></i>
									  {new Date(`2000-01-01 ${item.time}`).toLocaleTimeString("en-US", {
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									  })} ET
									</span>
									
									<span><i class="fa fa-building"></i>{item.industry}</span>
									 <span><i class="fa fa-user"></i>{item.speaker}</span>

								    <span>
										<i className="fa fa-hourglass-half"></i>
										{item.duration} mins
									</span>

								</div>

                            </div>

                            <div className="webinar-action">

								<Link
								  to={`/WebinarDetails/${item.webinar_url}`}
								  className="details-btn"
								>
								  View Details
								</Link>

							</div>


                        </div>

                    </div>
					
					
				);
		 })
			
			 ) : (

				  <div className="col-12">
					<div className="text-center py-5">
					  <h4>No Record Found</h4>
					</div>
				  </div>

				)}

                </div>

            </div>

        </div>

					<div className="row justify-content-center mt-4">
				 <div className="col-10 col-sm-6 col-md-4 text-center">
					<a href="/webinars" className="btn_one w-100 py-2">
						View All Webinars
					</a>
				</div>
			</div>

    </div>

</section>

	
	

	
	<div className="partner-logo section-padding">
		<div className="container">
			<div className="row part_bg">
				<div className="col-lg-8 col-sm-8 col-xs-12">
					<div className="partner_title">
						<h3>Trusted by <span>86,000+</span> global companies to unlock stronger performance and results. </h3>
					</div>
				</div>
				<div className="col-lg-4 col-sm-4 col-xs-12 text-center">
					<div className="partner">
						<a href="#"><img src="/assets/img/clients/shrm_logo.jpg" alt="image" /></a>
						
						<a href="#"><img src="/assets/img/clients/hrci_logo.jpg" alt="image"/></a>
						
					</div>
				</div>
			</div>
		</div>
	</div>
	
<style>{`

.categorySwiper{
    position: relative;
    overflow: hidden;
}

.categorySwiper .swiper-button-next,
.categorySwiper .swiper-button-prev{
    top: 50%;
    transform: translateY(-50%);
    color: #007bff;
}

.categorySwiper .swiper-button-next{
    right: -5px;
}

.categorySwiper .swiper-button-prev{
    left: -5px;
}

.categorySwiper .swiper-button-next:after,
.categorySwiper .swiper-button-prev:after{
    font-size: 22px;
    font-weight: bold;
}
`}</style>
	
	<section className="category_two_area section-padding">
    <div className="container">

        <div className="section-title text-center">
            <h2>Popular Training Categories</h2>
            <p>
               Take your career to the next level with industry-recognized certification programs that boost your skills and opportunities.
            </p>
        </div>

        <div className="row">

            <div className="swiper categorySwiper">

                <div className="swiper-wrapper">

                    <div className="swiper-slide">
                        <div className="cat_list_two">
                            <h4><a href="#">Information & Technologies</a></h4>
							<strong>Want to stay current in today’s fast-moving digital world? </strong>
                            <p>
                                Build in-demand IT knowledge across AI, cybersecurity, cloud computing, data science, DevOps, software development, and emerging technology trends.
                            </p>
                        </div>
                    </div>
					
                    <div className="swiper-slide">
                        <div className="cat_list_two">
                            <h4><a href="#">Pharmaceutical</a></h4>
							<strong>Need to keep pace with regulatory expectations and industry standards?</strong>
                            <p>
                                Gain focused pharmaceutical training in regulatory compliance, drug safety, clinical research, quality practices, and healthcare-related industry requirements.
                            </p>
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <div className="cat_list_two">
                            <h4><a href="#">Healthcare</a></h4>
							<strong>Want to strengthen your role in patient care, hospital operations, or healthcare compliance?</strong>
                            <p>
                                Explore healthcare training designed for medical professionals, hospital teams, patient safety leaders, and healthcare operations staff looking to build practical, career-focused knowledge.
                            </p>
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <div className="cat_list_two">
                            <h4><a href="#">Human Resources</a></h4>
							<strong>Looking to manage people, performance, and workplace challenges more effectively?</strong>
                            <p>
                               Develop practical HR skills in talent management, employee engagement, leadership, HR analytics, workplace communication, and organizational development.
                            </p>
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <div className="cat_list_two">
                            <h4><a href="#">Banking, Insurance & Finance</a></h4>
							<strong>Ready to understand financial systems, risks, and compliance with more confidence?</strong>
                            <p>
                                Advance your expertise in banking operations, investment strategies, financial analysis, insurance regulations, and risk management through industry-relevant training.
                            </p>
                        </div>
                    </div>

                </div>

               
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>

                
                <div className="swiper-pagination"></div>

            </div>
			

        </div>

    </div>
</section>
	
	

	<style>{`
	.vid_area.va2{
    min-height: 700px;
    display: flex;
    align-items: center;

    background-size: cover;
    background-position: center;
}

.vid_area.va2::before{
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(20, 12, 60, 0.35);
}



.video-button{
    width: 110px;
    height: 110px;
    line-height: 110px;
    display: inline-block;
    border-radius: 50%;
    background: rgba(104, 90, 255, 0.18);
    position: relative;
    animation: pulse 2s infinite;
}

.video-button i{
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius: 50%;
    background: #6C63FF;
    color: #fff;
    font-size: 28px;
    text-align: center;
    display: inline-block;
    transition: 0.3s;
}

.video-button:hover i{
    transform: scale(1.08);
    background: #5a52e8;
}

@keyframes pulse{
    0%{
        box-shadow: 0 0 0 0 rgba(108,99,255,0.5);
    }
    70%{
        box-shadow: 0 0 0 30px rgba(108,99,255,0);
    }
    100%{
        box-shadow: 0 0 0 0 rgba(108,99,255,0);
    }
}

}

	`}</style>


	
		<section className="vid_area va2">

			<div className="container">
				<div className="row">
					<div className="col-lg-12 vp_top wow fadeInUDown"
						data-wow-duration="1s"
						data-wow-delay="0.2s"
						data-wow-offset="0">

						
					</div>
				</div>
			</div>

		</section>
	

	
	<section className="count_area counter_feature">
		<div className="container">
			<div className="row">
				<div className="col-lg-4 col-sm-6 col-xs-12">
					<div className="single-counter">
						<span className="ti-folder sc_one"></span>
						<h2 className="counter-num">88</h2>
						<p>Our Online Webinar</p>
					</div>
				</div>
				
				<div className="col-lg-4 col-sm-6 col-xs-12">
					<div className="single-counter">
						<span className="ti-id-badge sc_three"></span>
						<h2 className="counter-num">1254</h2>
						<p>Certified Customers</p>
					</div>
				</div>
				<div className="col-lg-4 col-sm-6 col-xs-12">
					<div className="single-counter">
						<span className="ti-user sc_four"></span>
						<h2 className="counter-num">122</h2>
						<p>Enrolled Customers</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	

	<section className="team_area section-padding">
		<div className="container">
			<div className="section-title text-center">
				<h2>Meet our Speakers</h2>
				<p>Hear from top experts who ensure you never miss important updates or compliance requirements in your profession.</p>
			</div>
			<div className="row">
			
			 {speakers.length > 0 ? (

				speakers
				  .filter((item) => item.status === "Active")
				  .slice(0, 8)
				  .map((item) => (
			
				<div className="col-lg-3 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s"
					data-wow-offset="0"  key={item.id}>
					<div className="our-team mb-4">
						<div className="team-content">
							 <Link to={`/speaker-details/${item.id}`}>

								<img
								  src={item.photo}
								  alt={item.name}
								  style={{
									width: "90%",
									height: "200px",
									objectFit: "cover",
								  }}
								/>

							</Link>
							
						</div>
						<div className="team-prof">
							
						  <h3>
							<Link
							  to={`/speaker-details/${item.id}`}
							  style={{
								color: "#222",
								textDecoration: "none",
							  }}
							>
							  {item.name}
							</Link>
						  </h3>
							<span>{item.industry}</span>
						</div>
						
					</div>
				</div>
				
				 ))

				  ) : (

					<div className="col-12 text-center">
					  <h4>No Speakers Found</h4>
					</div>

				  )}
				
				
			</div>
			<div className="row justify-content-center mt-4">
				 <div className="col-10 col-sm-6 col-md-4 text-center">
					<a href="/Speakers" className="btn_one w-100 py-2">
						More Speakers
					</a>
				</div>
			</div>
		</div>
	</section>
	

	
	<section className="insfreecourse section-padding">
		<div className="container">
			<div className="row">
				<div className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s"
					data-wow-offset="0">
					<div className="single_ins"
						 style={{
    backgroundImage: "url('/assets/img/ins1.png')",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  }}>
						<div className="single_ins_content">
							
							<h3>Subscribe</h3>
							
							<p>Stay updated with expert-led webinars and professional training programs.</p>
							<a className="btn_one" href="/subscribe">Subscribe now <i className="ti-arrow-top-right"></i></a>
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s"
					data-wow-offset="0">
					<div className="single_ins"
						style={{
    backgroundImage: "url('/assets/img/ins2.png')",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  }}>
						<div className="single_ins_content">
							
							<h3>Speaker Opportunity</h3>
							<p>Share your expertise through live webinars and industry training sessions. </p>
							<a className="btn_one" href="/speaker-opportunity">Apply now <i className="ti-arrow-top-right"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	

	<section className="testi_area section-padding">
		<div className="container">
			<div className="section-title">
				<h2>Why Professionals Choose Us</h2>
			</div>
			<div className="row">
				<div className="col-lg-12 col-sm-12 col-xs-12">
					<div id="testimonial-slider2" className="owl-carousel">
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
				</div>
			</div>
			
			<div className="row justify-content-center mt-5">
				<div className="col-10 col-sm-6 col-md-4 text-center">
				
					<a href="/testimonials" className="btn_one w-100 py-2">More Testimonials</a>
					
				</div>
			</div>
		</div>
	</section>
		  </>
  );
}

export default Home;
