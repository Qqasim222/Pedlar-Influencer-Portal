import { POPUP_TYPE } from "../Helpers/Enums";
import "./AllPopups.scss";
import AddProductPopup from "./Childs/AddProductPopup/AddProductPopup";
import ProductDetailPopup from "./Childs/ProductDetailPopup/ProductDetailPopup";
import RemoveProductPopup from "./Childs/RemoveProductPopup/RemoveProductPopup";
import SocialLinksPopup from "./Childs/SocialLinksPopup/SocialLinksPopup";
import DescriptionPopup from "./Childs/DescriptionPopup/DescriptionPopup";
import ChooseBannerPopup from "./Childs/ChooseBannerPopup/ChooseBannerPopup";
import TourStartPopup from "./Childs/TourStartPopup/TourStartPopup";
import RemoveViewCancelPopup from "./Childs/RemoveViewCancelPopup/RemoveViewCancelPopup";
import GetAccessPopup from "./Childs/GetAccessPopup/GetAccessPopup";
import ShareYourStore from "./Childs/ShareYourStore/ShareYourStore";
import YesNoAlert from "./Childs/YesNoAlert/YesNoAlert";
function AllPopups(props) {
  function renderPopupStyle() {
    // eslint-disable-next-line default-case
    switch (props.style) {
      case POPUP_TYPE.ADD_PRODUCT_POPUP:
        return (
          <AddProductPopup
            closePopup={() => props.closePopup()}
            popupIsOpen={props.popupOpen}
            sucessPopup={(obj) => props.sucessPopup(obj)}
            sucessOpenDetailPopup={(obj) => props.sucessOpenDetailPopup(obj)}
          />
        );
      case POPUP_TYPE.PRODUCT_DETAIL_POPUP:
        return (
          <ProductDetailPopup
            closePopup={() => props.closePopup()}
            popupIsOpen={props.popupOpen}
            itemData={props.itemData}
          />
        );
      case POPUP_TYPE.REMOVE_PRODUCT_POPUP:
        return (
          <RemoveProductPopup
            closePopup={() => props.closePopup()}
            popupIsOpen={props.popupOpen}
          />
        );
      case POPUP_TYPE.SOCIAL_LINKS_POPUP:
        return (
          <SocialLinksPopup
            closePopup={() => props.closePopup()}
            popupIsOpen={props.popupOpen}
            sendingData={props.sendingData}
            popupData={props.popupData}
          />
        );
      case POPUP_TYPE.DISCRIPTION_POPUP:
        return (
          <DescriptionPopup
            closePopup={() => props.closePopup()}
            popupIsOpen={props.popupOpen}
            sendingData={props.sendingData}
            popupData={props.popupData}
          />
        );
      case POPUP_TYPE.CHOOSE_BANNER_POPUP:
        return (
          <ChooseBannerPopup
            closePopup={() => props.closePopup()}
            popupIsOpen={props.popupOpen}
            popupData={props.popupData}
          />
        );
      case POPUP_TYPE.TOUR_START_POPUP:
        return (
          <TourStartPopup
            closePopup={() => props.closePopup()}
            popupIsOpen={props.popupOpen}
          />
        );
      case POPUP_TYPE.REMOVE_VIEW_CANCEL_POPUP:
        return (
          <RemoveViewCancelPopup
            closePopup={() => props.closePopup()}
            popupIsOpen={props.popupOpen}
          />
        );
      case POPUP_TYPE.GET_ACCESS_POPUP:
        return (
          <GetAccessPopup
            closePopup={() => props.closePopup()}
            popupIsOpen={props.popupOpen}
          />
        );
      case POPUP_TYPE.SHARE_YOUR_STORE_POPUP:
        return (
          <ShareYourStore
            closePopup={() => props.closePopup()}
            popupIsOpen={props.popupOpen}
            popupData={props.popupData}
          />
        );
      case POPUP_TYPE.YES_NO_ALERT_POPUP:
        return (
          <YesNoAlert
            closePopup={() => props.closePopup()}
            popupIsOpen={props.popupOpen}
          />
        );
    }
  }

  return (
    <>
      {props.popupIsOpen ? (
        <div className="popup-holder">
          <div className="ph-backdrop-box">{renderPopupStyle()}</div>
        </div>
      ) : null}
    </>
  );
}

export default AllPopups;
