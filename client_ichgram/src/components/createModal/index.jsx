import { Modal, Upload, Button, Avatar, Flex } from "antd";
import styles from "./styles.module.css";
import { Controller, useForm } from "react-hook-form";
import { createPost } from "../../redux/slices/postSlice.js";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import buttonUpload from "../../assets/icons/buttonUpload.png"

function CreateModal({ open, onClose }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm();

  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);

  const onSubmit = (data) => {
    dispatch(createPost(data));
    reset();
    onClose();
  };
  const onEmojiClick = (emojiData) => {
    const currentValue = getValues("description") || "";

    (setValue("description", currentValue + emojiData.emoji),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
  };

  const MAX_LENGTH = 200;
  return (
    <Modal
      closeIcon={null}
      width="63vw"
      footer={null}
      open={open}
      onCancel={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.modalTopFlex}>
          <h3 className={styles.textTopModal}>Create new post</h3>
          <div className={styles.modalTopFlexButtons}>
            <button className={styles.modalButton} type="submit">
              Share
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.modalButtonRed}
            >
              ✕
            </button>
          </div>
        </div>
        <div className={styles.modalContainer}>
          <div className={styles.modalLeft}>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <Upload
                  style={{ border: "none", background: "none" }}
                  className={styles.upload}
                  beforeUpload={() => false}
                  multiple
                  maxCount={10}
                  accept="image/*"
                  listType="picture-card"
                  fileList={(field.value || []).map((file, index) => ({
                    uid: index,
                    name: file.name,
                    status: "done",
                    originFileObj: file,
                  }))}
                  onChange={(info) => {
                    field.onChange(
                      info.fileList.map((file) => file.originFileObj),
                    );
                  }}
                >
                  <Button
                    style={{
                      border: "none",
                      background: "none",
                      boxShadow: "none",
                    }}
                  >
                    <img
                      src={buttonUpload}
                      alt="Upload Image"
                    />
                  </Button>
                </Upload>
              )}
            />
          </div>
          <div className={styles.modalRight}>
            <div className={styles.avatarContainer}>
              <Flex style={{ padding: "17px 19px", gap: "12px" }}>
                <Avatar
                  src={`http://127.0.0.1:3333/uploads/${me?.avatar}`}
                  size={28}
                />
                <h4>{me?.username}</h4>
              </Flex>

              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <textarea
                      maxLength={MAX_LENGTH}
                      className={styles.textarea}
                      {...field}
                      placeholder="What's on your mind?"
                    />
                    <div className={styles.counter}>
                      {field.value?.length || 0}/{MAX_LENGTH}
                    </div>
                  </>
                )}
              />
            </div>
            <div className={styles.modalRightBottom}>
              <EmojiPicker onEmojiClick={onEmojiClick} width="100%" />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default CreateModal;
