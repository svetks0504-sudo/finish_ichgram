import { useState } from "react";
import PostModalContext from "../../context/postModalContext";

function PostModalProvider({ children }) {
  const [selectedPost, setSelectedPost] = useState(null);

  const openPost = (post) => setSelectedPost(post);
  const closePost = () => setSelectedPost(null);

  return (
    <PostModalContext.Provider
      value={{
        selectedPost,
        openPost,
        closePost,
      }}
    >
      {children}
    </PostModalContext.Provider>
  );
}

export default PostModalProvider;
