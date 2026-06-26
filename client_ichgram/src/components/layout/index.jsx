import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";
import MenuLeft from "../menuLeft";
import Footer from "../footer";
import { useState } from "react";
import SearchPanel from "../../components/searchPanel";
import NotificationsPanel from "../../components/notificationsPanel";
import CreateModal from "../createModal";

function Layout({ manuArr }) {
  const [activePanel, setActivePanel] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState("home");
  return (
    <div className={styles.layout}>
      <main>
        <MenuLeft
          arr={manuArr}
          setActivePanel={setActivePanel}
          setIsCreateOpen={setIsCreateOpen}
          activeMenuKey={activeMenuKey}
          setActiveMenuKey={setActiveMenuKey}
        />
        <Outlet />
        {activePanel === "search" && <SearchPanel />}
        {activePanel === "notifications" && <NotificationsPanel />}
        <CreateModal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      </main>
      <Footer
        arr={manuArr}
        setActivePanel={setActivePanel}
        setIsCreateOpen={setIsCreateOpen}
        activeMenuKey={activeMenuKey}
        setActiveMenuKey={setActiveMenuKey}
      />
    </div>
  );
}

export default Layout;
