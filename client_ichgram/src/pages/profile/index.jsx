import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMe } from "../../redux/slices/userSlice.js";
import ProfileComponent from "../../components/profileComponent/index.jsx";
import EditProfile from "../../components/editProfile";
import { Button } from "antd";

function Profile() {
  const [editProfile, setEditProfile] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  function onClick() {
    setEditProfile(true);
  }

  const btnArr = [<Button
                    style={{
                      background: "rgba(239, 239, 239, 1)",
                      width: "168px",
                      fontWeight: 700,
                    }}
                    onClick={onClick}
                  >
                   Edit profile
                  </Button>
]

  const posts = useSelector((state) => state.posts.posts);
  const me = useSelector((state) => state.user.me);
  if (!me) {
    return <div>Loading...</div>;
  }
  return editProfile ? (
    <EditProfile setEditProfile={setEditProfile}/>
  ) : (
    <ProfileComponent 
    user={me} 
    posts={posts} 
    arr={btnArr} 
    bgColor={"rgba(239, 239, 239, 1)"} 
    width={"168.72px"}
    />
  );
}
export default Profile;
