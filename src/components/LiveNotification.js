import React, { useEffect, useState } from "react";

const notifications = [
  {
    city: "Dallas",
    state: "TX",
    category: "Healthcare",
    type: "Live Webinar",
  },
  {
    city: "Chicago",
    state: "IL",
    category: "Pharmaceutical",
    type: "On-Demand Webinar",
  },
  {
    city: "Miami",
    state: "FL",
    category: "Human Resources",
    type: "Live Webinar",
  },
  {
    city: "Houston",
    state: "TX",
    category: "Banking, Insurance & Finance",
    type: "On-Demand Webinar",
  },
  {
    city: "San Diego",
    state: "CA",
    category: "Information & Technologies",
    type: "Live Webinar",
  },
  {
    city: "Phoenix",
    state: "AZ",
    category: "Healthcare",
    type: "On-Demand Webinar",
  },
];

function LiveNotification() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [minutesAgo, setMinutesAgo] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval;

    const showNotification = () => {
      setCurrentIndex((prev) =>
        prev === notifications.length - 1 ? 0 : prev + 1
      );

      setMinutesAgo(Math.floor(Math.random() * 15) + 1);

      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    const firstTimer = setTimeout(() => {
      showNotification();

      interval = setInterval(() => {
        showNotification();
      }, 15000);
    }, 15000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  const item = notifications[currentIndex];

  return (
    <>
      <style>{`
        .live-notification {
          position: fixed;
          left: 20px;
          bottom: 20px;
          width: 270px;
          background: #252525;
          color: #fff;
          border-radius: 16px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 15px;
          z-index: 999999;
          box-shadow: 0 10px 30px rgba(0,0,0,.35);
          transition: all .5s ease;
        }

        .show-popup{
          opacity:1;
          visibility:visible;
          transform:translateY(0);
        }

        .hide-popup{
          opacity:0;
          visibility:hidden;
          transform:translateY(30px);
        }
		
		
		
        .notification-avatar{
          width:29px;
          height:25px;
          min-width:35px;
          border-radius:50%;
          background:linear-gradient(
            135deg,
            #7b2ff7,
            #4c00ff
          );
		  
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:700;
          font-size:18px;
          color:#fff;
        }

        .notification-content strong{
          display:block;
          color:#fff;
          font-size:11px;
          line-height:1.4;
          margin-bottom:4px;
		  
        }

        .notification-content p{
          margin:0;
          color:#fff;
          font-size:11px;
          line-height:1.5;
        }

        .notification-content small{
          display:block;
          margin-top:8px;
          color:#bdbdbd;
          font-size:13px;
        }

        @media(max-width:767px){

          .live-notification{
            width:300px;
            left:10px;
            bottom:10px;
          }

          .notification-content strong{
            font-size:15px;
          }

          .notification-content p{
            font-size:14px;
          }

        }
      `}</style>

      <div
        className={`live-notification ${
          visible ? "show-popup" : "hide-popup"
        }`}
      >
        <div className="notification-avatar">
          {item.category
            .split(" ")
            .map((word) => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()}
        </div>

        <div className="notification-content">
          <strong>
            A Professional from {item.city}, {item.state}
          </strong>

          <p>
            just registered for a {item.category}{" "}
            {item.type}
          </p>

          <small>{minutesAgo} mins ago</small>
        </div>
      </div>
    </>
  );
}

export default LiveNotification;