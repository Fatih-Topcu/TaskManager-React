import React from "react";
import Task from "./Task.jsx";

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
    return (
      <div id="tasklist">
        <ul className="ul-list">{this.renderList()}</ul>
      </div>
    );
  }
}

export default TaskList;
