import React, { useEffect, useState } from "react";
import "./updateTask.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { apidomain } from "../../utils/domain";
import { useSelector } from "react-redux";

function UpdateTask({ setshowUpdateForm, task, fetchSingleTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigned_to, setAssigned_to] = useState("");
  const [due_date, setDue_date] = useState("");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssigned_to(task.assigned_to || "");
      const formattedDueDate = task.due_date.split("T")[0];
      setDue_date(formattedDueDate);
      setPriority(task.priority || "");
    }
  }, [task]);

  const [users, setUsers] = useState([]);
  const userData = useSelector((state) => state.user.user);
  // const navigate = useNavigate();

  // get request to fetch all users in the database
  const getAllUsers = async () => {
    try {
      const response = await Axios.get(`${apidomain}/users`, {
        headers: {
          Authorization: `${userData.token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.log("error fetching users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  // clossing the submit form
  const handleClose = () => {
    setshowUpdateForm(false);
  };
  // validating that the form has data on submitting
  const validateForm = () => {
    const errors = {};

    if (title.trim() === "") {
      errors.title = "Title is required";
    }

    if (description.trim() === "") {
      errors.description = "Description is required";
    }

    if (!assigned_to) {
      errors.assigned_to = "Assigned to is required";
    }

    if (due_date.trim() === "") {
      errors.due_date = "Due date is required";
    }

    if (!priority) {
      errors.priority = "Priority is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  // submitting data in thr form
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await Axios.put(
        `${apidomain}/tasks/${task.task_id}`,
        {
          title: title,
          description: description,
          assigned_to: assigned_to,
          due_date: due_date,
          priority: priority,
        },
        {
          headers: {
            Authorization: `${userData.token}`,
          },
        }
      );
      // console.log(response.data.message);
      alert(response.data.message);
      fetchSingleTask();
    } catch (response) {
      alert("an error occured, please try again");
      // console.log(response);
    }
  };

  return (
    <div className="create_task_page">
      <form name="update form">
        <div className="task_form">
          <div>
            <label className="task_title">Task Title</label>
            <br />
            <input
              className="title_input"
              type="text"
              placeholder="your task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
            />
            {errors.title && <span className="errors">{errors.title}</span>}
          </div>
          <br />
          <div>
            <label className="task_description">Description</label>
            <br />
            <textarea
              className="description_input"
              cols="30"
              rows="10"
              placeholder="your task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
            ></textarea>
            {errors.description && (
              <span className="errors">{errors.description}</span>
            )}
          </div>
          <br />
          <div>
            <label className="task_assign_to">Assign Task To</label>
            <br />
            <div className="check_member">
              {/* getting all users in the database */}
              {users.map((user) => (
                <React.Fragment key={user.user_id}>
                  <input
                    type="radio"
                    value={user.user_id}
                    name="assigned_to"
                    onChange={(e) => setAssigned_to(e.target.value)}
                  />
                  <label>{user.username}</label>
                </React.Fragment>
              ))}
            </div>
            {errors.assigned_to && (
              <span className="errors">{errors.assigned_to}</span>
            )}
          </div>
          <br />
          <div>
            <label className="task_dueDate">Due Date</label>
            <br />
            <input
              type="date"
              name="due_date"
              className="dueDate_calender"
              value={due_date}
              onChange={(e) => setDue_date(e.target.value)}
            />
            {errors.due_date && (
              <span className="errors">{errors.due_date}</span>
            )}
          </div>
          <br />
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
                onChange={(e) => setPriority(e.target.value)}
              />
              <label className="task_priority">High</label>
              <input
                type="radio"
                name="priority"
                value="Medium"
                className="radio_priority"
                checked={priority === "Medium"}
                onChange={(e) => setPriority(e.target.value)}
              />
              <label className="task_priority">Medium</label>
              <input
                type="radio"
                name="priority"
                value="Low"
                className="radio_priority"
                checked={priority === "Low"}
                onChange={(e) => setPriority(e.target.value)}
              />
              <label className="priority">Low</label>
            </div>
            {errors.priority && (
              <span className="errors">{errors.priority}</span>
            )}
          </div>
          <br />
          <div className="updateBTN">
            <button onClick={handleClose} className="updatetask">
              Close
            </button>
            <button onClick={handleUpdate} className="updatetask">
              Update Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateTask;
