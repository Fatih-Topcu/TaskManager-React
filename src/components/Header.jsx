import React from "react";
import ReactDOM from "react-dom";
import "../style/style.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: new Date().toLocaleString(),
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString(),
      });
    }, 1000);
  }

  render() {
    const curTime = new Date().toLocaleString();
    return (
      <div id="header">
        <div className="header-upper">
          <i
          id="refresh-page-header"
            onClick={() => {
              window.location.reload();
              return false;
            }}
            className="circular redo icon"
          ></i>
          <p>Görev Yönetim Paneli</p>
          <div id="date-time-p">{this.state.curTime}</div>
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
