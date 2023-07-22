import React from "react";

const TaskDescriptionInput = ({ description, onChange, error }) => (
  <div>
    <label className="task_description">Description</label>
    <br />
    <textarea
      className="description_input"
      cols="30"
      rows="10"
      placeholder="your task description"
      value={description}
      onChange={onChange}
      name="description"
    ></textarea>
    {error && <span className="errors">{error}</span>}
  </div>
);

export default TaskDescriptionInput;
