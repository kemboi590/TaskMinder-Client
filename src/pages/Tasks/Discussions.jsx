import React, { useState, useEffect, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./discussions.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { apidomain } from "../../utils/domain";

function Discussions() {
  const { id } = useParams(); // get the id of the task
  const userData = useSelector((state) => state.user.user);
  const [commentsDetails, setCommentsDetails] = useState([]);

  const getAllComments = async () => {
    try {
      const response = await Axios.get(`${apidomain}/comments/${id}`, {
        headers: {
          Authorization: `${userData.token}`,
        },
      });
      console.log(response.data);
      setCommentsDetails(response.data);
    } catch (response) {
      console.log(response);
    }
  };

  const textareaRef = React.useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <div className="comments_page">
      <h2 className="comment_title">Comments</h2>

      <div className="wrap_comments">
        {commentsDetails &&
          commentsDetails.map((comment, index) => {
            const timestamp = new Date(comment.timestamp).toLocaleString();
            return (
              <div className="comment_card" key={index}>
                <div className="upper_div">
                  <p> {comment.username}</p>
                  <p> {timestamp}</p>
                </div>
                {/* <p>Title for task: {comment.title}</p> */}

                <p className="comment_content">{comment.content}</p>
              </div>
            );
          })}

        <form onSubmit={handleSubmit} className="myFormComments">
          <div className="form_for_comments">
            <div className="textarea">
              <textarea
                className="inputComment"
                placeholder="Write a comment"
                name="Coment"
                ref={textareaRef}
              />
            </div>

            <button type="submit" className="sbmtComment">
              <IoSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Discussions;
