import styles from "./styles.module.css";
import InputUniversal from "../../components/input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import Btn from "../../components/button";

const loginFields = [
  {
    name: "username",
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await dispatch(loginUser(data));
    reset();
  };
  return (
    <div className={styles.container}>
      <img
        className={styles.loginImg}
        src="src/assets/images/background.png"
        alt="icons"
      />
      <div className={styles.formContainer}>
        <form className={styles.form}
        onSubmit={handleSubmit(onSubmit)}>
          <InputUniversal
            arr={loginFields}
            register={register}
            errors={errors}
          />

          <Btn
           titleBtn="Log in" 
           htmlType="submit" />
        </form>
      </div>
    </div>
  );
}
export default Login;
