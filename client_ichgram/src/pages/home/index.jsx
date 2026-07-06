import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { Avatar, Flex } from "antd";

function Home() {
  const posts = useSelector((state) => state.allPosts.posts);
  return (
    <div>
      {posts.map((elem) => {
        return (
          <div key={elem.id} className={styles.postContainer}>
            <Flex>
              <Avatar
                src={`http://127.0.0.1:3333/uploads/${elem.userId.avatar}`}
              />
              <p>{elem.userId.username}</p>
            </Flex>
          </div>
        );
      })}
    </div>
  );
}
export default Home;
