import { Button } from "antd";
import styles from "./styles.module.css";

function BtnFollow({
  onClick,
  title,
  htmlType,
  padding,
  width,
  background = "none",
  color = "rgba(0, 149, 246, 1)",
}) {
  return (
    <Button
      className={styles.btn}
      style={{
        background,
        color,
        padding: padding,
        width,
      }}
      onClick={onClick}
      htmlType={htmlType}
    >
      {title}
    </Button>
  );
}

export default BtnFollow;
