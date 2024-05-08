import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { isMobile } from "react-device-detect";
import { TourProvider } from "@reactour/tour";
import { ModalProvider } from "modaaals";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import OnboardingTourReview from "../../Main/OnboardingTourReview/OnboardingTourReview";
import * as Colors from "../../../assets/styles/Colors";
import { Heading3B, Heading4B } from "../../../assets/styles/Labels";
import services from "../../../services/index";
const strings = require("../../../localisation_en.json");

const OnboardingTour = () => {
  const navigate = useNavigate();
  const [isShowingMore, setShowingMore] = useState(false);
  const [user] = useAuthState(auth);
  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);

  const [customeState, setCustomeState] = useState(0);

  // useEffect(() => {
  //   console.log(customeState);
  //   if(customeState < 0){}
  // }, [customeState]);

  useEffect(() => {
    //if (isMobile) navigate("/product-list");

    const updateLoginState = async () => {
      const token = await user.getIdToken();
      services.auth.UPDATE_LOGIN_STATE(token);
    };
    updateLoginState();

    //console.log("isMobile", isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isMobile ? (
    <>
      <TourProvider
        steps={tourConfigMobile}
        afterOpen={disableBody}
        beforeClose={enableBody}
        styles={{
          badge: (base) => ({
            ...base,
            background: "#1C1B1F",
            color: "#F9F6F2",
          }),
          dot: (base, { current }) => ({
            ...base,
            background: current ? "#1C1B1F" : "#F9F6F2",
          }),
          popover: (base) => ({
            ...base,
            maxWidth: "345px",
            padding: "16px",
            background: "#F9F6F2",
            borderRadius: 13,
          }),
          close: (base) => ({
            ...base,
            color: "black",
          }),
          clickArea: (base) => ({
            ...base,
            disabledActions: "false",
          }),
        }}
        onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
          console.log("currentStep", currentStep, steps); //setCustomeState
          setCustomeState(currentStep);
          // if (currentStep === 4) {
          //   setCustomeState
          // }
          // if (currentStep === steps.length - 1) {
          //   setIsOpen(false);
          //   navigate("/product-list");
          // }
        }}
        onClickClose={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
          console.log("close");
          navigate("/storefront");
        }}
        prevButton={({ Button, currentStep, setCurrentStep, steps }) => {
          const first = currentStep === 0;
          return (
            <Button
              kind="prev"
              onClick={() => {
                if (currentStep >= 0) {
                  setCurrentStep(currentStep - 1);
                  setCustomeState(currentStep - 1);
                }
                if (first) {
                  //setCurrentStep((s) => steps.length - 1);
                } else {
                  console.log("customeState not", customeState);
                  //setCurrentStep((s) => s - 1);
                }
              }}
            ></Button>
          );
        }}
        nextButton={({
          Button,
          currentStep,
          stepsLength,
          setIsOpen,
          setCurrentStep,
          steps,
        }) => {
          //const last = currentStep === stepsLength - 1;
          return (
            <Button
              hideArrow={currentStep === 4}
              onClick={() => {
                console.log("Front Click", currentStep);
                if (currentStep <= 3) {
                  setCurrentStep(currentStep + 1);
                  setCustomeState(currentStep + 1);
                }
                if (currentStep === 4) {
                  setCustomeState(0);
                  //console.log("go /product-list");

                  navigate("/storefront");
                }
              }}
            ></Button>
          );
        }}
      >
        <ModalProvider
          styles={{
            contentInner: (base) => ({ ...base, margin: 50 }),
          }}
          className="modaaals-modal"
          skipMotion
        >
          <OnboardingTourReview
            toggleShowMore={() => setShowingMore(!isShowingMore)}
            isShowingMore={isShowingMore}
            customeState={customeState}
          />
        </ModalProvider>
      </TourProvider>
    </>
  ) : (
    <>
      <TourProvider
        steps={tourConfig}
        afterOpen={disableBody}
        beforeClose={enableBody}
        styles={{
          badge: (base) => ({
            ...base,
            background: "#1C1B1F",
            color: "#F9F6F2",
          }),
          dot: (base, { current }) => ({
            ...base,
            background: current ? "#1C1B1F" : "#F9F6F2",
          }),
          popover: (base) => ({
            ...base,
            maxWidth: "345px",
            padding: "16px",
            background: "#F9F6F2",
            borderRadius: 13,
          }),
          clickArea: (base) => ({
            ...base,
            disabledActions: "false",
          }),
        }}
        onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
          //console.log("currentStep", currentStep); //setCustomeState
          if (currentStep === steps.length - 1) {
            setIsOpen(false);
            navigate("/storefront");
          }
        }}
        onClickClose={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
          console.log("close");
          navigate("/storefront");
        }}
      >
        <ModalProvider
          styles={{
            contentInner: (base) => ({ ...base, margin: 50 }),
          }}
          className="modaaals-modal"
          skipMotion
        >
          <OnboardingTourReview
            toggleShowMore={() => setShowingMore(!isShowingMore)}
            isShowingMore={isShowingMore}
            customeState={customeState}
          />
        </ModalProvider>
      </TourProvider>
    </>
  );
};

