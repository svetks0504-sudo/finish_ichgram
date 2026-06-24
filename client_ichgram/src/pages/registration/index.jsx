import Btn from "../../components/button";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import InputUniversal from "../../components/input";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";

const registerFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    rules: {
      required: "Email is required",
    },
  },
  {
    name: "fullName",
    type: "text",
    placeholder: "Full name",
    rules: {
      required: "Full name is required",
    },
  },
  {
    name: "username",
    type: "text",
    placeholder: "Username",
    rules: {
      required: "Username is required",
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

function Registration() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await dispatch(registerUser(data));
    reset();
  };

  return (
    <div className={styles.container}>
     
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputUniversal
            arr={registerFields}
            register={register}
            errors={errors}
          />

          <Btn titleBtn="Sign up" htmlType="submit" />
        </form>
      </div>
    </div>
  );
}
export default Registration;
