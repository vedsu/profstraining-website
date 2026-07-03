import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";

function Speakers() {
	
const [speakers, setSpeakers] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {

  setLoading(true);

  axios
    .get(`${API_URL}/speaker?Website=${WEBSITE}`)
    .then((res) => {

      const activeSpeakers = res.data.filter(
        (item) => item.status === "Active"
      );

      setSpeakers(activeSpeakers);

    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });

}, []);

  return (
     <>
	 
	 <Helmet>
        <title>Industry Expert Speakers | Profs Training Webinars </title>
        <meta
          name="description"
          content="Meet experienced speakers who deliver practical webinars on compliance, healthcare, HR, pharma, finance, IT, and corporate training topics."
        />
      </Helmet>
 
		<section className="section-top">
			<div className="container">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>Our Speakers</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / Speakers</li>
						</ul>
					</div>
				</div>
			</div>
		</section>	
		
		
		
		<section id="blog" className="blog_area section-padding">
			<div className="container">	
				<div className="row">

  {loading ? (

  <div className="col-12 text-center">
      <h4>Loading Speakers...</h4>
  </div>

) : speakers.length > 0 ? (

    speakers.map((item) => (

      <div
        className="col-lg-3 col-sm-6 col-xs-12 wow fadeInUp"
        key={item.id}
      >
        <div className="single_blog">

          <Link to={`/speaker-details/${item.id}`}>
            <img
              src={item.photo}
              className="img-fluid"
              alt={item.name}
             
            />
          </Link>

          <div className="content_box text-center">

            <h2>
              <Link
                to={`/speaker-details/${item.id}`}
                style={{
                  color: "#222",
                  textDecoration: "none"
                }}
              >
                {item.name}
              </Link>
            </h2>

            <Link
              className="btn_one"
              to={`/speaker-details/${item.id}`}
            >
              Read More <i className="ti-arrow-top-right"></i>
            </Link>

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
			</div>
		</section>	
		
			   </>	
   
  );
}

export default Speakers;