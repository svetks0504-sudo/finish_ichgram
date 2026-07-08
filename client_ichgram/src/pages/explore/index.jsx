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

  let imageIndex = 0;

  return (
    <div className={styles.exploreContainer}>
      <div className={styles.grid}>
        {posts.map((post) =>
          post.images.map((img) => {
            const current = imageIndex++;

            return (
              <button
                className={styles.postBtn}
                onClick={() => openPost({ ...post, user: post.userId })}
                key={`${post._id}-${current}`}
              >
                <img
                  className={`${styles.imgExplore} ${
                    current % 5 === 4 ? styles.tall : ""
                  }`}
                  src={`http://127.0.0.1:3333/uploads/${img}`}
                  alt=""
                />
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}
export default Explore;
