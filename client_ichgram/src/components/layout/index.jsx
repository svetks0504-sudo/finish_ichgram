import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";
import MenuLeft from "../menuLeft";
import Footer from "../footer";



function Layout({manuArr}) {
  return (
    <div className={styles.layout}>
      <main>
        <MenuLeft arr={manuArr}/>
        <Outlet />
      </main>
      <Footer arr={manuArr}/>
    </div>
  );
}

export default Layout;
