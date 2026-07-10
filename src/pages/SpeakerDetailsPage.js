import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import axios from "axios";
import { API_URL, WEBSITE } from "../config";

function SpeakerDetailsPage() {

  const { id } = useParams();

  const [speaker, setSpeaker] = useState(null);

  useEffect(() => {

    axios
      .get(`${API_URL}/speaker?Website=${WEBSITE}`)
      .then((res) => {

        const speakerData = res.data.find(
          (item) => item.id === id
        );

        setSpeaker(speakerData);

      })
      .catch((err) => {
        console.log(err);
      });

  }, [id]);

  if (!speaker) {
    return (
      <div className="text-center p-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <>
	<style>{`
	.author_part.sp-details {
    margin-bottom: 0px !important;
    margin-top: 0px !important;
}
	
	`}</style>
	<Helmet>
        <title>Expert Webinar Speaker | Profs Training Online  </title>
        <meta
          name="description"
          content="Learn from {speaker.name}, an expert speaker at Profs Training, delivering practical webinars for professionals across industry, compliance, and workplace topics. "
        />
     </Helmet>
	 
      <section className="section-top">
        <div className="container">
          <div className="col-lg-10 offset-lg-1 text-center">
            <div className="section-top-title">
              <h1>{speaker.name}</h1>
              <ul>
                <li><a href="/">Home</a></li>
                <li> / Speakers</li>
                <li> / {speaker.name}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-page section-padding">
        <div className="container">
          <div className="row">

            <div className="col-lg-12">

              <div className="author_part sp-details">

                <div className="single_author">

                  <img
                    src={speaker.photo}
                    alt={speaker.name}
                    style={{
                      maxWidth: "133px",
                      width: "100%",
                      borderRadius: "10px"
                    }}
                  />

                  <h4>{speaker.name}</h4>
				  <p>
                    <strong>Industry:</strong> {speaker.industry}
                  </p>

					  {/*<p>
                    <strong>Industry:</strong> {speaker.industry}
                  </p>

                  <p>
                    <strong>Email:</strong> {speaker.email}
                  </p>

                  <p>
                    <strong>Contact:</strong> {speaker.contact}
					  </p>*/}

                  <div
                    dangerouslySetInnerHTML={{
                      __html: speaker.bio
                    }}
                  />

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default SpeakerDetailsPage;
