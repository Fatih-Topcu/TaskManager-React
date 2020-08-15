import React from "react";
import "../style/style.css";
import ReactDOM from "react-dom";

class Task extends React.Component {
  unclampTask = (e) => {
    const el = e.currentTarget.closest(".task");
    el.classList.contains("unclamped")
      ? el.classList.remove("unclamped")
      : el.classList.add("unclamped");
  };

  unclampAll = () => {
    const el = document.getElementsByClassName("task");

    for (let a = 0; a < el.length; a++) {
      if (!el[a].classList.contains("unclamped")) {
        el[a].classList.add("unclamped");
      }
    }
  };

  clampAll = () => {
    const el = document.getElementsByClassName("task");

    for (let a = 0; a < el.length; a++) {
      if (el[a].classList.contains("unclamped")) {
        el[a].classList.remove("unclamped");
      }
    }
  };

  renderTaskDescription = () => (
    <p className={`t-${this.props.task.done}`}>{this.props.task.description}</p>
  );

  renderTaskStatusCheckbox = () => (
    <form>
      <input
        name="done"
        type="checkbox"
        checked={this.props.task.done}
        onChange={() => this.props.onChangeTaskStatus(this.props.task.id)}
      />
    </form>
  );

  renderTaskRemoveButton = () => (
    <i
      onClick={() => this.props.onRemoveTask(this.props.task.id)}
      className="circular trash icon trash-button"
    ></i>
  );

  renderTaskExpandButton = () => (
    <i
      onClick={this.unclampTask}
      className="circular chevron down icon unclamp-button"
    ></i>
  );

  render() {
    return (
      <div className="task" id={`task-${this.props.task.id}`}>
        {this.renderTaskDescription()}
        {this.renderTaskStatusCheckbox()}
        {this.renderTaskRemoveButton()}
        {this.renderTaskExpandButton()}
      </div>
    );
  }
}

export default Task;
