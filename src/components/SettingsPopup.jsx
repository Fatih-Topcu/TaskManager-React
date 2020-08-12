import React from "react";

class SettingsPopup extends React.Component {

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          

          <button id="close-popup-btn" onClick={this.props.closePopup}>
            <i className="large circular window close icon"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default SettingsPopup;
