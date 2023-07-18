import React, { useEffect, useState } from "react";
import "./singleTask.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import { apidomain } from "./../../utils/domain";
import UpdateTask from "./UpdateTask";

function SingleTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.user);
  const [tempTaskData, setTempTaskData] = useState([]);
  const [showUpdateForm, setshowUpdateForm] = useState(false);

  const [task, setTask] = useState([]);

  const fetchSingleTask = async () => {
    try {
      const response = await Axios.get(`${apidomain}/tasks/${id}`, {
        headers: {
          Authorization: `${userData.token}`,
        },
      });
      setTask(response.data);
      // console.log(response);
    } catch (response) {
      console.log(response);
    }
  };

  useEffect(() => {
    fetchSingleTask();
  }, [id]);

  const handleClose = () => {
    navigate("/tasks");
  };

  const handleUpdate = (task) => {
    setTempTaskData(task);
    setshowUpdateForm(!showUpdateForm);

    // navigate("/tasks");
  };

  const handleDelete = async () => {
    try {
      const response = await Axios.delete(`${apidomain}/tasks/${id}`, {
        headers: {
          Authorization: `${userData.token}`,
        },
      });
      console.log(response);
      navigate("/tasks");
    } catch (response) {
      console.log(response);
    }
  };

  return (
    <div className="task_page">
      <table className="single_task_table">
        <caption className="single_task_title">SINGLE TASK</caption>
        <tbody>
          {task.map((task, index) => {
            // for created at
            const createdAt = new Date(task.created_at);
            const CreatedDate = createdAt.toDateString();
            const TimeCreated = createdAt.toLocaleTimeString();

            // for due date
            const dueDate = new Date(task.due_date);
            const dueDateDate = dueDate.toDateString();
            const dueDateTime = dueDate.toLocaleTimeString();
            return (
              <React.Fragment key={index}>
                <tr>
                  <td>Title:</td>
                  <td>{task.title}</td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>{task.description}</td>
                </tr>

                <tr>
                  <td>Created At:</td>
                  <td>
                    {CreatedDate} {TimeCreated}
                  </td>
                </tr>

                <tr>
                  <td>Due Date:</td>
                  <td>
                    {dueDateDate} {dueDateTime}
                  </td>
                </tr>

                <tr>
                  <td>Assigned To:</td>
                  <td>{task.username}</td>
                </tr>

                <tr>
                  <td>Email:</td>
                  <td>{task.email}</td>
                </tr>

                <tr>
                  <td>Priority:</td>
                  <td>{task.priority}</td>
                </tr>

                <tr>
                  <td>Status:</td>
                  <td>Not Yet started</td>
                </tr>

                <tr>
                  <td>Task ID:</td>
                  <td>{task.task_id}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <div className="single_task_buttons">
        <button onClick={handleClose}> Back </button>
        <button onClick={() => handleUpdate(task[0])}> Update </button>
        <button onClick={handleDelete}> Delete </button>
      </div>

      {showUpdateForm && (
        <div className="update_task_form">
          <UpdateTask
            setshowUpdateForm={setshowUpdateForm}
            task={tempTaskData}
            fetchSingleTask={fetchSingleTask}
          />
        </div>
      )}
    </div>
  );
}

export default SingleTask;
