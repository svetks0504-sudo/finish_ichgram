import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket/socket.js";
import { chatUsers } from "../../redux/slices/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import AvatarUni from "../../components/avatarUni";
import { Link } from "react-router-dom";
import { Avatar, Button, Drawer, Flex } from "antd";
import PunktDiv from "../../components/punktDiv";
import TextArea from "antd/es/input/TextArea.js";
import { openChat } from "../../redux/slices/chatSlice.js";
import ChatLeftUsers from "../../components/chatLeftUsers";

const BASE_URL = import.meta.env.VITE_API_URL;

function Message() {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);

  const [selectedUser, setSelectedUser] = useState(null);
  const [sendText, setSendText] = useState("");
  const [messages, setMessages] = useState([]);
  const conversation = useSelector((state) => state.chat.conversation);
  useEffect(() => {}, [conversation]);
  const messagesEndRef = useRef(null);
  const [mobile, setMobile] = useState(window.innerHeight <= 900);
  const [open, setOpen] = useState(false);

  //достаем юзеров
  useEffect(() => {
    if (me?._id) {
      dispatch(chatUsers());
    }
  }, [dispatch, me?._id]);

  //подключаем связь
  useEffect(() => {
    if (!me?._id) return;
    const handleConnect = () => {
      socket.emit("join-user", me._id);
    };
    socket.connect();
    socket.on("connect", handleConnect);
    return () => {
      socket.off("connect", handleConnect);
      socket.disconnect();
    };
  }, [me?._id]);

  //загружаем историю сообщений
  useEffect(() => {
    const handleHistory = (messages) => {
      setMessages(messages);
    };
    socket.on("chat-history", handleHistory);
    return () => {
      socket.off("chat-history", handleHistory);
    };
  }, []);

  //получить новие сообщения//при чем
  useEffect(() => {
    const handleMessage = (message) => {
      if (message.conversationId !== conversation?._id) return;

      setMessages((prev) => [...prev, message]);
    };
    socket.on("receive-message", handleMessage);

    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, [conversation?._id]);

  const openChatBtn = async (user) => {
    setSelectedUser(user);
    await dispatch(openChat(user._id));
  };

  const sendMessage = () => {
    if (!sendText.trim()) return;
    socket.emit("send-message", {
      conversationId: conversation._id,
      text: sendText,
    });

    setSendText("");
  };

  //заходим в кабинет и очищяем
  useEffect(() => {
    if (!conversation?._id) return;

    setMessages([]);

    socket.emit("join-room", conversation._id);
  }, [conversation?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    //какой розмер окна
    const resize = () => setMobile(window.innerWidth <= 900);
    //сразу проверили какой розмер
    resize();
    //слушаем собитие
    window.addEventListener("resize", resize);
    //убираем слушателя
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className={styles.allContaintMsg}>
      {mobile ? (
        <>
          <Drawer
            className={styles.drawer}
            placement="left"
            size={280}
            open={open}
            onClose={() => setOpen(false)}
          >
            <ChatLeftUsers
              meUsNam={me?.username}
              openChatBtn={openChatBtn}
              selectedUserId={selectedUser?._id}
              mobile={mobile}
              setOpen={setOpen}
            />
          </Drawer>
        </>
      ) : (
        <>
          <ChatLeftUsers
            meUsNam={me?.username}
            openChatBtn={openChatBtn}
            selectedUserId={selectedUser?._id}
          />
        </>
      )}
      {selectedUser ? (
        <div className={styles.chatContainer}>
          <div className={styles.topMessage}>
            <AvatarUni
              width={"44px"}
              elem={selectedUser.avatar}
              currentUserId={me._id}
              userId={selectedUser._id}
            />
            <h3>{selectedUser.username}</h3>
            <button className={styles.burger} onClick={() => setOpen(!open)}>
              New chat
            </button>
          </div>

          <div className={styles.mainContainer}>
            <div className={styles.avatNameBtn}>
              <AvatarUni
                width={"7vw"}
                elem={selectedUser.avatar}
                currentUserId={me._id}
                userId={selectedUser._id}
              />

              <div className={styles.centerDiv}>
                <h2>{selectedUser.username}</h2>
                <Flex
                  style={{
                    color: "rgba(115, 115, 115, 1)",
                    alignItems: "center",
                    gap: "0.5vw",
                  }}
                >
                  <h4>{selectedUser.username}</h4>
                  <PunktDiv color={"rgba(115, 115, 115, 1)"} />
                  <h4>ICHgram</h4>
                </Flex>
              </div>

              <Link
                to={`/profile/${selectedUser._id}`}
                style={{ margin: "1vw" }}
              >
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

            <div className={styles.messages}>
              {messages.map((message, index) => {
                const showDate =
                  index === 0 ||
                  new Date(message.createdAt).toDateString() !==
                    new Date(messages[index - 1].createdAt).toDateString();

                return (
                  <div key={message._id}>
                    {showDate && (
                      <p className={styles.greyData}>
                        {new Date(message.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    )}

                    <div
                      className={
                        message.sender === me._id
                          ? styles.myMessage
                          : styles.otherMessage
                      }
                    >
                      {message.sender === selectedUser._id && (
                        <Avatar
                          size={28}
                          style={{ flexShrink: 0 }}
                          src={`${BASE_URL}/uploads/${
                            selectedUser.avatar
                          }`}
                        />
                      )}
                      <div
                        className={
                          message.sender === me._id
                            ? styles.myDiv
                            : styles.otherDiv
                        }
                      >
                        {message.text}
                      </div>
                      {message.sender === me._id && (
                        <Avatar
                          size={28}
                          style={{ flexShrink: 0 }}
                          src={`${BASE_URL}/uploads/${me.avatar}`}
                        />
                      )}
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>
            <div className={styles.inputContainer}>
              <TextArea
                value={sendText}
                onChange={(e) => setSendText(e.target.value)}
                className={styles.textareaMessage}
                placeholder="Write message"
                autoSize={{ minRows: 1, maxRows: 4 }}
              />
              {sendText.trim() && (
                <button className={styles.sendBtn} onClick={sendMessage}>
                  Send
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.emptyChat}>
          <div className={styles.emptyCircle}>💬</div>
          <h2>Welcome, {me?.username} 👋</h2>
          <p>Select a friend and start a conversation</p>
          <button
            className={styles.burgerWelcome}
            onClick={() => setOpen(!open)}
          >
            New chat
          </button>
        </div>
      )}
    </div>
  );
}
export default Message;
