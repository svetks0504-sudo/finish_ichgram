import styles from "./styles.module.css";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function Footer({
  arr,
  setActivePanel,
  setIsCreateOpen,
  setActiveMenuKey,
  activeMenuKey,
}) {
  const navigate = useNavigate();

  const items = arr.map((elem) => ({
    key: elem.key,
    label: elem.title,
  }));

  const onClick = ({ key }) => {
    const item = arr.find((elem) => elem.key === key);

    setActiveMenuKey(item.key);

    if (item.type === "route") {
      navigate(item.link);
    } else if (item.type === "panel") {
      setActivePanel(item.panel);
    } else if (item.type === "modal") {
      setIsCreateOpen(true);
    }
  };

  return (
    <div className={styles.containerFoot}>
      <Menu
        className={styles.linksContainer}
        selectedKeys={[activeMenuKey]}
        onClick={onClick}
        items={items}
        mode="horizontal"
      ></Menu>
      <h4>© 2024 ICHgram</h4>
    </div>
  );
}

export default Footer;
