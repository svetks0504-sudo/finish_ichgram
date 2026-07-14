import { AutoComplete, Flex, Input } from "antd";
import AvatarUni from "../../components/avatarUni";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { searchUsers } from "../../redux/slices/userSlice.js";
import { useEffect, useState } from "react";

function SearchPanel({ setActivePanel }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.me);
  const users = useSelector((state) => state.user.users);
  const [text, setText] = useState("");
  const option = users.map((user) => ({ value: user.username }));

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.trim()) {
        dispatch(searchUsers(text));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch, text]);

  return (
    <div className={styles.overlay}>
      <div className={styles.secondLeftWindow}>
        <Flex style={{ justifyContent: "space-between" }}>
          <h1>Search</h1>
          <button
            className={styles.closeBtn}
            onClick={() => setActivePanel(null)}
          >
            ×
          </button>
        </Flex>

        <AutoComplete
          options={option}
          style={{ width: "100%", margin: "2vw 0 3vw"}}
          value={text}
          onChange={(value) => setText(value)}
          onSearch={(value) => setText(value)}
          variant="filled"
        >
          <Input
          style={{backgroundColor: "transparent", padding: "5px"}}
            placeholder="Search"
            suffix={
              <button
                className={styles.closeBtnSearch}
                onClick={() => setText("")}
                style={{
                  visibility: text ? "visible" : "hidden",
                }}
              >
                x
              </button>
            }
          />
        </AutoComplete>

        <h2 style={{marginBottom: "2vw", padding: "50px 0 30px"}}>Recent</h2>

        {users.length !== 0 &&
          users.map((user) => {
            return (
              <Flex key={user._id}
              style={{alignItems: "center", gap: "8px", marginBottom: "1vw"}}>
                <div
                  onClick={() => {
                    setActivePanel(null);
                  }}
                >
                  <AvatarUni
                    width={"40px"}
                    elem={user.avatar}
                    currentUserId={currentUserId}
                    userId={user._id}
                  />
                </div>
                <h3>{user.username}</h3>
              </Flex>
            );
          })}
      </div>
    </div>
  );
}

export default SearchPanel;
