import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.scss";
import "./assets/styles/material.scss";
import Login from "./Components/Auth/Login/Login";
import SignUp from "./Components/Auth/SignUp/SignUp";
import CreateStore from "./Components/Auth/CreateStore/CreateStore";
import SentLink from "./Components/Auth/SentLink/SentLink";
import Emailverified from "./Components/Auth/Emailverified/Emailverified";
import AddProduct from "./Components/Main/AddProduct/AddProduct";
import AddProductListing from "./Components/Main/AddProduct/AddProductListing/AddProductListing";
import AddProductDetail from "./Components/Main/AddProduct/AddProdutDetail/AddProductDetail";
import AddProductFilter from "./Components/Main/AddProduct/AddProductFilter/AddProductFilter";
import AddProductCategory from "./Components/Main/AddProduct/AddProductCategory/AddProductCategory";
import AddProductBrand from "./Components/Main/AddProduct/AddProductBrand/AddProductBrand";
import AddProductSearch from "./Components/Main/AddProduct/AddProductSearch/AddProductSearch";
import ProductList from "./Components/Main/ProductList/ProductList";
import AddBanner from "./Components/Main/AddBanner/AddBanner";
import LandingPage from "./Components/Main/LandingPage/LandingPage";
import OnboardingTour from "./Components/Main/OnboardingTour/OnboardingTour";
import OnboardingTourMobile from "./Components/Main/OnboardingTour/OnboardingTourMobile";
import ForgotPassword from "./Components/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword/ResetPassword";
import CheckEmail from "./Components/Auth/CheckEmail/CheckEmail";

import OnboardingTourReview from "./Components/Main/OnboardingTourReview/OnboardingTourReview";

import TermsConditions from "./Components/Common/TermsConditions/TermsConditions";
import PrivacyPolicy from "./Components/Common/PrivacyPolicy/PrivacyPolicy";

import { ProtectedRoute } from "./Components/Auth/ProtectedRoute";
import { UnProtectedRoute } from "./Components/Auth/UnProtectedRoute";
import SmoothScrollToTop from "./Components/SmoothScrollToTop";

const Routing = () => {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Inter",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SmoothScrollToTop />
        <Routes>
          {/* UnProtected Routes */}
          <Route
            path="/"
            element={
              <UnProtectedRoute>
                <Login props />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <UnProtectedRoute>
                <SignUp props />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/create-store"
            element={
              <UnProtectedRoute>
                <CreateStore />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <UnProtectedRoute>
                <ForgotPassword />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/check-email"
            element={
              <UnProtectedRoute>
                <CheckEmail />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <UnProtectedRoute>
                <ResetPassword />
              </UnProtectedRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/onboarding-tour"
            element={
              <ProtectedRoute>
                <OnboardingTour />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding-tour-mobile"
            element={
              <ProtectedRoute>
                <OnboardingTourMobile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-list"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product-list"
            element={
              <ProtectedRoute>
                <AddProductListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product-detail/:action/:id"
            element={
              <ProtectedRoute>
                <AddProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product-filter"
            element={
              <ProtectedRoute>
                <AddProductFilter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product-category"
            element={
              <ProtectedRoute>
                <AddProductCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product-brand"
            element={
              <ProtectedRoute>
                <AddProductBrand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product-search"
            element={
              <ProtectedRoute>
                <AddProductSearch />
              </ProtectedRoute>
            }
          />

          <Route
            path="/storefront"
            element={
              <ProtectedRoute>
                <AddBanner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sent-link/:email"
            element={
              <ProtectedRoute>
                <SentLink />
              </ProtectedRoute>
            }
          />
          <Route path="/email-verified" element={<Emailverified />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route
            path="/onboarding-tour-mobile"
            element={<OnboardingTourMobile />}
          />
          <Route
            path="/onboarding-tour-review"
            element={<OnboardingTourReview />}
          />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routing;
