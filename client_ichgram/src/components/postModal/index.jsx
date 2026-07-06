import { Modal } from "antd";
import { useContext } from "react";
import PostModalContext from "../../context/postModalContext.js";

function PostModal() {
  const { selectedPost, closePost } = useContext(PostModalContext);
  return (
    <Modal
      closeIcon={null}
      width="63vw"
      footer={null}
      open={!!selectedPost}
      onCancel={closePost}
    >
      <h2>Hello</h2>
    </Modal>
  );
}

export default PostModal;
