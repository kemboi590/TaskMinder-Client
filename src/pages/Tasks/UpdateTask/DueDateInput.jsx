import React from "react";

const TaskDueDateInput = ({ dueDate, onChange, error }) => (
  <div>
    <label className="task_dueDate">Due Date</label>
    <br />
    <input
      type="date"
      name="due_date"
      className="dueDate_calender"
      value={dueDate}
      onChange={onChange}
    />
    {error && <span className="errors">{error}</span>}
  </div>
);

export default TaskDueDateInput;
