import { Avatar } from "antd";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import PostModalContext from "../../context/postModalContext.js";
import { useContext } from "react";

const BASE_URL = "http://127.0.0.1:3333";

function AvatarUni({ elem, width, userId, currentUserId }) {
  const { closePost } = useContext(PostModalContext);
  const profileLink =
    userId === currentUserId ? "/profile" : `/profile/${userId}`;
  return (
    <NavLink to={profileLink}>
      <Avatar
      onClick={closePost}
        className={styles.avatar}
        size={width}
        src={`${BASE_URL}/uploads/${elem}`}
      />
    </NavLink>
  );
}

export default AvatarUni;
