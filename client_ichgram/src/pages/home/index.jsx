import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { Avatar, Flex } from "antd";
import TimeGray from "../../components/timeGray";
import PunktDiv from "../../components/punktDiv";
import BtnFollow from "../../components/btnFollow";
import { updateProfile } from "../../redux/slices/userSlice.js";
import AvatarUni from "../../components/avatarUni";

function Home() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.me);
  const posts = useSelector((state) => state.allPosts.posts);

  const isFollow = (id) => {
    if (!currentUser?.following) return false;
    return currentUser.following.some((elem) => {
      const followId = elem._id || elem;
      return followId.toString() === id;
    });
  };

  const onClick = (id) => {
    dispatch(
      updateProfile({
        followUserId: id,
      }),
    );
  };

  return (
    <div>
      {posts.map((elem) => {
        const isMyPost = currentUser?._id === elem.userId._id;
        return (
          <div key={elem._id} className={styles.postContainer}>
            <Flex style={{ alignItems: "center" }}>
              <AvatarUni
              elem={elem.userId.avatar}
               width={"27px"} userId={elem.userId._id} currentUserId={currentUser?._id}
                
              />
              <p>{elem.userId.username}</p>
              <PunktDiv color={"rgba(115, 115, 115, 1)"} />
              <TimeGray elem={elem} />
              <PunktDiv color={"rgba(115, 115, 115, 1)"} />
              {!isMyPost && (
                <BtnFollow
                  title={isFollow(elem.userId._id) ? "Unfollow" : "Follow"}
                  onClick={() => onClick(elem.userId._id)}
                />
              )}
            </Flex>
          </div>
        );
      })}
    </div>
  );
}
export default Home;
