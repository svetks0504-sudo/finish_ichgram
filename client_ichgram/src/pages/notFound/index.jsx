import styles from "./styles.module.css";
import background from "../../assets/icons/background.png";

function NotFound() {
  return (
    <div className={styles.notFound}>
        <img className={styles.imgNotFound} 
       src={background}
        alt="images"/>
      <div className={styles.right}>
        <h6>Oops! Page Not Found (404 Error)</h6>
        <h3 className={styles.greyText}>
          We're sorry, but the page you're looking for doesn't seem to exist. If
          you typed the URL manually, please double-check the spelling. If you
          clicked on a link, it may be outdated or broken.
        </h3>
      </div>
    </div>
  );
}
export default NotFound;
