import React from "react";

class AddTaskPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDescription: '',
    };
  }

  handleChange = (event) => {
    this.setState({ taskDescription: event.target.value });
  };

  addTaskAndClose = () => {
    if (this.state.taskDescription !== ''  && /\S/.test(this.state.taskDescription)) {
      this.props.onAddNewTask(this.state.taskDescription);
      this.props.closePopup();
    }
  };

  onEnterPressed = (event) =>{
    if(event.keyCode == 13){
      this.addTaskAndClose();
    }
  }
 
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="add-task">
            <h3>Yeni Görev Ekle</h3>
            <textarea
              onChange={this.handleChange}
              onKeyDown={this.onEnterPressed}
              name="taskdesc"
              cols="45"
              rows="5"
              placeholder="Görev Tanımı..."
            ></textarea>
            <button
              onClick={this.addTaskAndClose}
              type="button"
              id="add-input-task-btn"
            >
              EKLE
            </button>
          </div>

          <button id="close-popup-btn" onClick={this.props.closePopup}>
            <i className="large circular window close icon"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default AddTaskPopup;
