import React from "react";
import ReactDOM from "react-dom";
import "../style/style.css";
import TaskList from "./TaskList.jsx";
import AddTaskPopup from "./AddTaskPopup.jsx";
import { withTranslation } from "react-i18next";

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
    this.setState({ searchText: "" }, () => {
  
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

    return (
      <div className="search-add">
        <form className="task-search">
          <input
            type="text"
            value={this.state.searchText}
            onChange={this.handleSearchChange}
            placeholder={t("search-text")}
          ></input>
        </form>
        <button onClick={this.togglePopup.bind(this)} className="add-task-btn">
          {t("addnewtask-text")} +
        </button>
      </div>
    );
  };

  render() {
    const { t } = this.props;
    return (
      <div id="main">
        {this.renderSearchAddBar()}
        <TaskList
          ref={(tasklist) => (this.tasklist = tasklist)}
          tasks={this.props.tasks}
          onRemoveTask={this.props.onRemoveTask}
          onChangeTaskStatus={this.props.onChangeTaskStatus}
        />
        {this.state.showPopup ? (
          <AddTaskPopup
            onAddNewTask={this.props.onAddNewTask}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}

        {/* Invisible for now*/}
        <button
          id="select-all-btn"
          type="button"
          onClick={this.props.onSelectAllBtn}
        >
          {t("selectall-text")}
        </button>
        {/* Invisible for now*/}

        <button
          onClick={this.state.expandAll ? this.clampAll : this.unclampAll}
          id="unclamp-all-btn"
        >
          <i
            className={
              this.state.expandAll
                ? "large chevron circle up icon"
                : "large chevron circle down icon"
            }
          />
          <p>{this.state.expandAll ? t("collapse-text") : t("expand-text")}</p>
        </button>

        {/* <button onClick={this.clampAll} id="clamp-all-btn">
          <i className="large chevron circle up icon" />
          <p>{t("collapse-text")}</p>
        </button> */}

        <button onClick={this.props.onRemoveDoneTasks} id="remove-done-btn">
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
