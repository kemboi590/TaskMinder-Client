import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastStyles } from "../../../toastConfig";
import { apidomain } from "../../../utils/domain";
import { validateForm } from "./formValidation";
import "react-toastify/dist/ReactToastify.css";

// Import the components

import TaskDescriptionInput from "./DescriptionInput";
import TaskAssignTo from "./AssignTo";
import TaskProgressSelect from "./ProgressSelect";
import TaskDueDateInput from "./DueDateInput";
import TaskPrioritySelect from "./PrioritySelect";
import UpdateButtons from "./UpdateButtons";
import TaskTitleInput from "./TitleInput";

function UpdateTask({ setshowUpdateForm, task, fetchSingleTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigned_to, setAssigned_to] = useState("");
  const [due_date, setDue_date] = useState("");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssigned_to(task.assigned_to || "");
      const formattedDueDate = task.due_date.split("T")[0];
      setDue_date(formattedDueDate);
      setPriority(task.priority || "");
      setStatus(task.status || "Not started");
    }
  }, [task]);

  const [users, setUsers] = useState([]);
  const userData = useSelector((state) => state.user.user);

  // Get request to fetch all users in the database
  const getAllUsers = async () => {
    try {
      const response = await Axios.get(`${apidomain}/users`, {
        headers: {
          Authorization: `${userData.token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error("error fetching users", toastStyles.error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Closing the submit form
  const handleClose = () => {
    setshowUpdateForm(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const errors = validateForm(
      title,
      description,
      assigned_to,
      due_date,
      priority,
      status
    );
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await Axios.put(
          `${apidomain}/tasks/${task.task_id}`,
          {
            title: title,
            description: description,
            assigned_to: assigned_to,
            due_date: due_date,
            priority: priority,
            status: status,
          },
          {
            headers: {
              Authorization: `${userData.token}`,
            },
          }
        );
        toast.success(response.data.message, toastStyles.success);
        fetchSingleTask();
      } catch (response) {
        toast.error(
          "An error occurred, please try again later",
          toastStyles.error
        );
      }
    }
  };

  return (
    <div className="create_task_page">
      <form name="update form">
        <div className="task_form">
          {/* Task Title */}
          <TaskTitleInput
            title={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
          />
          <br />

          {/* Task Description */}
          <TaskDescriptionInput
            description={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
          />
          <br />

          {/* Task Assign To */}
          <TaskAssignTo
            users={users}
            assignedTo={assigned_to}
            onChange={(e) => setAssigned_to(e.target.value)}
            error={errors.assigned_to}
          />
          <br />

          {/* Task Progress */}
          <TaskProgressSelect
            status={status}
            onChange={(e) => setStatus(e.target.value)}
            error={errors.status}
          />
          <br />

          {/* Task Due Date */}
          <TaskDueDateInput
            dueDate={due_date}
            onChange={(e) => setDue_date(e.target.value)}
            error={errors.due_date}
          />
          <br />

          {/* Task Priority */}
          <TaskPrioritySelect
            priority={priority}
            onChange={(e) => setPriority(e.target.value)}
            error={errors.priority}
          />
          <br />

          {/* Update Buttons */}
          <UpdateButtons
            handleClose={handleClose}
            handleUpdate={handleUpdate}
          />
        </div>
      </form>
    </div>
  );
}

export default UpdateTask;
