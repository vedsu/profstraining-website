import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
	
	const [cartCount, setCartCount] = useState(0);
	
	const navigate = useNavigate();

	const userInfo = JSON.parse(
	  sessionStorage.getItem("USERINFO") || "null"
	);

	const logout = () => {
	  sessionStorage.removeItem("USERINFO");
	  navigate("/");
	  window.location.reload();
	};


	
	useEffect(() => {

  const timer = setTimeout(() => {

    if (window.$ && window.$.fn.simpleMobileMenu) {
      window.$(".mobile_menu").simpleMobileMenu();
    }

  }, 500);

const updateCartCount = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
};

  updateCartCount();
  window.addEventListener("cartUpdated", updateCartCount);

  
 return () => {

    clearTimeout(timer);

    window.removeEventListener(
        "cartUpdated",
        updateCartCount
    );

};

}, []);
	
  return (
    <>
	<style>{`
.cart-icon-wrap{
  position:relative;
  display:inline-block;
}

.cart-badge{
  position:absolute;
  top:-8px;
  right:-10px;
  background:red;
  color:#fff;
  width:20px;
  height:20px;
  border-radius:50%;
  font-size:12px;
  font-weight:700;
  display:flex;
  align-items:center;
  justify-content:center;
}
`}</style>
	{/* 
      <div className="preloaders">
        <span className="loader"></span>
      </div>
 */}
      <div
        id="navigation"
        className="navbar-light bg-faded site-navigation navigation2"
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-20 align-self-center">
              <div className="site-logo">
                <a href="/">
                  <img
                    src="https://profstraining.com/img/New%20Pharma%20Profs%20(1).png"
                    alt="Logo"
                  />
                </a>
              </div>
            </div>

            <div className="col-60 d-flex menu-60">
              <nav id="main-menu">
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About</a></li>

                  <li className="menu-item-has-children">
                    <a href="#">Browse Courses</a>
                    <ul>
                      <li><a href="/webinars">All</a></li>
                      <li><a href="/live-webinars">Live Webinars</a></li>
                      <li><a href="/on-demand-webinars">On Demand Webinars</a></li>
					   <li><a href="/newsletters">Newsletters</a></li>
                    </ul>
                  </li>

                  <li><a href="/speakers">Speakers</a></li>
                  <li><a href="/faq">Faq</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </nav>
            </div>

			<div className="col-20 d-none d-xl-block text-end align-self-center menu-lr">

			  {!userInfo ? (
				<>
				  <a
					href="/login-register"
					className="header-btn me-3 cart-space"
				  >
					<i className="fa fa-user"></i>
				  </a>

				  <a
					href="/cart"
					className="header-btn me-3 cart-space cart-icon-wrap"
				  >
					<i className="fa fa-shopping-cart"></i>

					{cartCount > 0 && (
					  <span className="cart-badge">
						{cartCount}
					  </span>
					)}
				  </a>

				  <a
					href="/request-callback"
					className="btn_one nest-hub-max"
				  >
					Request Callback
				  </a>
				</>
			  ) : (
				<>
				
				 <a
					href="/cart"
					className="header-btn me-3 cart-space cart-icon-wrap"
				  >
					<i className="fa fa-shopping-cart"></i>

					{cartCount > 0 && (
					  <span className="cart-badge">
						{cartCount}
					  </span>
					)}
				  </a>
				  <Link
					to="/dashboard"
					className="header-btn me-2"
				  >
					Dashboard
				  </Link>

				 
				  <button
					className="header-btn me-2"
					onClick={logout}
					style={{
					  border: "none",
					  background: "#e9f3ef",
					  cursor: "pointer",
					}}
				  >
					Logout
				  </button>
				</>
			  )}

			</div>
            <ul className="mobile_menu">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>

              <li className="menu-item-has-children">
                <a href="#">Browse Courses</a>
                <ul>
                  <li><a href="/webinars">All</a></li>
                  <li><a href="/live-webinars">Live Webinars</a></li>
                  <li><a href="/on-demand-webinars">On Demand Webinars</a></li>
                </ul>
              </li>

              <li><a href="/speakers">Speakers</a></li>
              <li><a href="/faq">Faq</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;