import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL, WEBSITE } from "../config";

function Newsletters() {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${API_URL}/newsletter_panel?website=${WEBSITE}`
      )
      .then((res) => {
        setNewsletters(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section className="section-top">
        <div className="container">
          <div className="col-lg-10 offset-lg-1 text-center">
            <div
              className="section-top-title wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
              data-wow-offset="0"
            >
              <h1>Newsletters</h1>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li> / Newsletters</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .newsletter-card{
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          margin-bottom: 25px;
        }

        .newsletter-img{
          width:100%;
          height:350px;
          object-fit:cover;
          display:block;
        }

        .newsletter-overlay{
          position:absolute;
          left:0;
          right:0;
          bottom:0;
          padding:25px;
          background:linear-gradient(
            to top,
            rgba(0,0,0,0.9),
            rgba(0,0,0,0.5),
            transparent
          );
        }

        .newsletter-date{
    display:inline-block;
    background: rgba(0,0,0,0.7);
    color:#fff;
    padding:6px 12px;
    border-radius:5px;
    font-size:14px;
    font-weight:600;
    margin-bottom:12px;
}

        .newsletter-title{
          color:#fff;
          font-size:28px;
          font-weight:700;
          line-height:1.4;
          margin:0;
        }

        .newsletter-link{
          text-decoration:none;
        }
      `}</style>

      <section id="blog" className="blog_area section-padding">
        <div className="container">
          <div className="row">

            {newsletters.map((item, index) => (
				<div className="col-lg-6 col-md-6 col-sm-12" key={item.id}>
				  <Link
					to={`/newsletter/${item.id}`}
					className="newsletter-link"
				  >
					<div className="newsletter-card">

					  <img
						src={item.thumbnail}
						alt={item.topic}
						className="newsletter-img"
					  />

					  <div className="newsletter-overlay">

						<div className="newsletter-date">
						  <i className="fa fa-calendar"></i>{" "}
						  {new Date(item.published_at).toLocaleDateString(
							"en-US",
							{
							  month: "short",
							  day: "numeric",
							  year: "numeric",
							}
						  )}
						</div>

						<h3 className="newsletter-title">
						  {item.topic}
						</h3>

					  </div>

					</div>
				  </Link>
				</div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
}

export default Newsletters;