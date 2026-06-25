import Btn from "../../components/button";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import InputUniversal from "../../components/input";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import ImgLogo from "../../components/imgLogo";
import { Link } from "react-router-dom";
import BottomContainer from "../../components/bottomContainer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  const { error, successMessage } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (successMessage !== null) {
      navigate("/login");
    }
  }, [successMessage, navigate]);

  const onSubmit = async (data) => {
    await dispatch(registerUser(data));
    reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.containTop}>
        <ImgLogo width={"13vw"} height={"7.4vw"} />
        <h3 className={styles.textCont}>
          Sign up to see photos and videos from your friends.
        </h3>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputUniversal
              arr={registerFields}
              control={control}
              errors={errors}
            />

            <div className={styles.linkWithText}>
              <p>
                People who use our service may have uploaded your contact
                information to Instagram.
                <Link className={styles.link} to="/learn-more">
                  {" "}
                  Learn More
                </Link>
              </p>

              <p>
                By signing up, you agree to our
                <Link className={styles.link} to="/terms">
                  {" "}
                  Terms
                </Link>
                ,
                <Link className={styles.link} to="/privacy">
                  {" "}
                  Privacy Policy{" "}
                </Link>
                and
                <Link className={styles.link} to="/cookies">
                  {" "}
                  Cookies Policy
                </Link>
                .
              </p>
            </div>
            <Btn titleBtn={"Sign up"} htmlType={"submit"} widthBtn={"100%"} />
            {error && <h5 className={styles.serverError}>{error}</h5>}
          </form>
        </div>
      </div>
      <BottomContainer
        text={"Have an account? "}
        to={"/login"}
        title={"Log in "}
      />
    </div>
  );
}
export default Registration;
