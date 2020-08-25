import React from "react";
import tr from "../img/flags/turkey.png";
import en from "../img/flags/uk.png";
import de from "../img/flags/german.png";
import i18n from "../i18n";
import { withTranslation } from "react-i18next";

class SettingsPopup extends React.Component {
  changeLanguage = (e) => {
    const newlang = e.currentTarget.id.split("-")[0];
    i18n.changeLanguage(newlang);

    // Improvement can be made: Close popup after selecting new language.
  };

  renderLanguageFlags = () => (
    <div id="language-flags">
      <div onClick={this.changeLanguage} className="flag" id="tr-flag">
        <img src={tr} width="80" height="60" alt="Turkey Flag"/>
        <p>Türkçe</p>
      </div>
      <div onClick={this.changeLanguage} className="flag" id="en-flag">
        <img src={en} width="80" height="60" alt="UK Flag"/>
        <p>English</p>
      </div>
      <div onClick={this.changeLanguage} className="flag" id="de-flag">
        <img src={de} width="80" height="60" alt="Germany Flag" />
        <p>Deutsch</p>
      </div>
    </div>
  );

  render() {
    const { t, closePopup} = this.props;
    return (
      <div className="popup">
        <div className="popup_inner">
          <div id="language-text">{t("language-text")}</div>
          {this.renderLanguageFlags()};
          <button id="close-popup-btn" onClick={closePopup}>
            <i className="large circular window close icon"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default withTranslation()(SettingsPopup);
