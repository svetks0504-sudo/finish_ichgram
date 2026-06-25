import styles from "./styles.module.css";
import ImgLogo from "../../components/imgLogo";
import InputUniversal from "../../components/input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../../components/button";
import { forgotPass } from "../../redux/slices/authSlice";
import OrElement from "../../components/orElement";
import { Link } from "react-router-dom";

const passFogot = [
  {
    name: "login",
    type: "text",
    placeholder: "Email or username",
    rules: {
      required: "Email or username is required",
    },
  },
];

function ForgotPass() {
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await dispatch(forgotPass(data));
    reset();
  };

  return (
    <div>
      <div className={styles.forgotPassTop}>
        <ImgLogo width={"7vw"} height={"4vw"} />
      </div>
      <div className={styles.containerForgotPass}>
        <img
          className={styles.imgTroubleloggingin}
          src="src/assets/icons/imgTroubleloggingin_.png"
          alt="images"
        />
        <h3>Trouble logging in?</h3>
        <h4 className={styles.textGrey}>
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </h4>
        <form className={styles.forma}
        onSubmit={handleSubmit(onSubmit)}>
          <InputUniversal arr={passFogot} control={control} errors={errors} />
          <Btn
            htmlType={"submit"}
            widthBtn={"100%"}
            titleBtn={"Reset your password"}
          />
        </form>
        {(error || successMessage) && (
          <h5 className={error ? styles.serverError : styles.sucessError}>{error || "Success! Please check your email."}</h5>
        )}

        <OrElement />
        <Link className={styles.link}
        to="/register" >Create new account</Link>
      </div>
       <div className={styles.bottomCont}>
        <Link className={styles.link}
        to="/login">Back to login</Link>
      </div>
     
    </div>
  );
}
export default ForgotPass;
