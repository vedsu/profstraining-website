import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { API_URL, WEBSITE } from "../config";

function AllWebinars() {
	
  const [upcomingWebinars, setUpcomingWebinars] = useState([]);
  const [recordedWebinars, setRecordedWebinars] = useState([]);
  
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

	const [filteredUpcoming, setFilteredUpcoming] = useState([]);
	const [filteredRecorded, setFilteredRecorded] = useState([]);
	
	
	const [searchParams] = useSearchParams();

	const keywordFromUrl = searchParams.get("keyword") || "";
	
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
    getWebinars();
  }, []);
  
  
  useEffect(() => {
  if (
    selectedIndustry === "" &&
    searchKeyword === ""
  ) {
    setFilteredUpcoming(upcomingWebinars);
    setFilteredRecorded(recordedWebinars);
  }
}, [
  selectedIndustry,
  searchKeyword,
  upcomingWebinars,
  recordedWebinars,
]);

  const getWebinars = async () => {
    try {
		
		  setLoading(true);

      const response = await axios.get(
        `${API_URL}/?Website=${WEBSITE}`
      );

      const data = response.data || [];

      const liveWebinars = data.filter(
        item =>
          item.sessionLive === true &&
          item.status === "Active"
      );

      const recordedWebinars = data.filter(
        item =>
          item.sessionLive === false &&
          item.status === "Active"
      );

   setUpcomingWebinars(liveWebinars);
	setRecordedWebinars(recordedWebinars);

	if (keywordFromUrl) {

	  const search = keywordFromUrl.toLowerCase().trim();

	  setFilteredUpcoming(
		liveWebinars.filter((item) =>
		  item.topic?.toLowerCase().includes(search)
		)
	  );

	  setFilteredRecorded(
		recordedWebinars.filter((item) =>
		  item.topic?.toLowerCase().includes(search)
		)
	  );

	  setSearchKeyword(keywordFromUrl);

	} else {

	  setFilteredUpcoming(liveWebinars);
	  setFilteredRecorded(recordedWebinars);

	}

    } catch (error) {
      console.log(error);
    }
	finally {
		setLoading(false);
	  }
  };
  
  
  
  const handleSearch = (e) => {
  e.preventDefault();

  const keyword = searchKeyword.toLowerCase().trim();

  const upcomingResults = upcomingWebinars.filter((item) => {
    const industryMatch =
      selectedIndustry === "" ||
      item.industry?.toLowerCase() ===
        selectedIndustry.toLowerCase();

    const topicMatch =
      keyword === "" ||
      item.topic?.toLowerCase().includes(keyword);

    return industryMatch && topicMatch;
  });

  const recordedResults = recordedWebinars.filter((item) => {
    const industryMatch =
      selectedIndustry === "" ||
      item.industry?.toLowerCase() ===
        selectedIndustry.toLowerCase();

    const topicMatch =
      keyword === "" ||
      item.topic?.toLowerCase().includes(keyword);

    return industryMatch && topicMatch;
  });

  setFilteredUpcoming(upcomingResults);
  setFilteredRecorded(recordedResults);
};

  return (
    <>
	
	<Helmet>
        <title>Browse Live, On-Demand & All Webinars | Profs Training </title>
        <meta
          name="description"
          content="Explore live, on-demand, and all webinars across healthcare, HR, pharma, finance, IT, compliance, and corporate training."
        />
     </Helmet>
     	
		<section className="section-top">
			<div className="container">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="section-top-title wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<h1>All Webinars</h1>
						<ul>
							<li><a href="/">Home</a></li>
							<li> / Browse Courses / All</li>
						</ul>
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




.webinar-search-box{
    margin: 40px 0;
}

.search-wrapper{
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 12px;
    padding: 10px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
    border: 2px solid #e8e8e8;
    gap: 10px;
}


.select-box{
    width: 280px;
    position: relative;
}

.industry-select{
    width: 100%;
    height: 58px;
    border: none;
    background: #f8f9fc;
    padding: 0 18px;
    border-radius: 8px;
    font-size: 16px;
    color: #333;
    outline: none;
    cursor: pointer;
}


.input-box{
    flex: 1;
}

.search-input{
    width: 100%;
    height: 58px;
    border: none;
    background: #f8f9fc;
    padding: 0 20px;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
}


.search-btn{
    height: 58px;
    padding: 0 30px;
    border: none;
    border-radius: 8px;
    background: #525fe1;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    transition: 0.3s;
    white-space: nowrap;
}

.search-btn:hover{
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(198, 29, 52, 0.3);
}


@media(max-width: 767px){

    .search-wrapper{
        flex-direction: column;
        padding: 15px;
    }

    .select-box,
    .input-box,
    .search-btn{
        width: 100%;
    }

    .search-btn{
        margin-top: 5px;
    }
}
`}</style>

<section className="home_course section-padding py-5">

    <div className="container">

        
   <div className="container">
    <div className="row justify-content-center">
        <div className="col-lg-10">

           
            <div className="webinar-search-box">

                <form onSubmit={handleSearch}>
                    <div className="search-wrapper">

                       
                        <div className="select-box">
                            <select
								  className="industry-select"
								  value={selectedIndustry}
								  onChange={(e) =>
									setSelectedIndustry(e.target.value)
								  }
								>
								  <option value="">Select Industry</option>

								  <option value="INFORMATION & TECHNOLOGIES">
									Information & Technologies
								  </option>

								  <option value="PHARMACEUTICAL">
									Pharmaceutical
								  </option>

								  <option value="HEALTHCARE">
									Healthcare
								  </option>

								  <option value="HUMAN RESOURCES">
									Human Resources
								  </option>

								  <option value="BANKING, INSURANCE & FINANCE">
									Banking, Insurance & Finance
								  </option>
								</select>
                        </div>

                       
                        <div className="input-box">
                           <input
								  type="text"
								  className="search-input"
								  placeholder="Enter webinar keyword"
								  value={searchKeyword}
								  onChange={(e) =>
									setSearchKeyword(e.target.value)
								  }
								/>
                        </div>

                        
                        <button type="submit" className="search-btn btn_one">
                            <i className="fas fa-search"></i> Search
                        </button>

                    </div>
                </form>

            </div>
          

        </div>
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
				
				{loading ? (

  <div className="col-12 text-center py-5">
    <h4>Loading webinars...</h4>
  </div>

) : filteredUpcoming.length > 0 ? (
				
					filteredUpcoming.map((item) => {

						  const webinarDate = new Date(item.date);

						  const month = webinarDate.toLocaleString("en-US", {
							month: "short",
						  }).toUpperCase();

						  const day = webinarDate.getDate();

						  const daysLeft = Math.max(
							0,
							Math.ceil(
							  (webinarDate - new Date()) /
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
									 {new Date(item.date).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
									  })}
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

                                <div className="days-left"  style={{
										color: daysLeft <= 0 ? "#28a745" : "",
										fontWeight: "600"
									  }}>
									<span className="triangle"></span>
									{daysLeft === 0 ? "Today" : `${daysLeft} days left`}
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
					 ); })
						) : (

					  <div className="col-12 text-center py-5">
						<h4>No Upcoming Webinars Found</h4>
					  </div>

					)}

                   
                   

                </div>

            </div>



           

            <div className="tab-pane fade" id="ondemand">

                <div className="row">
				
					 {loading ? (

				  <div className="col-12 text-center py-5">
					<h4>Loading webinars...</h4>
				  </div>

				) : filteredRecorded.length > 0 ? (
				filteredRecorded.map((item) => {

					  const webinarDate = new Date(item.date);

					  const month = webinarDate.toLocaleString("en-US", {
						month: "short",
					  }).toUpperCase();

					  const day = webinarDate.getDate();

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
									  {new Date(item.date).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
									  })}
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
    <h4>No Recorded Webinars Found</h4>
  </div>

)}

                </div>

            </div>

        </div>

    </div>

</section>

		
    </>
  );
}

export default AllWebinars;
