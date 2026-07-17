import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL, WEBSITE } from "../config";

function LiveWebinars() {
	
	const [webinars, setWebinars] = useState([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
	  getLiveWebinars();
	}, []);

	const getLiveWebinars = async () => {
	  try {
		setLoading(true);

		const response = await axios.get(
		  `${API_URL}/?Website=${WEBSITE}`
		);

		const data = response.data || [];

		const liveWebinars = data.filter(
		  (item) =>
			item.sessionLive === true &&
			item.status === "Active"
		);

		setWebinars(liveWebinars);
	  } catch (error) {
		console.log(error);
	  } finally {
		setLoading(false);
	  }
	};
		
	

  return (
    <>		
		<section className="section-top">
			<div className="container">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>Live Webinars</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / Browse Courses / Live Webinars</li>
						</ul>
					</div>
				</div>
			</div>
		</section>	
		
		
			<style>{`
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

               <div className="row">

  {loading ? (

    <div className="col-12 text-center py-5">
      <h4>Loading Live Webinars...</h4>
    </div>

  ) : webinars.length > 0 ? (

    webinars.map((item) => {

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
                <i className="fa fa-video-camera"></i>
                {" "}Live Webinar
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

                <span>
                  <i className="fa fa-building"></i>
                  {item.industry}
                </span>
				
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
                  color:
                    daysLeft <= 0 ? "#28a745" : "",
                }}
              >
                <span className="triangle"></span>

                {daysLeft === 0
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

    <div className="col-12 text-center py-5">
      <h4>No Live Webinars Found</h4>
    </div>

  )}

</div>
			</div>

		</section>


		
    </>
  );
}

export default LiveWebinars;
