import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import services from "../../services/index";
import { useState } from "react";
import CentralLoader from "../../GlobalModule/CentralLoader";

export const UnProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [isLoading, setLoading] = useState(false);

  if (loading || isLoading) return <CentralLoader />;
  if (user) {
    setLoading(true);
    const getProductCount = async () => {
      const token = await user.getIdToken();
      const userDetails = await services.auth.GET_LOGIN_STATE(token, user.uid);

      if (userDetails.data.data.isFirstLogin === true) {
        let productCount = await services.product.GET_COUNT(token);
        if (productCount.data.data.productsCount < 3) {
          navigate("/add-product");
        } else {
          navigate("/onboarding-tour");
        }
      } else {
        navigate("/storefront");
      }
      setLoading(false);
    };
    getProductCount();
  } else return children;
};
