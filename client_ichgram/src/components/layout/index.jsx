import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";
import Menu from "../menu"
import Footer from "../footer";

function Layout() {
  return (
    <div className={styles.layout}>
      <main>
        <Menu />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
