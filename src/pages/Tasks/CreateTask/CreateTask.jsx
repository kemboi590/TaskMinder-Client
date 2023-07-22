import React, { useEffect, useState } from "react";
import "./createtask.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { apidomain } from "../../../utils/domain";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastStyles } from "../../../toastConfig";

// schema to do form validation when data is submitted
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  assigned_to: yup.number("Assign to is required"),

  due_date: yup
    .string()
    .required("Due date is required")
    .test("due-date", "Due date must be in the future", (value) => {
      //validating that date is future
      const selectedDate = new Date(value);
      const currentDate = new Date();
      return selectedDate >= currentDate;
    }),
  priority: yup.string().required("Priority is required"),
});

function CreateTask() {
  const [users, setUsers] = useState([]);
  const userData = useSelector((state) => state.user.user);
  const navigate = useNavigate();
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
  }, []); //get all users in page reload

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    Axios.post(`${apidomain}/tasks`, data, {
      headers: {
        Authorization: `${userData.token}`,
      },
    })
      .then((resonse) => {
        toast.success(resonse.data.message, toastStyles.success);
        navigate("/tasks");
        // reset();
      })
      .catch((resonse) => {
        toast.error(
          "Oops! Something went wrong, try again later",
          toastStyles.error
        );
        console.log(resonse);
      });
    // console.log(data);
  };

  return (
    <div className="create_task_page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="task_form">
          <div>
            <label className="task_title"> Task Title</label>
            <br />
            <input
              className="title_input"
              type="text"
              placeholder="your task title"
              {...register("title")}
            />

            {errors.title && <p className="errors">{errors.title.message}</p>}
          </div>
          <br />
          <div>
            <label className="task_description">Description</label>
            <br />
            <textarea
              className="description_input"
              cols="30"
              rows="10"
              placeholder=" your task description"
              {...register("description")}
            ></textarea>

            {errors.description && (
              <p className="errors">{errors.description.message}</p>
            )}
          </div>
          <br />
          <div>
            <label className="task_assign_to">Assign Task To</label>
            <br />
            <div className="check_member">
              {/* mapping users */}
              {users.map((user) => (
                <React.Fragment key={user.user_id}>
                  <input
                    type="radio"
                    value={user.user_id}
                    {...register("assigned_to")}
                  />

                  <label htmlFor="">{user.username}</label>
                </React.Fragment>
              ))}

              {errors.assigned_to && (
                <p className="errors">{errors.assigned_to.message}</p>
              )}
            </div>
          </div>

          <br />
          <div>
            <label className="task_dueDate">Due Date</label>
            <br />
            <input
              type="date"
              name="dueDate"
              className="dueDate_calender"
              {...register("due_date")}
            />

            {errors.due_date && (
              <p className="errors">{errors.due_date.message}</p>
            )}
          </div>
          <br />
          {/* set priority by using radio butons*/}
          <div>
            <label className="task_priority">Priority</label>
            <br />
            <div className="radio_task">
              <input
                type="radio"
                name="priority"
                value="High"
                className="radio_priority"
                {...register("priority")}
              />
              <label className="task_priority">High</label>
              <input
                type="radio"
                name="priority"
                value="Medium"
                className="radio_priority"
                {...register("priority")}
              />
              <label className="task_priority">Medium</label>
              <input
                type="radio"
                name="priority"
                value="Low"
                className="radio_priority"
                {...register("priority")}
              />

              <label className="priority">Low</label>

              {errors.priority && (
                <p className="errors">{errors.priority.message}</p>
              )}
            </div>
          </div>
          <br />

          {/* a submit button saying create task */}
          <input type="submit" value="Create Task" className="submit_task" />
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
