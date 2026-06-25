import { Menu } from "antd";
import styles from "./styles.module.css";
import ImgLogo from "../../components/imgLogo";

function MenuLeft({ arr }) {
  const items = arr.map((elem) => ({
    key: elem.name,
    icon: <img src={elem.icon} alt={elem.title} />,
    label: elem.title,
  }));
  const onClick = (e) => {
    console.log("click", e);
  };
  return (
    <div className={styles.menuConteiner}>
      <div className={styles.logoDiv}>
      <ImgLogo height={"4vw"} width={"7vw"} />
      </div>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        mode="vertical"
        items={items}
      />
    </div>
  );
}
export default MenuLeft;
