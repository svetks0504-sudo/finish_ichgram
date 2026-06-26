import { Modal } from "antd";

function CreateModal({open, onClose}){
    return(
        <Modal
        title="Basic Modal"
        open={open}
        onOk={open}
        onCancel={onClose}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
}

export default CreateModal;