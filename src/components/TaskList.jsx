import React from "react";
import Task from "./Task.jsx";
import "../style/style.css";

class TaskList extends React.Component {
  renderTask = (task) => (
    <Task
      ref={(task) => (this.task = task)}
      task={task}
      onRemoveTask={this.props.onRemoveTask}
      onChangeTaskStatus={this.props.onChangeTaskStatus}
    />
  );

  renderList = () => {
    return this.props.tasks.map((task) => {
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
