import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
const userInfo = sessionStorage.getItem("USERINFO");
const guestCheckout = sessionStorage.getItem("GUEST_CHECKOUT");

if (!userInfo && !guestCheckout) {
    return <Navigate to="/login-register" replace />;
}

  return children;
}

export default AuthGuard;
