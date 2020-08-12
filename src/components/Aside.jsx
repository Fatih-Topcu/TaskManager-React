import React from "react";
import ReactDOM from "react-dom";
import "../style/style.css";
import SettingsPopup from "./SettingsPopup";

class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
      <div id="aside">
        <div className="user-image">
          <i className="grey huge user circle icon" />
        </div>

        <a href="#" id="tasks-button">
          <i className="big bars icon current">
            <div className="active-circle">{this.props.activeTaskCount}</div>
          </i>
          <p>Görevler</p>
        </a>

        <a href="#" onClick={this.togglePopup.bind(this)}>
          <i className="big cog icon"></i>
          <p>Ayarlar</p>
        </a>

        <a
          href="#"
          onClick={() => {
            window.open("about:blank", "_self");
            window.close();
          }}
        >
          <i className="big power off icon"></i>
          <p>Kapat</p>
        </a>

        {this.state.showPopup ? (
          <SettingsPopup
            onAddNewTask={this.props.onAddNewTask}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

export default Aside;
