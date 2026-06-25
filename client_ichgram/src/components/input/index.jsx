import { Input } from "antd";
import styles from "./styles.module.css";
import { Controller } from "react-hook-form";

function InputUniversal({ arr, control, errors }) {
  return (
    <div className={styles.inputsContainer}>
      {arr.map((elem) => (
        <div key={elem.name}>
          <Controller
          name={elem.name}
          control={control}
          rules={elem.rules}
          render={({field}) => (
          <Input
            className={styles.inputGray}
            placeholder={elem.placeholder}
            type={elem.type}
            {...field}
          />
          )}
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
