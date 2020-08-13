import React from "react";
import tr from "../img/flags/turkey.png";
import en from "../img/flags/uk.png";
import de from "../img/flags/german.png";
import i18n from '../i18n';
import { withTranslation } from "react-i18next";


class SettingsPopup extends React.Component {

  changeLanguage = (e) => {
    const newlang = (e.currentTarget.id).split("-")[0];
    console.log(newlang);
    i18n.changeLanguage(newlang);

    // Improvement can be made: Close popup after selecting new language.
    
  };

  render() {
    const {t} = this.props;
    return (
      <div className="popup">
        <div className="popup_inner">
          <div id="language-text">{t("language-text")}</div>
          <div id="language-flags">
            <div onClick={this.changeLanguage} className="flag" id="tr-flag">
              <img src={tr} width="80" height="60" />
              <p>Türkçe</p>
            </div>
            <div onClick={this.changeLanguage} className="flag" id="en-flag">
              <img src={en} width="80" height="60" />
              <p>English</p>
            </div>
            <div onClick={this.changeLanguage} className="flag" id="de-flag">
              <img src={de} width="80" height="60" />
              <p>Deutsch</p>
            </div>
          </div>

          <button id="close-popup-btn" onClick={this.props.closePopup}>
            <i className="large circular window close icon"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default (withTranslation()(SettingsPopup));
