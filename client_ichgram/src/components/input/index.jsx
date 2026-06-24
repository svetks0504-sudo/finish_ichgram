import { Input } from "antd";
import styles from "./styles.module.css";

function InputUniversal({ arr, register, errors }) {
  return (
    <div className={styles.inputsContainer}>
      {arr.map((elem) => (
        <div key={elem.name}>
          <Input
            placeholder={elem.placeholder}
            type={elem.type}
            {...register(elem.name, elem.rules)}
          />
          {errors[elem.name] && (
            <p className={styles.error}>{errors[elem.name].message}</p>
          )}
        </div>
      ))}
    </div>
  );
}
export default InputUniversal;
