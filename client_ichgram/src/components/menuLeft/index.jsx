import { Menu } from "antd";
import styles from "./styles.module.css";
import ImgLogo from "../../components/imgLogo";
import { useNavigate } from "react-router-dom";
import Btn from "../../components/button";
import { logout } from "../../redux/slices/authSlice.js";
import { useDispatch } from "react-redux";
import PostModalContext from "../../context/postModalContext.js";
import { useContext } from "react";

function MenuLeft({
  arr,
  setActivePanel,
  setIsCreateOpen,
  setActiveMenuKey,
  activeMenuKey,
}) {
  const { closePost } = useContext(PostModalContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = arr.map((elem) => ({
    key: elem.key,
    icon: <img src={elem.icon} alt={elem.title} />,
    label: elem.title,
  }));
  const onClick = ({ key }) => {
    const item = arr.find((elem) => elem.key === key);

    setActiveMenuKey(item.key);

    setActivePanel(null);
    setIsCreateOpen(false);
    closePost()

    if (item.type === "route") {
      navigate(item.link);
    } else if (item.type === "panel") {
      setActivePanel(item.panel);
    } else if (item.type === "modal") {
      setIsCreateOpen(true);
    }
  };

  function onLogout() {
    return dispatch(logout());
  }

  return (
    <div className={styles.menuConteiner}>
      <div className={styles.logoDiv}>
        <ImgLogo height={"55px"} width={"97px"} />
      </div>
      <Menu 
        selectedKeys={[activeMenuKey]}
        onClick={onClick}
        style={{ width: 245 }}
        mode="vertical"
        items={items}
      />
      <div className={styles.btnLogaut}>
        <Btn titleBtn={"Logout"} onClick={onLogout} />
      </div>
    </div>
  );
}
export default MenuLeft;
