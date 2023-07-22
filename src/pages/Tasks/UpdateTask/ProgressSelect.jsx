import React from "react";
import "./progressSelect.css";
const TaskProgressSelect = ({ status, onChange, error }) => (
  <div className="task_progress">
    <label className="task_progress">Task Progress</label>
    <br />
    <select
      className="select_progress"
      name="status"
      value={status}
      onChange={onChange}
    >
      <option value="Not Started">Not Started</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
      <option value="Overdue">Overdue</option>
    </select>
    {error && <span className="errors">{error}</span>}
  </div>
);

export default TaskProgressSelect;
