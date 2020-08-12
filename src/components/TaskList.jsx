import React from "react";
import Task from "./Task.jsx";
import "../style/style.css";

class TaskList extends React.Component {
  render() {
    return (
      <div id="tasklist">
        <ul className="ul-list">
          {this.props.tasks.map((task) => {
            if (task.show === true) {
              return (
                <li key={task.id}>
                  <Task
                    ref={(task) => (this.task = task)}
                    task={task}
                    onRemoveTask={this.props.onRemoveTask}
                    onChangeTaskStatus={this.props.onChangeTaskStatus}
                  />
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

export default TaskList;
