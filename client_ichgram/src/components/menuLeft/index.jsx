import { Menu, Drawer } from "antd";
import styles from "./styles.module.css";
import ImgLogo from "../../components/imgLogo";
import { useNavigate } from "react-router-dom";
import Btn from "../../components/button";
import { logout } from "../../redux/slices/authSlice.js";
import { useDispatch } from "react-redux";
import PostModalContext from "../../context/postModalContext.js";
import { useContext, useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";

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
  const [mobile, setMobile] = useState(window.innerHeight <= 900);
  const [open, setOpen] = useState(false);

  const onClick = ({ key }) => {
    const item = arr.find((elem) => elem.key === key);
    setActiveMenuKey(item.key);

    setActivePanel(null);
    setIsCreateOpen(false);
    closePost();

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

  useEffect(() => {
    //какой розмер окна
    const resize = () => setMobile(window.innerWidth <= 900);
    //сразу проверили какой розмер
    resize();
    //слушаем собитие
    window.addEventListener("resize", resize);
    //убираем слушателя
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (mobile) {
    return (
      <>
        <button
          className={styles.burger}
          onClick={() => setOpen((prev) => !prev)}
        >
          <MenuOutlined />
        </button>

        <Drawer
          placement="left"
          open={open}
          size={245}
          closeIcon={false}
        >
          <div className={styles.logoDiv}>
            <ImgLogo height="55px" width="97px" />
          </div>

          <Menu
            selectedKeys={[activeMenuKey]}
            onClick={(e) => {
              onClick(e);
              setOpen(false);
            }}
            mode="vertical"
            items={items}
          />

          <div className={styles.btnLogaut}>
            <Btn titleBtn="Logout" onClick={onLogout} />
          </div>
        </Drawer>
      </>
    );
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
