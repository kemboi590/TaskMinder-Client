import React from "react";

const TaskPrioritySelect = ({ priority, onChange, error }) => (
  <div>
    <label className="task_priority">Priority</label>
    <br />
    <div className="radio_task">
      <input
        type="radio"
        name="priority"
        value="High"
        className="radio_priority"
        checked={priority === "High"}
        onChange={onChange}
      />
      <label className="task_priority">High</label>
      <input
        type="radio"
        name="priority"
        value="Medium"
        className="radio_priority"
        checked={priority === "Medium"}
        onChange={onChange}
      />
      <label className="task_priority">Medium</label>
      <input
        type="radio"
        name="priority"
        value="Low"
        className="radio_priority"
        checked={priority === "Low"}
        onChange={onChange}
      />
      <label className="priority">Low</label>
    </div>
    {error && <span className="errors">{error}</span>}
  </div>
);

export default TaskPrioritySelect;
