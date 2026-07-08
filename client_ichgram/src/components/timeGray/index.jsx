import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import styles from "./styles.module.css";

  dayjs.extend(relativeTime);
  dayjs.locale("en");

  function TimeGray({elem}){
    return(
        <p className={styles.greyTime}>
                      {dayjs(elem.createdAt).fromNow(true)}
                    </p>
    )
  }

  export default TimeGray;