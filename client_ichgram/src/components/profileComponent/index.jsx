import styles from "./styles.module.css";
import { Avatar, Button, Flex } from "antd";
import { useState } from "react";
import imgLink from "../../assets/icons/imgLink.png";
import { useContext } from "react";
import PostModalContext from "../../context/postModalContext";


const BASE_URL = "http://127.0.0.1:3333";

function ProfileComponent({ user, posts, arr, onClick, bgColor, width }) {
  const [expanded, setExpanded] = useState(false);
  const { openPost } = useContext(PostModalContext);
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
                    style={{
                      background: bgColor,
                      width: width,
                      fontWeight: 700,
                    }}
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
           
            <div className={styles.bioText}>
              <span>
              {expanded
                ? user.bio
                : `${user.bio.slice(0, 110)}${user.bio.length > 100 ? "..." : ""}`}
            </span>
            {user.bio.length > 100 && (
              <button className={styles.btnMore}
              onClick={() => setExpanded(!expanded)}>
                {expanded ? "Less" : "More"}
              </button>
            )}
            </div>
           
            <a className={styles.linkBio} href={user.website}> <img src={imgLink} 
            /> {user.website}</a>
          </div>
        </div>
      </div>

      <Flex className={styles.fotoflex}>
        {posts.map((post) =>
          post.images.map((image) => (
            <button className={styles.postBtn}
           onClick={() => openPost(post)}
            key={image}>
              <img
                className={styles.imgExplore}
                src={`${BASE_URL}/uploads/${image}`}
                alt="foto"
              />
            </button>
          )),
        )}
      </Flex>
    </div>
  );
}

export default ProfileComponent;
