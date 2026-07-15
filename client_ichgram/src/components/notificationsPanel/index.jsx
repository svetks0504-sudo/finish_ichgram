import AvatarUni from "../../components/avatarUni";
import styles from "./styles.module.css";
import TimeGray from "../../components/timeGray";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Flex } from "antd";
import { useEffect } from "react";
import {
  getNotifications,
  deleteNotification,
} from "../../redux/slices/notificationSlice";
import { useContext } from "react";
import PostModalContext from "../../context/postModalContext.js";
import { markAsRead } from "../../redux/slices/notificationSlice.js";
import { EllipsisOutlined } from "@ant-design/icons";

const BASE_URL = import.meta.env.VITE_API_URL;

function NotificationsPanel({ setActivePanel }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.me);
  const { openPost } = useContext(PostModalContext);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const notifications = useSelector(
    (state) => state.notification.notifications,
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.secondLeftWindow}>
        <Flex style={{ justifyContent: "space-between" }}>
          <h1>Notifications</h1>
          <button
            className={styles.closeBtn}
            onClick={() => setActivePanel(null)}
          >
            ×
          </button>
        </Flex>

        <h3 className={styles.newText}>New</h3>
        <div className={styles.allNotification}>
          {notifications.map((notificat) => {
            const items = [
              {
                key: "delete",
                label: "Delete notification",
                danger: true,
                onClick: () => dispatch(deleteNotification(notificat._id)),
              },
            ];
            return (
              <div
                className={
                  notificat.isRead ? styles.redText : styles.normalText
                }
                key={notificat._id}
              >
                <Flex className={styles.notificatContainer}>
                  <div className={styles.flexNotific}>
                    <div
                      onClick={() => {
                        setActivePanel(null);
                      }}
                    >
                      <AvatarUni
                        width={"44px"}
                        elem={notificat.sender.avatar}
                        currentUserId={currentUserId}
                        userId={notificat.sender._id}
                      />
                    </div>

                    <div
                      onClick={() => {
                        dispatch(markAsRead(notificat._id));
                      }}
                    >
                      <div>
                        <strong>{notificat.sender.username}</strong>
                        <span>
                          {notificat.type === "like" && " liked your post"}
                          {notificat.type === "comment" &&
                            " commented on your post"}
                          {notificat.type === "follow" &&
                            " started following you"}
                        </span>
                        <TimeGray elem={notificat} />
                      </div>
                    </div>
                  </div>
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <EllipsisOutlined className={styles.moreBtn} />
                  </Dropdown>
                  {notificat.postId?.images?.length > 0 && (
                    <img
                      onClick={() =>
                        openPost({
                          ...notificat.postId,
                          user: notificat.postId.userId,
                        })
                      }
                      className={styles.imgPost}
                      src={`${BASE_URL}/uploads/${notificat.postId.images[0]}`}
                    />
                  )}
                </Flex>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPanel;
