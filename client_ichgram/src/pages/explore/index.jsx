import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "../../redux/slices/allPostSlice.js";
import styles from "./styles.module.css";
import { useContext } from "react";
import PostModalContext from "../../context/postModalContext";

function Explore() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.allPosts.posts) || [];
  const { openPost } = useContext(PostModalContext);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts) {
    return <div>Loading...</div>;
  }


  return (
    <div className={styles.exploreContainer}>
      <div className={styles.flex}>
        {posts.map((post) =>
          post.images.map((img) => {
           
            return (
                <img
                key={img}
                onClick={() => openPost({ ...post, user: post.userId })}
                  className={styles.imgExplore} 
                  src={`http://127.0.0.1:3333/uploads/${img}`}
                  alt=""
                />
            );
          }),
        )}
      </div>
    </div>
  );
}
export default Explore;
