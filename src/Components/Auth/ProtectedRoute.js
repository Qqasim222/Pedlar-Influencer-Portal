import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CentralLoader from "../../GlobalModule/CentralLoader";
import * as gtmEvents from "../../utils/gtm";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [user, loading] = useAuthState(auth);

  if (loading) return <CentralLoader />;
  if (user) {
    const emailRoute = `/sent-link/${user.email}`;
    if (!user.emailVerified && location.pathname !== emailRoute) {
      return <Navigate to={emailRoute} />;
    } else if (user.emailVerified && location.pathname === emailRoute) {
      return <Navigate to="/" />;
    } else {
      gtmEvents.userIsLOggedIn(user.email);
      return children;
    }
  } else {
    return <Navigate to="/" />;
  }
};
