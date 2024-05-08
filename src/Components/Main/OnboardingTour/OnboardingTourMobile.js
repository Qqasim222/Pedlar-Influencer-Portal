import { useState } from "react";
import { TourProvider } from "@reactour/tour";
import { ModalProvider } from "modaaals";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import AddBanner from "../../Main/AddBanner/AddBanner";
import * as Colors from "../../../assets/styles/Colors";
import { Heading3B, Heading4B } from "../../../assets/styles/Labels";
const strings = require("../../../localisation_en.json");
function OnboardingTour() {
  const [isShowingMore, setShowingMore] = useState(false);
  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);

  return (
    <>
      <TourProvider
        steps={tourConfigMobile}
        afterOpen={disableBody}
        beforeClose={enableBody}
        styles={{
          mask: (base) => ({ ...base, height: "60px" }),
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
            boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
            filter: "drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.15))",
          }),
        }}
        scrollSmooth
      >
        <ModalProvider
          modals={modals}
          styles={{
            contentInner: (base) => ({ ...base, margin: 50 }),
          }}
          className="modaaals-modal"
          skipMotion
        >
          <AddBanner
            toggleShowMore={() => setShowingMore(!isShowingMore)}
            isShowingMore={isShowingMore}
          />
        </ModalProvider>
      </TourProvider>
    </>
  );
}

const modals = {
  test: TestModal,
};

function TestModal() {
  return <p>fdds</p>;
}

const tourConfigMobile = [
  {
    selector: '[data-tut="reactour__ftab_mobile"]',
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
    position: [16, 94],
    roundedStep: true,
  },
  {
    selector: '[data-tut="reactour__ffthtab_mobile"]',
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
    position: [20, 380],
    roundedStep: true,
  },
  {
    selector: '[data-tut="reactour__stab_mobile"]',
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
    position: [16, 10],
  },

  {
    selector: '[data-tut="reactour__ttab_mobile"]',
    content: function DemoHelperComponent() {
      return (
        <div>
          <Heading3B
            text={strings.findMoreOptionsInTheMenu}
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
];

export default OnboardingTour;
