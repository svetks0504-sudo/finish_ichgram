import { Button } from "antd";

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
      style={{
        background,
        border: "none",
        boxShadow: "none",
        color,
        fontWeight: "600",
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
