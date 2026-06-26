import { Menu } from "antd";
import styles from "./styles.module.css";
import ImgLogo from "../../components/imgLogo";
import { useNavigate } from "react-router-dom";

function MenuLeft({
  arr,
  setActivePanel,
  setIsCreateOpen,
  setActiveMenuKey,
  activeMenuKey,
}) {
  const navigate = useNavigate();
  const items = arr.map((elem) => ({
    key: elem.key,
    icon: <img src={elem.icon} alt={elem.title} />,
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
    <div className={styles.menuConteiner}>
      <div className={styles.logoDiv}>
        <ImgLogo height={"4vw"} width={"7vw"} />
      </div>
      <Menu
        selectedKeys={[activeMenuKey]}
        onClick={onClick}
        style={{ width: 256 }}
        mode="vertical"
        items={items}
      />
    </div>
  );
}
export default MenuLeft;
