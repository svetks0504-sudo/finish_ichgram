import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUser, updateProfile } from "../../redux/slices/userSlice.js";
import { getAllPosts } from "../../redux/slices/allPostSlice.js";
import ProfileComponent from "../../components/profileComponent";

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
    return currentUser?.following?.some((elem) => elem._id === id) ?? false;
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
    {
      title: isFollow(user?._id) ? "Unfollow" : "Follow",
      onClick: () => onClick(user._id),
    },
    {
      title: "Message",
    },
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
