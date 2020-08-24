import React from "react";
import ReactDOM from "react-dom";
import Aside from "./Aside.jsx";
import Main from "./Main.jsx";
import Header from "./Header.jsx";
import "../style/style.css";
import axios from "axios";
import firebase from "firebase";

class App extends React.Component {
  state = {
    display: "all",
    tasks: [],
    lastId: 0,
    user: {
      name: null,
      image: null,
      id: null,
    },
  };

  componentDidMount() {
    this.resetHeaderButtons();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState(
          {
            user: {
              name: user.displayName,
              image: user.photoURL,
              id: user.uid,
            },
          },
          () => {
            const db = firebase.database();
            db.ref(`users/${this.state.user.id}/state`).on(
              "value",
              (snapshot) => {
                const newState = snapshot.val();
                this.setState(newState);
              }
            );
          }
        );
      } else if (!user) {
        if (localStorage.getItem("tasks") !== null) {
          const json = localStorage.getItem("tasks");
          const tasks = JSON.parse(json);

          this.setState({ tasks: tasks }, () => {
            let resetted = this.state.tasks;
            for (let a = 0; a < resetted.length; a++) {
              resetted[a].show = true;
            }

            this.setState({ tasks: resetted });
          });

          const idJson = localStorage.getItem("lastid");
          const lastid = JSON.parse(idJson);

          this.setState({ lastId: Number(lastid) });
        }
        this.setState({
          user: null,
        });
      }
    });
  }

  resetHeaderButtons = () => {
    this.setState({ display: "all" }, () => {
      if (document.getElementsByClassName("selected").length > 0) {
        document
          .getElementsByClassName("selected")[0]
          .classList.remove("selected");

        document.getElementById("all-btn").classList.add("selected");
      }
    });
  };

  changeToShow = (e) => {
    this.resetSearchBar();

    document.getElementsByClassName("selected")[0].classList.remove("selected");
    e.currentTarget.classList.add("selected");

    this.setState(
      {
        display: e.currentTarget.id.split("-")[0],
      },
      this.changeDisplay
    );
  };

  findActiveTaskCount = () => {
    let count = 0;

    this.state.tasks.map((el) => {
      if (el.done !== true) {
        count++;
      }
    });

    return count;
  };

  changeSelectedButton() {
    const { display } = this.state;
    if (document.getElementsByClassName("selected").length > 0) {
      document
        .getElementsByClassName("selected")[0]
        .classList.remove("selected");
    }

    if (display !== null) {
      if (display === "all") {
        document.getElementById("all-btn").classList.add("selected");
      } else if (display === "active") {
        document.getElementById("active-btn").classList.add("selected");
      } else if (display === "done") {
        document.getElementById("done-btn").classList.add("selected");
      }
    }
  }

  changeDisplay = () => {
    let filtered = [];
    const { display } = this.state;

    this.changeSelectedButton();

    if (display === "all") {
      for (let a = 0; a < this.state.tasks.length; a++) {
        filtered[a] = true;
      }
    } else if (display === "active") {
      for (let a = 0; a < this.state.tasks.length; a++) {
        if (!this.state.tasks[a].done) {
          filtered[a] = true;
        }
      }
    } else if (display === "done") {
      for (let a = 0; a < this.state.tasks.length; a++) {
        if (this.state.tasks[a].done) {
          filtered[a] = true;
        }
      }
    }

    this.changeTaskShow(filtered);
  };

  removeTask = (id) => {
    const newList = this.state.tasks.filter((task) => task.id !== id);
    this.setState({ tasks: newList }, () => {
      this.updateFirebase();
    });
  };

  removeDoneTasks = () => {
    const newList = this.state.tasks.filter((task) => task.done !== true);
    this.setState({ tasks: newList }, () => {
      this.updateFirebase();
    });
  };

  changeTaskStatus = (id) => {
    let changed = this.state.tasks.filter((task) => task.id === id)[0];
    changed.done = changed.done ? false : true;
    changed.dateCompleted = changed.done
      ? new Date().toLocaleDateString()
      : null;

    this.setState(
      {
        tasks: {
          changed,
        },
      },
      () => {
        this.updateFirebase();
      }
    );

    this.changeDisplay();
  };

  changeTaskShow = (filtered, searchbarActivity = false) => {
    let nextStateTasks = this.state.tasks;

    nextStateTasks.map((el, index) => {
      el.show = filtered[index];
    });

    if (searchbarActivity) {
      this.setState(
        {
          tasks: nextStateTasks,
        },
        this.setState({ display: "all" })
      );
      this.changeSelectedButton();
    } else {
      this.setState({
        tasks: nextStateTasks,
      });
    }
  };

  addTask = (description) => {
    let newID = this.state.lastId;
    newID++;
    this.setState({ lastId: newID });
    const disp = this.state.display === "done" ? false : true;
    const newTask = {
      id: newID,
      show: disp,
      done: false,
      dateCreated: new Date().toLocaleDateString(),
      dateCompleted: null,
      description: description,
    };

    this.setState(
      (prevState) => ({
        tasks: [...prevState.tasks, newTask],
      }),
      () => this.updateFirebase()
    );
  };

  resetSearchBar = () => {
    this.main.resetSearchBar();
  };

  updateFirebase = () => {
    if (this.state.user === null) {
      const json = JSON.stringify(this.state.tasks);
      const idJson = JSON.stringify(this.state.lastId);
      localStorage.setItem("tasks", json);
      localStorage.setItem("lastid", idJson);
    } else if (this.state.user.id !== null) {
      let toUpdate = {
        tasks: this.state.tasks,
        lastId: this.state.lastId,
      };
     
      toUpdate = JSON.parse(JSON.stringify(toUpdate));
      firebase
        .database()
        .ref(`users/${this.state.user.id}/state/`)
        .set(toUpdate);
    }
  };

  render() {
 
    return (
      <div className="wrapper">
        <Aside
          stateUser={this.state.user}
          activeTaskCount={this.findActiveTaskCount()}
        />
        <Header
          changeToShow={this.changeToShow}
          activeTaskCount={this.findActiveTaskCount()}
        />
        <Main
          ref={(main) => (this.main = main)}
          tasks={this.state.tasks}
          onRemoveTask={this.removeTask}
          onRemoveDoneTasks={this.removeDoneTasks}
          onChangeTaskStatus={this.changeTaskStatus}
          onAddNewTask={this.addTask}
          onChangeTaskShow={this.changeTaskShow}
          onSelectAllBtn={this.selectAllBtn}
        />
      </div>
    );
  }
}
export default App;
