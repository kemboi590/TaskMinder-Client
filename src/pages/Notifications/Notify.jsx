import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./notifications.css";
import { useSelector } from "react-redux";
import { apidomain } from "../../utils/domain";
function Notify() {
  const userData = useSelector((state) => state.user.user);
  const [notifications, setNotifications] = useState([]);

  const getUserNotifications = async () => {
    try {
      const response = await Axios.get(
        `${apidomain}/notifications/${userData.user_id}`,
        {
          headers: { Authorization: `${userData.token}` },
        }
      );
      console.log(response.data);
      setNotifications(response.data);
    } catch (response) {
      console.log(response);
    }
  };
  useEffect(() => {
    getUserNotifications();
  }, []);

  return (
    <div className="notify_page">
      <h2 className="notify_title">Notifications</h2>

      <div className="notification_wrapper">
        <ol className="ordered_list">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => {
              return (
                <div className="notifications_content" key={index}>
                  <li>{notification.content}</li>
                </div>
              );
            })
          ) : (
            <div className="no_notifications">
              No notifications at the moment🙁
            </div>
          )}
        </ol>
      </div>
    </div>
  );
}

export default Notify;
