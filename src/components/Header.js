import React from "react";
import ReactDOM from "react-dom";
import "../style/style.css";

class Header extends React.Component {
  render() {
    return (
      <div id="header">
        <div className="header-upper">
          <i className="circular redo icon"></i>
          <p>Görev Yönetim Paneli</p>
        </div>
        <div className="header-buttons">
          <button
            id="all-btn"
            onClick={this.props.changeToShow}
            className="header-btn selected"
          >
            <i className="large sign out alternate icon"></i>
            <p>Tüm Görevler</p>
          </button>
          <button
            id="active-btn"
            onClick={this.props.changeToShow}
            className="header-btn"
          >
            <div className="active-circle">{this.props.activeTaskCount}</div>
            <i className="large clock outline icon"></i>
            <p>Aktif Görevler</p>
          </button>
          <button
            id="done-btn"
            onClick={this.props.changeToShow}
            className="header-btn"
          >
            <i className="large check circle outline icon"></i>
            <p>Biten Görevler</p>
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
