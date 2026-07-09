import { Button } from "antd";

function BtnFollow({onClick, title, htmlType, padding}){
    return(
        <Button style={{background: "none",
            border: "none",
            boxShadow: "none",
            color: "rgba(0, 149, 246, 1)",
            fontWeight: "600",
            padding: padding,
        }}
        onClick={onClick}
        htmlType={htmlType}>{title}</Button>
    )
}

export default BtnFollow;