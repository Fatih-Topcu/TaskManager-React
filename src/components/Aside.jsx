import React from "react";
import ReactDOM from "react-dom";
import "../style/style.css";
import SettingsPopup from "./SettingsPopup";
import { withTranslation } from "react-i18next";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase/firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

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
    const { t } = this.props;
    const { stateUser } = this.props;
    const { user, signOut, signInWithGoogle } = this.props;
  
    return (
      <div id="aside">
        <div className="user-image">
          {user ? (
            <img src={stateUser.image} />
          ) : (
            <button
              onClick={signInWithGoogle}
              className="ui google plus button"
            >
              <i className="google icon"></i>
              {t("sign-in")}
            </button>
          )}

          {user ? <p>{stateUser.name}</p> : null}
          {user ? (
            <button className="ui tiny google plus button" onClick={signOut}>
             {t("sign-out")}
            </button>
          ) : null}
        </div>

        <a href="#" id="tasks-button">
          <i className="big bars icon current">
            <div className="active-circle">{this.props.activeTaskCount}</div>
          </i>
          <p>{t("tasks-text")}</p>
        </a>

        <a href="#" onClick={this.togglePopup.bind(this)}>
          <i className="big cog icon"></i>
          <p>{t("settings-text")}</p>
        </a>

        <a
          id="close-app-btn"
          href="#"
          onClick={() => {
            window.open("about:blank", "_self");
            window.close();
          }}
        >
          <i className="big power off icon"></i>
          <p>{t("close-text")}</p>
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

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withTranslation()(
  withFirebaseAuth({
    providers,
    firebaseAppAuth,
  })(Aside)
);
