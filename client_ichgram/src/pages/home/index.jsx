import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { Flex } from "antd";
import TimeGray from "../../components/timeGray";
import PunktDiv from "../../components/punktDiv";
import BtnFollow from "../../components/btnFollow";
import { updateProfile } from "../../redux/slices/userSlice.js";
import AvatarUni from "../../components/avatarUni";
import LikeCountContainer from "../../components/likeCountContainer";
import CommentElemHome from "../../components/commentElemHome";
import homeFooter from "../../assets/icons/homeFooter.png";
import PostModalContext from "../../context/postModalContext.js";
import { useContext } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

function Home() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.me);
  const posts = useSelector((state) => state.allPosts.posts);
  const { openPost } = useContext(PostModalContext);

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
      <div className={styles.homeContainer}>
        {posts.map((elem) => {
          const isMyPost = currentUser?._id === elem.user._id;
          return (
            <div key={elem._id} className={styles.postContainer}>
              <Flex
                style={{
                  alignItems: "center",
                  gap: "5px",
                  flexWrap: "wrap",
                  paddingTop: "8px",
                  paddingBottom: "12px",
                }}
              >
                <AvatarUni
                  elem={elem.user.avatar}
                  width={"27px"}
                  userId={elem.user._id}
                  currentUserId={currentUser?._id}
                />
                <p>{elem.user.username}</p>
                <PunktDiv color={"rgba(115, 115, 115, 1)"} />
                <TimeGray elem={elem} />
                <PunktDiv color={"rgba(115, 115, 115, 1)"} />
                {!isMyPost && (
                  <BtnFollow
                    padding={"10px"}
                    title={isFollow(elem.user._id) ? "Unfollow" : "Follow"}
                    onClick={() => onClick(elem.user._id)}
                  />
                )}
              </Flex>
              <img
                onClick={() => openPost(elem)}
                className={styles.imgPost}
                src={`${BASE_URL}/uploads/${elem.images[0]}`}
              />
              <div className={styles.content}>
                <LikeCountContainer
                  margin={"2px"}
                  component={<CommentElemHome post={elem} />}
                  postId={elem._id}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.centerFooterHome}>
        <img className={styles.imgFooter} src={homeFooter} alt="icon" />
        <h3>You've seen all the updates</h3>
        <p className={styles.greyFooter}>
          You have viewed all new publications
        </p>
      </div>
    </div>
  );
}
export default Home;
