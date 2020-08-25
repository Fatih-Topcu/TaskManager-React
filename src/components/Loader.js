import React from "react";
import { withTranslation } from "react-i18next";

const Loader = ({ t }) => {
  return (
    <div id="loader-div" className="ui segment">
      <div className="ui active indeterminate huge inline text loader">
        {t("loading-text")}
      </div>
    </div>
  );
};

export default withTranslation()(Loader);
