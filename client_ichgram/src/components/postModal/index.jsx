import { Flex, Modal, Dropdown } from "antd";
import { useContext, useEffect, useState } from "react";
import PostModalContext from "../../context/postModalContext.js";
import styles from "./styles.module.css";
import BtnFollow from "../../components/btnFollow";
import { updateProfile } from "../../redux/slices/userSlice.js";
import {
  fetchComments,
  createComment,
} from "../../redux/slices/commentSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import EmojiPicker from "emoji-picker-react";
import smile from "../../assets/icons/smail.png";
import like from "../../assets/icons/like.png";
import likeBig from "../../assets/icons/likeBig.png";
import likeBigRed from "../../assets/icons/likeBigRed.png";
import comment from "../../assets/icons/comment.png";
import TimeGray from "../../components/timeGray";
import AvatarUni from "../../components/avatarUni";
import PunktDiv from "../../components/punktDiv";
import {
  addLike,
  removeLike,
  fetchLikes,
} from "../../redux/slices/likeSlice.js";
import { deletePost } from "../../redux/slices/postSlice.js";
import { EllipsisOutlined } from "@ant-design/icons";

const BASE_URL = "http://127.0.0.1:3333";

function PostModal() {
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.likes.likes);
  const { selectedPost, closePost } = useContext(PostModalContext);
  const comments = useSelector((state) => state.comments.comments);
  const currentUser = useSelector((state) => state.user.me);
  const { handleSubmit, register, reset, getValues, setValue } = useForm();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const isMyPost =
    currentUser?._id === (selectedPost?.userId?._id || selectedPost?.userId);

  const onEmojiClick = (emojiData) => {
    const currentValue = getValues("text") || "";
    (setValue("text", currentValue + emojiData.emoji),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
  };

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
      dispatch(fetchLikes(selectedPost._id));
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

  const onSubmit = (data) => {
    dispatch(
      createComment({
        ...data,
        postId: selectedPost._id,
      }),
    );
    reset();
  };

  const isLiked = likes.some(
    (like) => (like.userId._id || like.userId) === currentUser._id,
  );

  const handleLike = () => {
    if (isLiked) {
      dispatch(removeLike(selectedPost._id));
    } else {
      dispatch(addLike(selectedPost._id));
    }
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
                <PunktDiv color={"rgba(0, 0, 0, 1)"}/>
                <BtnFollow
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
          <div className={styles.countLike}>
            <Flex style={{ gap: "15px" }}>
              <img
                onClick={handleLike}
                src={isLiked ? likeBigRed : likeBig}
                alt="like"
              />
              <img src={comment} alt="comment" />
            </Flex>
            <p className={styles.fontText}>{likes.length} likes</p>
            <TimeGray elem={selectedPost.likesCount} />
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <button
              type="button"
              className={styles.emojiBtn}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <img src={smile} alt="Smile" />
            </button>
            {showEmojiPicker && (
              <div className={styles.emojiPicker}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <textarea
              {...register("text", {
                required: true,
              })}
              className={styles.textarea}
              placeholder="Add comment"
            ></textarea>
            <BtnFollow title={"Send"} htmlType={"submit"} />
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default PostModal;
