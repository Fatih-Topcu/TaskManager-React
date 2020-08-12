import React from "react";
import ReactDOM from "react-dom";
import Aside from "./Aside.jsx";
import Main from "./Main.jsx";
import Header from "./Header.jsx";
import "../style/style.css";

class App extends React.Component {
  state = {
    display: "all",
    tasks: [
      {
        id: 1,
        show: true,
        done: true,
        description:
          "TASK 1 G1- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam.",
      },
      {
        id: 2,
        show: true,
        done: false,
        description:
          "TASK 2 G3- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam.",
      },
      {
        id: 3,
        show: true,
        done: false,
        description:
          "TASK 3 G2- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam.",
      },
      {
        id: 4,
        show: true,
        done: true,
        description:
          "TASK 4 G2- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam.",
      },
      {
        id: 5,
        show: true,
        done: true,
        description:
          "TASK 5 G1- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam.",
      },
      {
        id: 6,
        show: true,
        done: true,
        description:
          "TASK 6 G3- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam.",
      },
      {
        id: 7,
        show: true,
        done: false,
        description:
          "TASK 7 G2- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam.",
      },
      {
        id: 8,
        show: true,
        done: false,
        description:
          "TASK 8 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam.",
      },
      {
        id: 9,
        show: true,
        done: true,
        description:
          "TASK 9 G3- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam.",
      },
      {
        id: 10,
        show: true,
        done: false,
        description:
          "TASK 10 G1- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam.",
      },
      {
        id: 11,
        show: true,
        done: false,
        description:
          "TASK 11 G2- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel diam id felis condimentum aliquam.",
      },
    ],
    lastId: 11,
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

  removeDoneTasks = () =>{
    const newList = this.state.tasks.filter((task) => task.done !== true);
    this.setState({ tasks: newList });
  }

  changeTaskStatus = (id) => {
    let changed = this.state.tasks.filter((task) => task.id === id)[0];
    const toChange = { ...changed };
    changed.done = changed.done ? false : true;
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
        <Aside activeTaskCount={this.findActiveTaskCount()} />
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
        />
      </div>
    );
  }
}

export default App;
