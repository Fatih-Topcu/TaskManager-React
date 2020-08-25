import React from "react";
import { withTranslation } from "react-i18next";

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

  renderTaskDescription = () => {
    const { task } = this.props;

    return <p className={`t-${task.done}`}>{task.description}</p>;
  };

  renderTaskDates = () => {
    const { t, task } = this.props;

    return (
      <div className="task-date">
        <div className="task-creation-date">
          {t("task-creation-date")} : {task.dateCreated}
        </div>
        <div className="task-completion-date">
          {task.done
            ? t("task-completion-date") + " : " + task.dateCompleted
            : null}
        </div>
      </div>
    );
  };

  renderTaskStatusCheckbox = () => {
    const { task, onChangeTaskStatus } = this.props;

    return (
      <form>
        <input
          name="done"
          type="checkbox"
          checked={task.done}
          onChange={() => onChangeTaskStatus(task.id)}
        />
      </form>
    );
  };

  renderTaskRemoveButton = () => {
    const { task, onRemoveTask } = this.props;

    return (
      <i
        onClick={() => onRemoveTask(task.id)}
        className="circular trash icon trash-button"
      ></i>
    );
  };

  renderTaskExpandButton = () => (
    <i
      onClick={this.unclampTask}
      className="circular chevron down icon unclamp-button"
    ></i>
  );

  render() {
    const {task} = this.props;
    return (
      <div className="task" id={`task-${task.id}`}>
        <div className="task-data">
          {this.renderTaskDescription()}
          {this.renderTaskDates()}
        </div>
        {this.renderTaskStatusCheckbox()}
        {this.renderTaskRemoveButton()}
        {this.renderTaskExpandButton()}
      </div>
    );
  }
}

export default withTranslation(undefined, { withRef: true })(Task);
