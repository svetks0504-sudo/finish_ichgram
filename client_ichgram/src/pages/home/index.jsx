import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { Avatar } from "antd";

function Home() {
  const posts = useSelector((state) => state.posts.posts);
  return (
    <div>
      {posts.map((elem) => {
        return (
          <div key={elem.id} className={styles.postContainer}>
            <Avatar></Avatar>
          </div>
        );
      })}
    </div>
  );
}
export default Home;
