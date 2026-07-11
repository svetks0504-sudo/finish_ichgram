import { Flex } from "antd";
import styles from "./styles.module.css";
import PostModalContext from "../../context/postModalContext.js";
import { useContext } from "react";

function CommentElemHome({ post }) {
   const { openPost } = useContext(PostModalContext);
  return (
    <div>
      {post.previewComments.map((comment) => {
        return (
          <Flex
            key={comment._id}
            style={{ gap: "1vw", paddingBottom: "0.6vw", marginTop: "8px" }}
          >
            <strong>{comment.userId.username}</strong>
            <span className={styles.commentText}>{comment.text}</span>
            {comment.text.length > 80 && (
              <button className={styles.moreBtn}>more</button>
            )}
          </Flex>
        );
      })}
        <Flex className={styles.commentsFooter}>
              <p className={styles.viewGray} onClick={() => openPost(post)}>
                View all comments ({post.commentsCount})
              </p>
            </Flex>
    </div>
  );
}

export default CommentElemHome;
