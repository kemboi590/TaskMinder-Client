import React,{ useEffect, useState } from "react";
import "./updatecomment.css";
import { IoSend } from "react-icons/io5";
import Axios from "axios";
import { apidomain } from "./../../utils/domain";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function UpdateComment({ comment, getAllComments }) {
    const textareaRef = React.useRef(null);
  const { id } = useParams(); // get the id of the task
  const userData = useSelector((state) => state.user.user);
  const [newComment, setNewComment] = useState(""); // comment details
  useEffect(() => {
    setNewComment(comment.content);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.put(
      `${apidomain}/comments/${comment.comment_id}`,
      { content: newComment },
      {
        headers: {
          Authorization: `${userData.token}`,
        },
      }
    )
      .then((response) => {
        // console.log(response.data.message)
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      
          getAllComments();
         
         
      })
      .catch((error) => {
        console.log(error);
        toast.error("Oops! Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  return (
    <div>
      <form className="updateComment">
        <textarea
          className="inputupdateComment"
          placeholder="Write a comment"
          name="Coment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          //   defaultValue={comment.Coment}
        ></textarea>

        <button type="submit" className="submitUpdate" onClick={handleSubmit}>
          <IoSend />
        </button>
      </form>
    </div>
  );
}

export default UpdateComment;
