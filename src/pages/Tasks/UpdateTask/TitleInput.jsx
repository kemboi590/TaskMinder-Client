import React from "react";

const TaskTitleInput = ({ title, onChange, error }) => (
  <div>
    <label className="task_title">Task Title</label>
    <br />
    <input
      className="title_input"
      type="text"
      placeholder="your task title"
      value={title}
      onChange={onChange}
      name="title"
    />
    {error && <span className="errors">{error}</span>}
  </div>
);

export default TaskTitleInput;
