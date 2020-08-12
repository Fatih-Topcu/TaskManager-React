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
  render() {
    return (
      <div className="task" id={`task-${this.props.task.id}`}>
        <p className={`t-${this.props.task.done}`}>
          {this.props.task.description}
        </p>

        <form>
          <input
            name="done"
            type="checkbox"
            checked={this.props.task.done}
            onChange={() => this.props.onChangeTaskStatus(this.props.task.id)}
          />
        </form>

        <button
          onClick={() => this.props.onRemoveTask(this.props.task.id)}
          className="trash-button"
        >
          <i className="circular trash icon"></i>
        </button>
        <button onClick={this.unclampTask} className="unclamp-button">
          <i className="circular chevron down icon"></i>
        </button>
      </div>
    );
  }
}

export default Task;
