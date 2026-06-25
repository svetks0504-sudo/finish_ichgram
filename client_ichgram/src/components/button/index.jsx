import { Button } from "antd";

function Btn({ titleBtn, onClick, widthBtn, htmlType }) {
  return (
    <Button
      style={{
        width: widthBtn,
        fontSize: "1.2rem",
        background: "rgba(0, 149, 246, 1)",
      }}
      type="primary"
      htmlType={htmlType}
      onClick={onClick}
    >
      {titleBtn}
    </Button>
  );
}
export default Btn;
