import React from "react";
import ReactDOM from "react-dom";
import "../style/style.css";
import { withTranslation } from "react-i18next";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: new Date().toLocaleString(),
    };

    const { t } = this.props;
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString(),
      });
    }, 1000);
  }

  renderHeaderUp = () => {
    const { t } = this.props;
    return (
      <div className="header-upper">
        <i
          id="refresh-page-header"
          onClick={() => {
            window.location.reload();
            localStorage.clear();
            return false;
          }}
          className="circular redo icon"
        ></i>
        <p>{t("taskmanagementpanel-text")}</p>
        <div id="date-time-p">{this.state.curTime}</div>
      </div>
    );
  };

  renderHeaderTabButtons = () => {
    const { t } = this.props;
    return (
      <div className="header-buttons">
        <button
          id="all-btn"
          onClick={this.props.changeToShow}
          className="header-btn selected"
        >
          <i className="large sign out alternate icon"></i>
          <p>{t("alltasks-text")}</p>
        </button>
        <button
          id="active-btn"
          onClick={this.props.changeToShow}
          className="header-btn"
        >
          <div className="active-circle">{this.props.activeTaskCount}</div>
          <i className="large clock outline icon"></i>
          <p>{t("activetasks-text")}</p>
        </button>
        <button
          id="done-btn"
          onClick={this.props.changeToShow}
          className="header-btn"
        >
          <i className="large check circle outline icon"></i>
          <p>{t("donetasks-text")}</p>
        </button>
      </div>
    );
  };

  render() {
    return (
      <div id="header">
        {this.renderHeaderUp()}
        {this.renderHeaderTabButtons()}
      </div>
    );
  }
}

export default withTranslation()(Header);
