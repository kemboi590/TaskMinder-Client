import React from "react";

const TaskAssignTo = ({ users, assignedTo, onChange, error }) => (
  <div>
    <label className="task_assign_to">Assign Task To</label>
    <br />
    <div className="check_member">
      {users.map((user) => (
        <React.Fragment key={user.user_id}>
          <input
            type="radio"
            value={user.user_id}
            name="assigned_to"
            checked={assignedTo === user.user_id}
            onChange={onChange}
          />
          <label>{user.username}</label>
        </React.Fragment>
      ))}
    </div>
    {error && <span className="errors">{error}</span>}
  </div>
);

export default TaskAssignTo;
