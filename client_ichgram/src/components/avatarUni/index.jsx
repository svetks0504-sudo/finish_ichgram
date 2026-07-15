import { Avatar } from "antd";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import PostModalContext from "../../context/postModalContext.js";
import { useContext } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

function AvatarUni({ elem, width, userId, currentUserId }) {
  const { closePost } = useContext(PostModalContext);
  const profileLink =
    userId === currentUserId ? "/profile" : `/profile/${userId}`;

  return (
    <NavLink to={profileLink}>
      <Avatar
     style={{width: width, height: width}}
        onClick={closePost}
        className={styles.avatar}
        size={width}
        src={`${BASE_URL}/uploads/${elem}`}
      />
    </NavLink>
  );
}

export default AvatarUni;
