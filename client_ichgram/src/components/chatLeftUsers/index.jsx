import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { Avatar } from "antd";

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
                src={`http://127.0.0.1:3333/uploads/${user.avatar}`}
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
