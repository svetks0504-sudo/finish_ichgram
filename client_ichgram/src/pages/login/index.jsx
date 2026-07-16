import styles from "./styles.module.css";
import InputUniversal from "../../components/input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import Btn from "../../components/button";
import OrElement from "../../components/orElement";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ImgLogo from "../../components/imgLogo";
import BottomContainer from "../../components/bottomContainer";
import  background from "../../assets/icons/background.png";

const loginFields = [
  {
    name: "login",
    type: "text",
    placeholder: "Username or email",
    rules: {
      required: "Username or email is required",
      minLength: {
        value: 3,
        message: "Min 3 characters",
      },
    },
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    rules: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Min 6 characters",
      },
    },
  },
];

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    await dispatch(loginUser(data));
    reset();
  };
  return (
    <div className={styles.container}>
      <img
        className={styles.loginImg}
        src= {background}
        alt="icons"
      />
      <div className={styles.rightContainer}>
        <div className={styles.formContainer}>
          <ImgLogo width={"13vw"} height={"7.4vw"} />
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputUniversal
              arr={loginFields}
              control={control}
              errors={errors}
            />
            <Btn titleBtn={"Log in"} htmlType={"submit"} />
            {error && <h5 className={styles.serverError}>{error}</h5>}
          </form>
          <OrElement />
          <Link className={styles.link} to="/forgot-password">
            Forgot password?
          </Link>
        </div>
        <BottomContainer
          text={"Don't have an account? "}
          to={"/register"}
          title={"Sign up"}
        />
      </div>
    </div>
  );
}
export default Login;
