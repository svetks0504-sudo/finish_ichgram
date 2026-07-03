import styles from "./styles.module.css";
import { useSelector } from "react-redux";


function Profile(){
     const BASE_URL = "http://127.0.0.1:3333";
  const posts = useSelector((state) => state.posts.posts);
  return (
    <div className={styles.containerExplore}>
      <>
      {posts.map((post) =>
        post.images.map((image) => (
          <img
            key={image}
            className={styles.imgExplore}
            src={`${BASE_URL}/uploads/${image}`}
            alt="foto"
          />
        )),
      )}
      </>
    </div>
  );
}
export default Profile;