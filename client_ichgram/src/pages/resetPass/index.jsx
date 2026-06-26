import InputUniversal from "../../components/input";
import Btn from "../../components/button";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPass } from "../../redux/slices/authSlice";
import { useEffect } from "react";
import styles from "./styles.module.css";
import ImgLogo from "../../components/imgLogo";
import BottomContainer from "../../components/bottomContainer";

function ResetPass() {
  const resetPassArray = [
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      rules: {
        required: "Password is required",
      },
    },
    {
      name: "passwordRepeat",
      type: "password",
      placeholder: "Repeat password",
      rules: {
        required: "Please repeat your password",
        validate: (value) =>
          value === watch("password") || "Password do not match",
      },
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (successMessage !== null) {
      navigate("/login");
    }
  }, [successMessage, navigate]);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async (data) => {
    const dataServer = {
      password: data.password,
      passwordRepeat: data.passwordRepeat,
      token,
    };
    await dispatch(resetPass(dataServer));
    reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.resetContainer}>
        <ImgLogo />
        <h3>Reset your password</h3>
        <p className={styles.textGrey}>Enter your new password below.</p>
        <form className={styles.forma} onSubmit={handleSubmit(onSubmit)}>
          <InputUniversal
            arr={resetPassArray}
            control={control}
            errors={errors}
          />
          <Btn htmlType={"submit"} titleBtn={"Save new password"} />
        </form>
        {error && <h5 className={styles.serverError}>{error}</h5>}
      </div>
      <BottomContainer
        text={"Remember your password?"}
        to={"/login"}
        title={"Log in"}
      />
    </div>
  );
}
export default ResetPass;
