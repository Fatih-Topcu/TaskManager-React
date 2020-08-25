import React from "react";
import Task from "./Task.jsx";
import Loader from "./Loader";
import { withTranslation } from "react-i18next";

class TaskList extends React.Component {
  renderTask = (task) => {
    const { onRemoveTask, onChangeTaskStatus } = this.props;
    return (
      <Task
        ref={(task) => (this.task = task)}
        task={task}
        onRemoveTask={onRemoveTask}
        onChangeTaskStatus={onChangeTaskStatus}
      />
    );
  };

  renderList = () => {
    const { tasks } = this.props;
    return tasks.map((task) => {
      if (task.show === true) {
        return <li key={task.id}>{this.renderTask(task)}</li>;
      }
    });
  };

  render() {
    const { t, tasks } = this.props;
    return (
      <div>
        {tasks.length > 1 ? (
          <div id="tasklist">
            <ul className="ul-list">{this.renderList()}</ul>
          </div>
        ) : (
         <Loader />
        )}
      </div>
    );
  }
}

export default (TaskList);
