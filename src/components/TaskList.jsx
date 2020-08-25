import React from "react";
import Task from "./Task.jsx";
import Loader from "./Loader";
import { withTranslation } from "react-i18next";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderActive: false,
    };
  }

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

  componentDidMount = () => {
    this.setState({ loaderActive: true });
    setTimeout(() => {
      this.setState({ loaderActive: false });
    }, 2000);
  };

  render() {
    const { loaderActive } = this.state;
    return (
      <div>
        {!loaderActive ? (
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

export default TaskList;
