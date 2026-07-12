import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchUser, updateProfile } from "../../redux/slices/userSlice.js";
import { getAllPosts } from "../../redux/slices/allPostSlice.js";
import ProfileComponent from "../../components/profileComponent";
import { Button } from "antd";
import BtnFollow from "../../components/btnFollow";

function OtherProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.allPosts.posts);

  const userPosts = posts.filter((post) => post.userId._id === id);

  useEffect(() => {
    dispatch(fetchUser(id));
    dispatch(getAllPosts());
  }, [dispatch, id]);

  const currentUser = useSelector((state) => state.user.me);

  const isFollow = (id) => {
    if (!currentUser) return false;
    return currentUser?.following?.some((elem) => {
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

  if (!posts) {
    return <div>Loading...</div>;
  }
  const btnArr = [
    <BtnFollow
      onClick={() => onClick(id)}
      title={isFollow(id) ? "Unfollow" : "Follow"}
      background="rgba(0, 149, 246, 1)"
      color="white"
      width={"132px"}
    />,
    <Link to={"/messages"}>
      <Button
        style={{
          background: "rgba(239, 239, 239, 1)",
          width: "168px",
          fontWeight: 700,
        }}
      >
        Message
      </Button>
    </Link>,
  ];

  return (
    <div className={styles.containerExplore}>
      <ProfileComponent
        user={user}
        posts={userPosts}
        arr={btnArr}
        bgColor={"rgba(239, 239, 239, 1)"}
        width={"168.72px"}
      />
    </div>
  );
}
export default OtherProfile;
