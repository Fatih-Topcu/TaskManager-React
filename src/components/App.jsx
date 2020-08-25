import React from "react";
import Aside from "./Aside.jsx";
import Main from "./Main.jsx";
import Header from "./Header.jsx";
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

      let nextStateTasks = this.state.tasks;

      nextStateTasks.map((el, index) => {
        el.show = true;
      });
      this.setState({tasks : nextStateTasks});
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
    const { display, tasks } = this.state;

    this.changeSelectedButton();

    if (display === "all") {
      for (let a = 0; a < tasks.length; a++) {
        filtered[a] = true;
      }
    } else if (display === "active") {
      for (let a = 0; a < tasks.length; a++) {
        if (!tasks[a].done) {
          filtered[a] = true;
        }
      }
    } else if (display === "done") {
      for (let a = 0; a < tasks.length; a++) {
        if (tasks[a].done) {
          filtered[a] = true;
        }
      }
    }

    this.changeTaskShow(filtered);
  };

  removeTask = (id) => {
    const { tasks } = this.state;
    const newList = tasks.filter((task) => task.id !== id);
    this.setState({ tasks: newList }, () => {
      this.updateFirebase();
    });
  };

  removeDoneTasks = () => {
    const { tasks } = this.state;
    const newList = tasks.filter((task) => task.done !== true);
    this.setState({ tasks: newList }, () => {
      this.updateFirebase();
    });
  };

  changeTaskStatus = (id) => {
    const { tasks } = this.state;
    let changed = tasks.filter((task) => task.id === id)[0];
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
    let { lastId } = this.state;
    const { display } = this.state;
    lastId++;
    this.setState({ lastId: lastId });
    const disp = display === "done" ? false : true;
    const newTask = {
      id: lastId,
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
    const { user, tasks, lastId } = this.state;
    if (user === null) {
      const json = JSON.stringify(tasks);
      const idJson = JSON.stringify(lastId);
      localStorage.setItem("tasks", json);
      localStorage.setItem("lastid", idJson);
    } else if (user.id !== null) {
      let toUpdate = {
        tasks: tasks,
        lastId: lastId,
      };

      toUpdate = JSON.parse(JSON.stringify(toUpdate));
      firebase.database().ref(`users/${user.id}/state/`).set(toUpdate);
    }
  };

  render() {
    const { user, tasks } = this.state;
    return (
      <div className="wrapper">
        <Aside stateUser={user} activeTaskCount={this.findActiveTaskCount()} />
        <Header
          changeToShow={this.changeToShow}
          activeTaskCount={this.findActiveTaskCount()}
        />
        <Main
          ref={(main) => (this.main = main)}
          tasks={tasks}
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
