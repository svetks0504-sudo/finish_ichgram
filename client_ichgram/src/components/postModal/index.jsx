import { Flex, Modal, Dropdown } from "antd";
import { useContext, useEffect } from "react";
import PostModalContext from "../../context/postModalContext.js";
import styles from "./styles.module.css";
import BtnFollow from "../../components/btnFollow";
import { updateProfile } from "../../redux/slices/userSlice.js";
import { fetchComments } from "../../redux/slices/commentSlice.js";
import { useDispatch, useSelector } from "react-redux";
import like from "../../assets/icons/like.png";
import LikeCountContainer from "../../components/likeCountContainer";
import TimeGray from "../../components/timeGray";
import AvatarUni from "../../components/avatarUni";
import PunktDiv from "../../components/punktDiv";
import { deletePost } from "../../redux/slices/postSlice.js";
import { EllipsisOutlined } from "@ant-design/icons";

const BASE_URL = "http://127.0.0.1:3333";

function PostModal() {
  const dispatch = useDispatch();
  const { selectedPost, closePost } = useContext(PostModalContext);
  const comments = useSelector((state) => state.comments.comments);
  const currentUser = useSelector((state) => state.user.me);

  const isMyPost =
    currentUser?._id === (selectedPost?.userId?._id || selectedPost?.userId);

  const handleEdit = () => {};

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const items = [
    {
      key: "edit",
      label: "Edit",
      onClick: () => handleEdit(selectedPost._id),
    },
    {
      key: "delete",
      label: "Delete",
      danger: true,
      onClick: () => handleDelete(selectedPost._id),
    },
    {
      key: "cancel",
      label: "Cancel",
    },
  ];

  useEffect(() => {
    if (selectedPost) {
      dispatch(fetchComments(selectedPost._id));
    }
  }, [dispatch, selectedPost]);

  if (!selectedPost) return null;

  const isFollow = (id) => {
    if (!currentUser?.following) return false;
    return currentUser.following.some((elem) => {
      const followId = elem._id || elem;
      return followId.toString() === id;
    });
  };

  const onClick = (id) => {
    dispatch(
      updateProfile({
        followUserId: id,
      }),
    );
  };

  return (
    <Modal
      closeIcon={null}
      width="77vw"
      footer={null}
      open={!!selectedPost}
      onCancel={closePost}
    >
      <div className={styles.flexModalPost}>
        <div className={styles.postModalImg}>
          <img
            className={styles.modalImg}
            src={`${BASE_URL}/uploads/${selectedPost.images[0]}`}
            alt="post"
          />
        </div>

        <div className={styles.rightModalPost}>
          <Flex
            style={{
              padding: "10px 10px",
              alignItems: "center",
              gap: "10px",
              borderBottom: "1px solid rgba(239, 239, 239, 1)",
              borderLeft: "1px solid rgba(239, 239, 239, 1)",
              width: "100%",
            }}
          >
            <AvatarUni
              elem={selectedPost.user.avatar}
              width={"27px"}
              userId={selectedPost.user._id}
              currentUserId={currentUser._id}
            />
            <p style={{ fontWeight: 600 }}>{selectedPost.user.username}</p>

            {isMyPost ? (
              <Dropdown
                className={styles.dropdown}
                menu={{ items }}
                trigger={["click"]}
              >
                <EllipsisOutlined
                  style={{
                    marginLeft: "auto",
                    fontSize: 22,
                    cursor: "pointer",
                  }}
                />
              </Dropdown>
            ) : (
              <>
                <PunktDiv color={"rgba(0, 0, 0, 1)"} />
                <BtnFollow
                  padding={"0"}
                  title={
                    isFollow(selectedPost.user._id) ? "Unfollow" : "Follow"
                  }
                  onClick={() => onClick(selectedPost.user._id)}
                />
              </>
            )}
          </Flex>

          <div>
            <Flex
              style={{
                padding: "10px 10px",
                gap: "15px",
                justifyContent: "flex-start",
              }}
            >
              <AvatarUni
                elem={selectedPost.user.avatar}
                width={"27px"}
                userId={selectedPost.user._id}
                currentUserId={currentUser._id}
              />
              <div>
                <span style={{ fontWeight: 600 }}>
                  {selectedPost.user.username}
                </span>{" "}
                <span>{selectedPost.description}</span>
              </div>
            </Flex>
          </div>

          <div className={styles.commentsContainer}>
            {comments.map((comment) => (
              <Flex key={comment._id} className={styles.flexComment}>
                <AvatarUni
                  elem={comment.userId.avatar}
                  width={"27px"}
                  userId={comment.userId._id}
                  currentUserId={currentUser._id}
                />
                <div>
                  <div>
                    <span>
                      <strong>{comment.userId.username}</strong>
                    </span>
                    <span className={styles.textComment}>{comment.text}</span>
                  </div>

                  <Flex>
                    <TimeGray elem={comment} />
                  </Flex>
                </div>
                <img className={styles.like} src={like} alt="like" />
              </Flex>
            ))}
          </div>

          <div>
            <LikeCountContainer margin={"11px"}
            postId={selectedPost._id}
              component={<TimeGray elem={selectedPost} />}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PostModal;
