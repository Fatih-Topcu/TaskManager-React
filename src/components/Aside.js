import React from "react";
import ReactDOM from "react-dom";
import "../style/style.css";

class Aside extends React.Component {
  render() {
    return (
      <div id="aside">
        <i className="grey huge user circle icon" />

        <a href="#">
          <i className="large bars icon current">
            <div className="active-circle">{this.props.activeTaskCount}</div>
          </i>
          <p>Görevler</p>
        </a>

        <a href="#">
          <i className="large cog icon"></i>
          <p>Ayarlar</p>
        </a>

        <a href="#">
          <i className="large power off icon"></i>
          <p>Kapat</p>
        </a>
      </div>
    );
  }
}

export default Aside;
