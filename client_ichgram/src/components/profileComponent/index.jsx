import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Avatar, Button, Flex } from "antd";

const BASE_URL = "http://127.0.0.1:3333";

function ProfileComponent({ user, posts, arr, onClick, bgColor, width }) {
  return (
    <div className={styles.containerExplore}>
      <div className={styles.topProfile}>
        <Avatar
          style={{ height: "150px", width: "150px" }}
          src={`http://127.0.0.1:3333/uploads/${user.avatar}`}
        />

        <div className={styles.rightTop}>
          <Flex style={{ gap: "2vw", alignItems: "center" }}>
            <h2>{user.username}</h2>
            {arr.map((elem) => {
              return (
                <div key={elem.title} className={styles.btnFlex}>
                  <Button 
                  style={{background: bgColor, width: width, fontWeight: 700}}
                  onClick={onClick}
                  >
                    {elem.title}
                    </Button>
                </div>
              );
            })}
          </Flex>

          <Flex style={{ gap: "3vw" }}>
            <h3>{posts.length} posts</h3>
            <h3>{user.followers.length} followers</h3>
            <h3>{user.following.length} following</h3>
          </Flex>

          <div>
            <h4>{user.bio}</h4>
            <a>{user.website}</a>
          </div>
        </div>
      </div>

      <Flex className={styles.fotoflex}>
        {posts.map((post) =>
          post.images.map((image) => (
            <Link to={`/posts/my/${post._id}`} key={image}>
              <img
                className={styles.imgExplore}
                src={`${BASE_URL}/uploads/${image}`}
                alt="foto"
              />
            </Link>
          )),
        )}
      </Flex>
    </div>
  );
}

export default ProfileComponent;
