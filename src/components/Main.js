import React from "react";
import ReactDOM from "react-dom";
import "../style/style.css";
import TaskList from "./TaskList.js";
import AddTaskPopup from "./AddTaskPopup.js";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
      searchText: "",
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  resetSearchBar = () => {
    this.setState({ searchText: "" }, () => {
      console.log(this.state);
    });
  };

  handleSearchChange = (event) => {
    this.setState({ searchText: event.target.value }, this.updateList);
  };

  updateList = () => {
    const filtered = this.props.tasks.map((task) => {
      return task.description
        .toLowerCase()
        .includes(this.state.searchText.toLowerCase());
    });

    this.props.onChangeTaskShow(filtered);
  };

  render() {
    return (
      <div id="main">
        <div className="search-add">
          <form className="task-search">
            <input
              type="text"
              value={this.state.searchText}
              onChange={this.handleSearchChange}
              placeholder="Arama..."
            ></input>
          </form>
          <button
            onClick={this.togglePopup.bind(this)}
            className="add-task-btn"
          >
            Yeni Görev Ekle +
          </button>
        </div>
        <TaskList
          tasks={this.props.tasks}
          onRemoveTask={this.props.onRemoveTask}
          onChangeTaskStatus={this.props.onChangeTaskStatus}
        />

        {this.state.showPopup ? (
          <AddTaskPopup
            onAddNewTask={this.props.onAddNewTask}
            text="Close Me"
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

export default Main;
