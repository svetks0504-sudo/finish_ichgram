import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMe } from "../../redux/slices/userSlice.js";
import ProfileComponent from "../../components/profileComponent/index.jsx";
import EditProfile from "../../components/editProfile";

function Profile() {
  const [editProfile, setEditProfile] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  function onClick() {
    setEditProfile(true);
  }

  const btnArr = [{ title: "Edit profile", onClick: onClick }];

  const posts = useSelector((state) => state.posts.posts);
  const me = useSelector((state) => state.user.me);
  if (!me) {
    return <div>Loading...</div>;
  }
  return editProfile ? (
    <EditProfile />
  ) : (
    <ProfileComponent 
    user={me} 
    posts={posts} 
    arr={btnArr} 
    bgColor={"rgba(239, 239, 239, 1)"}
    onClick={onClick} 
    width={"168.72px"}
    />
  );
}
export default Profile;
