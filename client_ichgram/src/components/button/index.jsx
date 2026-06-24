import { Button } from "antd";

function Btn({ titleBtn, onClick, widthBtn, htmlType }) {
  return (
    <Button
      style={{ width: widthBtn }}
      type="primary"
      htmlType={htmlType}
      onClick={onClick}
    >
      {titleBtn}
    </Button>
  );
}
export default Btn;
