import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { Avatar } from "antd";

const BASE_URL = import.meta.env.VITE_API_URL;

function ChatLeftUsers({
  setOpen,
  mobile,
  meUsNam,
  openChatBtn,
  selectedUserId,
}) {
  const users = useSelector((state) => state.user.usersMessage);
  return (
    <div className={styles.leftContainer}>
      <h2 className={styles.topLeftConr}>{meUsNam}</h2>
      <div style={{ height: "100%" }}>
        {users.map((user) => {
          return (
            <div
              className={
                selectedUserId === user._id ? styles.activ : styles.flexUser
              }
              onClick={() => {
                openChatBtn(user);
                mobile && setOpen(false);
              }}
              key={user._id}
            >
              <Avatar
                style={{ width: "56px", height: "56px" }}
                src={`${BASE_URL}/uploads/${user.avatar}`}
              />
              <h4>{user.username}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatLeftUsers;
