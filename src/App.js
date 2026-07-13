import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";

import AuthGuard from "./components/AuthGuard";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import AllWebinars from "./pages/AllWebinars";
import LiveWebinars from "./pages/live-webinars";
import OndemandsWebinars from "./pages/on-demand-webinars";
import Newsletters from "./pages/Newsletters";
import NewsletterDetails from "./pages/NewsletterDetails";
import Speakers from "./components/Speakers";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import PrivacyPolicy from "./pages/Privacy-Policy";
import TermsCondition from "./pages/Terms-Condition";
import RefundCancellation from "./pages/RefundCancellation";
import SuggestTopic from "./pages/SuggestTopic";
import SpeakerOpportunity from "./pages/SpeakerOpportunity";
import Unsubscribe from "./pages/Unsubscribe";
import Subscribe from "./pages/Subscribe";
import RequestCallback from "./pages/RequestCallback";
import LoginRegister from "./pages/LoginRegister";
import WebinarDetails from "./pages/WebinarDetails";
import Cart from "./pages/Cart";
import OrderReview from "./pages/OrderReview";
import SpeakerDetailsPage from "./pages/SpeakerDetailsPage";
import Testimonials from "./pages/Testimonials";
import OrderForm from "./pages/OrderForm";

import StripeCheckout from "./pages/StripeCheckout";
import PaymentSuccess from "./pages/PaymentSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}



function RequestCallbackPage() {
  return (
    <>
      <Navbar />
      <RequestCallback />
      <Footer />
    </>
  );
}


function AboutPage() {
  return (
    <>
      <Navbar />
      <About />
      <Footer />
    </>
  );
}

function AllWebinarsPage() {
  return (
    <>
      <Navbar />
      <AllWebinars />
      <Footer />
    </>
  );
}

function LiveWebinarsPage() {
  return (
    <>
      <Navbar />
      <LiveWebinars />
      <Footer />
    </>
  );
}


function OndemandsWebinarsPage() {
  return (
    <>
		<Navbar />
		<OndemandsWebinars />
		<Footer />
    </>
  );
}


function NewslettersPage() {
  return (
    <>
		<Navbar />
		<Newsletters />
		<Footer />
    </>
  );
}

function NewsletterDetailsPage() {
  return (
    <>
		<Navbar />
		<NewsletterDetails />
		<Footer />
    </>
  );
}




function SpeakersPage() {
  return (
    <>
      <Navbar />
      <Speakers />
      <Footer />
    </>
  );
}

function FaqPage() {
  return (
    <>
      <Navbar />
      <Faq />
      <Footer />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
}

function PrivacyPolicyPage() {
  return (
    <>
		<Navbar />
		<PrivacyPolicy />
		<Footer />
			</>
		  );
		}
		
		
		
	function TermsPage() {
	  return (
		<>
			<Navbar />
			<TermsCondition />
			<Footer />
			</>
		  );
		}
		
		
			
	function RefundCancellationPage() {
	  return (
		<>
			<Navbar />
			<RefundCancellation />
			<Footer />
			</>
		  );
		}
			
		
		function SuggestTopicPage() {
		  return (
			<>
				<Navbar />
				<SuggestTopic />
				<Footer />
				</>
			  );
			}
		
		function SpeakerOpportunityPage() {
		  return (
			<>
				<Navbar />
				<SpeakerOpportunity />
				<Footer />
				</>
			  );
			}
				
				
			function UnsubscribePage() {
			  return (
				<>
					<Navbar />
					<Unsubscribe />
					<Footer />
					</>
				  );
				}
				
				
				
		function SubscribePage() {
		  return (
			<>
				<Navbar />
				<Subscribe />
				<Footer />
				</>
			  );
			}
			
		function WebinarDetailsPage() {
		  return (
			<>
				<Navbar />
				<WebinarDetails />
				<Footer />
				</>
			  );
			}
			
			
		function CartPage() {
		  return (
			<>
				<Navbar />
				<Cart />
				<Footer />
				</>
			  );
			}
			
			
		function OrderReviewPage() {
		  return (
			<AuthGuard>
				<Navbar />
				<OrderReview />
				<Footer />
			</AuthGuard>
			  );
			}
			
			function SpeakerDetails() {
		  return (
			<>
				<Navbar />
				<SpeakerDetailsPage />
				<Footer />
				</>
			  );
			}
			
			
			
			function TestimonialsPage() {
		  return (
			<>
				<Navbar />
				<Testimonials />
				<Footer />
				</>
			  );
			}
			
			
			function PaymentSuccessPage(){
				 return (
			<AuthGuard>
				<Navbar />
				<PaymentSuccess />
				<Footer />
			</AuthGuard>
			  );

			}

			function StripeCheckoutPage()
			{
				  return (
				<AuthGuard>
				<Navbar />
				<StripeCheckout />
				<Footer />
				</AuthGuard>
			  );
			}
			
			
				
			function LoginRegisterPage() {
		  return (
			<>
				<Navbar />
				<LoginRegister  />
				<Footer />
				</>
			  );
			}
			
			
			function ForgotPasswordPage()
			{
				  return (
			<>
				<Navbar />				
				<ForgotPassword/>
				<Footer />
				</>
			  );
				
				
			}
			function DashboardPage()
			{

				  return (
			<AuthGuard>
				<Navbar />
				<Dashboard  />
				<Footer />
			</AuthGuard>
			  );

			}
			


function MainLayout() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
	   <Route path="/request-callback" element={<RequestCallbackPage />} />
	  <Route path="/About" element={<AboutPage />} />
	  <Route path="/webinars" element={<AllWebinarsPage />} />
	  <Route path="/live-webinars" element={<LiveWebinarsPage />} />
	  <Route path="/on-demand-webinars" element={<OndemandsWebinarsPage />} />
	   <Route path="/newsletters" element={<NewslettersPage />} />
	    <Route path="/newsletter/:id" element={<NewsletterDetailsPage />} />
	  
	 
	  <Route path="/Speakers" element={<SpeakersPage />} />
	  <Route path="/Faq" element={<FaqPage />} />
	  <Route path="/Contact" element={<ContactPage  />} />
	  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
	  <Route path="/terms-condition" element={<TermsPage />} />
	  <Route path="/refund-cancellation" element={<RefundCancellationPage />} />
	  <Route path="/suggest-topic" element={<SuggestTopicPage />} />
	  <Route path="/speaker-opportunity" element={<SpeakerOpportunityPage />} />
	  <Route path="/unsubscribe" element={<UnsubscribePage />} />
	  <Route path="/subscribe" element={<SubscribePage />} />
	  <Route path="/WebinarDetails/:slug" element={<WebinarDetailsPage />} />
	   <Route path="/Cart" element={<CartPage />} />
	   <Route  path="/login-register"  element={<LoginRegisterPage />}/>
	    <Route path="/OrderReview" element={<OrderReviewPage />} />
		<Route path="/testimonials" element={<TestimonialsPage />} />
		<Route path="/speaker-details/:id" element={<SpeakerDetails />} />
		<Route path="/order-form/:slug" element={<OrderForm />}/>
		<Route  path="/forgot-password"  element={<ForgotPasswordPage />}/>
		<Route     path="/stripe-checkout"      element={<StripeCheckoutPage />}/>
		<Route    path="/payment-success"    element={<PaymentSuccessPage />}/>
		<Route
  path="/dashboard"
  element={<DashboardPage />}
/>
		
    </Routes>
  );
}


		function AppContent() {

  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => clearTimeout(timer);

  }, [location.pathname]);

  return (
    <>
      {loading && <Preloader />}
      <MainLayout />
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;
