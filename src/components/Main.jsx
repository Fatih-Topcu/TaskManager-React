import React from "react";
import TaskList from "./TaskList.jsx";
import AddTaskPopup from "./AddTaskPopup.jsx";
import { withTranslation } from "react-i18next";
import axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
      searchText: "",
      expandAll: false,
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  resetSearchBar = () => {
    this.setState({ searchText: "" }, () => {});
  };

  handleSearchChange = (event) => {
    this.setState({ searchText: event.target.value }, this.updateList);
  };

  updateList = () => {
    const { tasks } = this.props;
    const { searchText } = this.state;
    const filtered = tasks.map((task) => {
      return task.description.toLowerCase().includes(searchText.toLowerCase());
    });

    this.props.onChangeTaskShow(filtered, true);
  };

  unclampAll = () => {
    this.tasklist.task.unclampAll();
    this.setState({ expandAll: true });
  };

  clampAll = () => {
    this.tasklist.task.clampAll();
    this.setState({ expandAll: false });
  };

  renderSearchAddBar = () => {
    const { t } = this.props;
    const { searchText } = this.state;

    return (
      <div className="search-add">
        <form
          className="task-search"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            value={searchText}
            onChange={this.handleSearchChange}
            placeholder={t("search-text")}
          ></input>
        </form>
        <div className="add-task-btn-div">
          <button onClick={this.addRandomTask} className="add-task-btn">
            {t("addrandomnew-task")} +
          </button>
          <button
            onClick={this.togglePopup.bind(this)}
            className="add-task-btn"
          >
            {t("addnewtask-text")} +
          </button>
        </div>
      </div>
    );
  };

  addRandomTask = () => {
    const randomTextSize = Math.floor(Math.random() * 4) + 1;

    axios
      .get(`https://cors-anywhere.herokuapp.com/https://loripsum.net/api/${randomTextSize}`)
      .then((response) => {
        this.props.onAddNewTask( response.data.replace(/<p>/g, "").replace(/<\/p>/g, ""));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      t,
      tasks,
      onRemoveTask,
      onChangeTaskStatus,
      onAddNewTask,
      onSelectAllBtn,
      onRemoveDoneTasks,
    } = this.props;
    const { showPopup, expandAll } = this.state;
    return (
      <div id="main">
        {this.renderSearchAddBar()}
        <TaskList
          ref={(tasklist) => (this.tasklist = tasklist)}
          tasks={tasks}
          onRemoveTask={onRemoveTask}
          onChangeTaskStatus={onChangeTaskStatus}
        />
        {showPopup ? (
          <AddTaskPopup
            onAddNewTask={onAddNewTask}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}

        {/* Invisible for now*/}
        <button id="select-all-btn" type="button" onClick={onSelectAllBtn}>
          {t("selectall-text")}
        </button>
        {/* Invisible for now*/}

        <button
          onClick={expandAll ? this.clampAll : this.unclampAll}
          id="unclamp-all-btn"
        >
          <i
            className={
              expandAll
                ? "large chevron circle up icon"
                : "large chevron circle down icon"
            }
          />
          <p>{expandAll ? t("collapse-text") : t("expand-text")}</p>
        </button>

        {/* <button onClick={this.clampAll} id="clamp-all-btn">
          <i className="large chevron circle up icon" />
          <p>{t("collapse-text")}</p>
        </button> */}

        <button onClick={onRemoveDoneTasks} id="remove-done-btn">
          <i className="large trash alternate icon" />
          <p>
            {t("delete-text1")}
            <br /> {t("delete-text2")}
          </p>
        </button>
      </div>
    );
  }
}

export default withTranslation(undefined, { withRef: true })(Main);
