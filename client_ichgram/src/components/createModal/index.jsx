import { Modal } from "antd";
import styles from "./styles.module.css"

function CreateModal({open, onClose}){
    return(
        <Modal
        style={{padding: 0}}
        open={open}
        onOk={open}
        onCancel={onClose}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
      >
        
        <div className={styles.modalTopFlex}>
          <h3>Create new post</h3>
          <button className={styles.modalButton}>Share</button>
          </div>
          <div className={styles.modalContainer}>
          <div className={styles.modalLeft}>
    
        </div>
        <div className={styles.modalRight}></div>
        </div>
      </Modal>
    )
}

export default CreateModal;