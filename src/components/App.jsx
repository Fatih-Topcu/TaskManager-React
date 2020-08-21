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
      name: "",
      image: "",
      id: "",
    },
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: { name: user.displayName, image: user.photoURL, id: user.uid },
        });
      } else {
        this.setState({
          user: {
            name: "",
            image: "",
            id: "",
          },
        });
      }
    });

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
    } else {
      //Example tasks - Örnek görevler
      const tasks = [
        {
          id: 1,
          show: true,
          done: true,
          dateCreated: new Date().toLocaleDateString(),
          dateCompleted: new Date().toLocaleDateString(),
          description:
            "TASK 1 G1-Donec in lacus commodo, viverra enim eget, dignissim nunc. Cras et leo eu augue malesuada volutpat. Nulla egestas enim ex.",
        },
        {
          id: 2,
          show: true,
          done: false,
          dateCreated: new Date().toLocaleDateString(),
          dateCompleted: null,
          description:
            "TASK 2 G2-Mauris tempor scelerisque neque, sed pellentesque lorem consequat eu. Nam tincidunt ex ut dui ultrices pretium. Donec imperdiet id lorem vel pharetra. Curabitur tincidunt scelerisque tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque aliquet dolor aliquet, commodo nulla nec, aliquam est. Mauris faucibus aliquet purus in fringilla. Nunc consequat varius elit ut mollis. Fusce euismod ligula sapien, et ornare diam pellentesque ac. Proin lacinia.",
        },
        {
          id: 3,
          show: true,
          done: false,
          dateCreated: new Date().toLocaleDateString(),
          dateCompleted: null,
          description:
            "TASK 3 G2-Morbi quis neque nec mi porta congue at in arcu. Vestibulum eget placerat sapien. Donec lacinia augue sed scelerisque volutpat. Mauris elementum rhoncus ipsum, ac laoreet tellus ultricies non. Duis..",
        },
        {
          id: 4,
          show: true,
          done: true,
          dateCreated: new Date().toLocaleDateString(),
          dateCompleted: new Date().toLocaleDateString(),
          description:
            "TASK 4 G2-Nam sit amet eleifend sem. Sed id mi tortor. Nulla at ultrices quam, blandit pharetra enim. Nulla tincidunt diam sit amet leo iaculis, sodales condimentum sapien tincidunt. Morbi venenatis fermentum tortor ut euismod. Quisque id sodales ligula, in pharetra nunc. Vivamus et posuere sapien, in porttitor urna. Etiam feugiat nisl ut neque lobortis, sed convallis ipsum sagittis. Quisque facilisis magna auctor ipsum sagittis facilisis. Praesent cursus vehicula dui quis eleifend.Fusce aliquet est non enim porta, nec facilisis quam facilisis. Curabitur bibendum semper arcu, in iaculis enim blandit a. Aliquam sodales ante quam. Phasellus ut condimentum tortor, sed laoreet sapien. Proin non risus congue, accumsan diam non, fermentum orci. Phasellus tempus sagittis elit eu pellentesque. Proin quis tortor metus. Donec.",
        },
      ];

      this.setState({ tasks: tasks, lastId: 4 });
    }
  }

  componentDidUpdate() {
    const json = JSON.stringify(this.state.tasks);
    const idJson = JSON.stringify(this.state.lastId);
    localStorage.setItem("tasks", json);
    localStorage.setItem("lastid", idJson);
  }

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

  changeDisplay = () => {
    let filtered = [];
    if (this.state.display === "all") {
      for (let a = 0; a < this.state.tasks.length; a++) {
        filtered[a] = true;
      }
    } else if (this.state.display === "active") {
      for (let a = 0; a < this.state.tasks.length; a++) {
        if (!this.state.tasks[a].done) {
          filtered[a] = true;
        }
      }
    } else if (this.state.display === "done") {
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
    this.setState({ tasks: newList });
  };

  removeDoneTasks = () => {
    const newList = this.state.tasks.filter((task) => task.done !== true);
    this.setState({ tasks: newList });
  };

  changeTaskStatus = (id) => {
    let changed = this.state.tasks.filter((task) => task.id === id)[0];
    const toChange = { ...changed };
    changed.done = changed.done ? false : true;
    changed.dateCompleted = changed.done
      ? new Date().toLocaleDateString()
      : null;
    this.setState({ toChange: changed });

    this.changeDisplay();
  };

  changeTaskShow = (filtered) => {
    let nextStateTasks = this.state.tasks;
    const toChange = this.state.tasks;

    nextStateTasks.map((el, index) => {
      el.show = filtered[index];
    });

    this.setState({
      toChange: nextStateTasks,
    });
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

    this.setState((prevState) => ({
      display: "all",
      tasks: [...prevState.tasks, newTask],
    }));
  };

  resetSearchBar = () => {
    this.main.resetSearchBar();
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
