import React from "react";
import "./updateBtns.css"

const UpdateButtons = ({ handleClose, handleUpdate }) => (
  <div className="updateBTN">
    <button onClick={handleClose} className="updatetask">
      Close
    </button>
    <button onClick={handleUpdate} className="updatetask">
      Update Task
    </button>
  </div>
);

export default UpdateButtons;
