import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function BottomContainer({ text, to, title }) {
  return (
    <div className={styles.bottomContainer}>
      <h4>{text}</h4>
      <Link style={{fontSize:"1.2rem"}}
      className={styles.linkSign} to={to}>
        {title}
      </Link>
    </div>
  );
}
export default BottomContainer;
