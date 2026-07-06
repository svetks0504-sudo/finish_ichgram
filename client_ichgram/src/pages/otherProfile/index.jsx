import { Avatar, Button, Flex } from "antd";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {fetchMe} from "../../redux/slices/userSlice.js"

function OtherProfile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  const BASE_URL = "http://127.0.0.1:3333";
  const posts = useSelector((state) => state.posts.posts);
  const me = useSelector((state) => state.user.me);
  if (!me) {
    return <div>Loading...</div>;
  }
  console.log(me);
  return (
    <div className={styles.containerExplore}>
      <Flex style={{gap: "7vw"}}>
        <Avatar style={{height: "150px", width: "150px"}}
        src={`http://127.0.0.1:3333/uploads/${me.avatar}`} />
        <div>
          <Flex>
            <h2>{me.username}</h2>
            <Button>Edit profile</Button>
          </Flex>
          <Flex>
            <h3>{posts.length}</h3>
            <h3>{me.followers.length}</h3>
            <h3>{me.following.length}</h3>
          </Flex>
          <div>
            <h4>{me.bio}</h4>
            <a>{me.website}</a>
          </div>
        </div>
      </Flex>

      <div>
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
      </div>
    </div>
  );
}
export default OtherProfile;