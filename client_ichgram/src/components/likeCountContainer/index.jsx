import likeBig from "../../assets/icons/likeBig.png";
import likeBigRed from "../../assets/icons/likeBigRed.png";
import comment from "../../assets/icons/comment.png";
import styles from "./styles.module.css";
import { Flex } from "antd";
import {
  addLike,
  removeLike,
  fetchLikes,
} from "../../redux/slices/likeSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState } from "react";
import FormComment from "../../components/formComment";

const EMPTY_ARRAY = [];

function LikeCountContainer({ component, postId, margin }) {
  const currentUser = useSelector((state) => state.user.me);
  const dispatch = useDispatch();
  const likes = useSelector(
    (state) => state.likes.likesByPost[postId] ?? EMPTY_ARRAY
);

  const isLiked = likes.some(
    (like) => (like.userId._id || like.userId) === currentUser._id,
  );
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      dispatch(removeLike(postId));
    } else {
      dispatch(addLike(postId));
    }
  };

  useEffect(() => {
    if (postId) {
      dispatch(fetchLikes(postId));
    }
  }, [dispatch, postId]);
  const onCommentClick = () => setShowCommentForm((prev) => !prev);

  return (
    <div>
      <div className={styles.countLike} style={{marginLeft: margin}}>
        <Flex style={{ gap: "15px" }}>
          <img
            onClick={handleLike}
            src={isLiked ? likeBigRed : likeBig}
            alt="like"
          />
          <img src={comment} alt="comment" onClick={onCommentClick} />
        </Flex>
        <p className={styles.fontText}>{likes.length} likes</p>
        {component}
      </div>
      {showCommentForm && <FormComment postId={postId}/>}
    </div>
  );
}
export default LikeCountContainer;
