import { useEffect } from "react";
import { socket } from "../../socket/socket.js";
import { chatUsers, fetchMe } from "../../redux/slices/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import AvatarUni from "../../components/avatarUni";
import { Link } from "react-router-dom";
import { Button } from "antd";

function Message() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.usersMessage);
  const me = useSelector((state) => state.user.me);
  console.log(users);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    if (me?._id) {
      dispatch(chatUsers());
    }
  }, [dispatch, me]);

  useEffect(() => {
    if (!me?._id) return;
    socket.connect();
    socket.emit("join-user", me._id);

    return () => {
      socket.disconnect();
    };
  }, [me]);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div className={styles.leftContainer}>
        <h1>{me?.username}</h1>
        <div>
          {users.map((user) => {
            return (
              <div className={styles.flexUser} key={user._id}>
                <AvatarUni
                  userId={user._id}
                  currentUserId={me._id}
                  width={"56px"}
                  elem={user.avatar}
                />
                <h3>{user.username}</h3>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <div className={styles.topMessage}>
          <AvatarUni />
          <h3>Заміни перевір шрифт</h3>
        </div>
        <div className={styles.avatNameBtn}>
          <AvatarUni width={"7vw"} />
          <Link to={`/profile/${"#"}`}>
            <Button
              style={{
                border: "none",
                background: "rgba(239, 239, 239, 1)",
                width: "12vw",
                fontWeight: 700,
              }}
            >
              View profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Message;
