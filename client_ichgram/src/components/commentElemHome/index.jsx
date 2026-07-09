import { Flex } from "antd";

function CommentElemHome({ post }) {
  
  return (
    <div>
      {post.previewComments.map((comment) => {
        return (
          <Flex 
          key={comment._id} 
          style={{gap: "1vw", 
          paddingBottom: "0.6vw", marginTop: "8px",}}>
            <strong>{comment.userId.username}</strong>
            <span>{comment.text}</span>
          </Flex>
        );
      })}
    </div>
  );
}

export default CommentElemHome;
