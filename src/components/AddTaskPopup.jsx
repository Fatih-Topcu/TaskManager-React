import React from "react";
import { withTranslation } from "react-i18next";

class AddTaskPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDescription: "",
    };
  }

  handleChange = (event) => {
    this.setState({ taskDescription: event.target.value });
  };

  addTaskAndClose = () => {
    if (
      this.state.taskDescription !== "" &&
      /\S/.test(this.state.taskDescription)
    ) {
      this.props.onAddNewTask(this.state.taskDescription);
      this.props.closePopup();
    }
  };

  onEnterPressed = (event) => {
    if (event.keyCode == 13) {
      this.addTaskAndClose();
    }
  };

  renderAddTaskWindow = () => {
    const { t } = this.props;

    return (
      <div className="add-task">
        <h3>{t("addnewtask-text")}</h3>
        <textarea
          onChange={this.handleChange}
          onKeyDown={this.onEnterPressed}
          name="taskdesc"
          cols="45"
          rows="5"
          placeholder={t("addnewtaskdescription-text")}
        ></textarea>
        <button
          onClick={this.addTaskAndClose}
          type="button"
          id="add-input-task-btn"
        >
          {t("add-text")}
        </button>
      </div>
    );
  };

  render() {
    const { t } = this.props;
    return (
      <div className="popup">
        <div className="popup_inner">
          {this.renderAddTaskWindow()}
          <button id="close-popup-btn" onClick={this.props.closePopup}>
            <i className="large circular window close icon"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default withTranslation()(AddTaskPopup);