const tourConfig = [
  {
    selector: '[data-tut="reactour__ftab"]',
    content: function DemoHelperComponent() {
      return (
        <div>
          <Heading3B
            text={strings.yourStorefront}
            color={Colors.black}
            padding={"0 0 8px 0px"}
            letterSpacing={"-0.02em"}
          />
          <Heading4B
            text={
              strings.welcomeToYourStorefrontEditorWhereYouCanViewAndPersonliseYourStore
            }
            color={Colors.gray45}
            padding={"0 0 0px 0px"}
            letterSpacing={"-0.02em"}
          />
        </div>
      );
    },
    position: [345, 20],
    roundedStep: true,
  },

  {
    selector: '[data-tut="reactour__stab"]',
    content: function DemoHelperComponent() {
      return (
        <div>
          <Heading3B
            text={strings.personalise}
            color={Colors.black}
            padding={"0 0 8px 0px"}
            letterSpacing={"-0.02em"}
          />
          <Heading4B
            text={strings.makeItYoursClickToAddBannersPicturesLinksAndText}
            color={Colors.gray45}
            padding={"0 0 0px 0px"}
            letterSpacing={"-0.02em"}
          />
        </div>
      );
    },
    position: [10, 250],
  },

  {
    selector: '[data-tut="reactour__ttab"]',
    content: function DemoHelperComponent() {
      return (
        <div>
          <Heading3B
            text={strings.addAndManageYourProducts}
            color={Colors.black}
            padding={"0 0 8px 0px"}
            letterSpacing={"-0.02em"}
          />
          <Heading4B
            text={strings.whereTheMagicHappens}
            color={Colors.gray45}
            padding={"0 0 0px 0px"}
            letterSpacing={"-0.02em"}
          />
        </div>
      );
    },
    position: [345, 80],
    roundedStep: true,
  },
  {
    selector: '[data-tut="reactour__frttab"]',
    content: function DemoHelperComponent() {
      return (
        <div>
          <Heading3B
            text={strings.share}
            color={Colors.black}
            padding={"0 0 8px 0px"}
            letterSpacing={"-0.02em"}
          />
          <Heading4B
            text={
              strings.shareYourStoreURLAcrossYourSocialsLinkInBioStoriesVideosAndPictures
            }
            color={Colors.gray45}
            padding={"0 0 0px 0px"}
            letterSpacing={"-0.02em"}
          />
        </div>
      );
    },
    position: [16, 350],
    roundedStep: true,
  },
];

const tourConfigMobile = [
  {
    selector: '[data-tut="reactour__ftab_mobile"]',
    content: function DemoHelperComponent() {
      console.log("stp 1");
      return (
        <div>
          <Heading3B
            text={strings.yourStorefront}
            color={Colors.black}
            padding={"0 0 8px 0px"}
            letterSpacing={"-0.02em"}
          />
          <Heading4B
            text={
              strings.welcomeToYourStorefrontEditorWhereYouCanViewAndPersonliseYourStore
            }
            color={Colors.gray45}
            padding={"0 0 0px 0px"}
            letterSpacing={"-0.02em"}
          />
        </div>
      );
    },
    position: [16, 94],
    roundedStep: true,
  },

  {
    selector: '[data-tut="reactour__stab_mobile"]',
    content: function DemoHelperComponent() {
      console.log("stp 3");
      return (
        <div>
          <Heading3B
            text={strings.personalise}
            color={Colors.black}
            padding={"0 0 8px 0px"}
            letterSpacing={"-0.02em"}
          />
          <Heading4B
            text={
              strings.makeItYoursClickToAddBannersPicturesLinksAndTextForMobile
            }
            color={Colors.gray45}
            padding={"0 0 0px 0px"}
            letterSpacing={"-0.02em"}
          />
        </div>
      );
    },
    position: [16, 10],
  },

  {
    selector: '[data-tut="reactour__ttab_mobile"]',
    content: function DemoHelperComponent() {
      console.log("stp 4");
      return (
        <div>
          <Heading3B
            text={strings.findMoreOptions}
            color={Colors.black}
            padding={"0 0 0px 0px"}
            letterSpacing={"-0.02em"}
          />
          <Heading3B
            text={strings.inTheMenu}
            color={Colors.black}
            padding={"0 0 8px 0px"}
            letterSpacing={"-0.02em"}
          />
          <Heading4B
            text={strings.everythingYouNeedInOnePlaceClickInAndHaveALook}
            color={Colors.gray45}
            padding={"0 0 0px 0px"}
            letterSpacing={"-0.02em"}
          />
        </div>
      );
    },
    position: [10, 76],
    roundedStep: true,
  },
  {
    selector: '[data-tut="reactour__frthtab_mobile"]',
    content: function DemoHelperComponent() {
      console.log("stp 5");
      return (
        <div>
          <Heading3B
            text={strings.addAndManageYourProducts}
            color={Colors.black}
            padding={"0 0 8px 0px"}
            letterSpacing={"-0.02em"}
          />
          <Heading4B
            text={strings.whereTheMagicHappens}
            color={Colors.gray45}
            padding={"0 0 0px 0px"}
            letterSpacing={"-0.02em"}
          />
        </div>
      );
    },
    position: [16, 246],
    roundedStep: true,
  },
  {
    selector: '[data-tut="reactour__ffthtab_mobile"]',
    content: function DemoHelperComponent() {
      console.log("stp 2");
      return (
        <div>
          <Heading3B
            text={strings.share}
            color={Colors.black}
            padding={"0 0 8px 0px"}
            letterSpacing={"-0.02em"}
          />
          <Heading4B
            text={
              strings.shareYourStoreURLAcrossYourSocialsLinkInBioStoriesVideosAndPictures
            }
            color={Colors.gray45}
            padding={"0 0 0px 0px"}
            letterSpacing={"-0.02em"}
          />
        </div>
      );
    },
    position: [20, 380],
    roundedStep: true,
  },
];

export default OnboardingTour;
