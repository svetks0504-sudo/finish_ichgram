import EmojiPicker from "emoji-picker-react";
import smile from "../../assets/icons/smail.png";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { createComment } from "../../redux/slices/commentSlice.js";
import PostModalContext from "../../context/postModalContext.js";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import BtnFollow from "../../components/btnFollow";

function FormComment({ postId: propsPostId }) {
  const { handleSubmit, register, reset, getValues, setValue } = useForm();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { selectedPost } = useContext(PostModalContext);
  const dispatch = useDispatch();

  const onEmojiClick = (emojiData) => {
    const currentValue = getValues("text") || "";
    (setValue("text", currentValue + emojiData.emoji),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
  };

  const finalPostId = propsPostId || selectedPost?._id;

  const onSubmit = (data) => {
    dispatch(
      createComment({
        ...data,
        postId: finalPostId,
      }),
    );
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <button
        type="button"
        className={styles.emojiBtn}
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <img src={smile} alt="Smile" />
      </button>
      {showEmojiPicker && (
        <div className={styles.emojiPicker}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
      <textarea
        {...register("text", {
          required: true,
        })}
        className={styles.textarea}
        placeholder="Add comment"
      ></textarea>
      <BtnFollow title={"Send"} htmlType={"submit"} />
    </form>
  );
}

export default FormComment;