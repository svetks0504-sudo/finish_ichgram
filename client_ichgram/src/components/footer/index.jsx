import styles from "./styles.module.css";
import { Link } from "react-router-dom";

function Footer({ arr }) {
  return (
    <div className={styles.containerFoot}>
      <div className={styles.linksContainrt}>
        {arr.map((elem) => (
          <Link className={styles.link}
          key={elem.title}
          to={elem.link}>{elem.title}</Link>
        ))}
      </div>
      <h4>© 2024 ICHgram</h4>
    </div>
  );
}

export default Footer;
