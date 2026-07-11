import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";
import MenuLeft from "../menuLeft";
import Footer from "../footer";
import { useState } from "react";
import SearchPanel from "../../components/searchPanel";
import NotificationsPanel from "../../components/notificationsPanel";
import CreateModal from "../createModal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../redux/slices/postSlice.js";
import PostModal from "../../components/postModal";

function Layout({ manuArr }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const [activePanel, setActivePanel] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState("home");

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <MenuLeft
          arr={manuArr}
          setActivePanel={setActivePanel}
          setIsCreateOpen={setIsCreateOpen}
          activeMenuKey={activeMenuKey}
          setActiveMenuKey={setActiveMenuKey}
        />

        <div className={styles.content}>
          <Outlet />
        
        {activePanel === "search" && (
          <SearchPanel setActivePanel={setActivePanel} />
        )}
        {activePanel === "notifications" && (
          <NotificationsPanel setActivePanel={setActivePanel} />
        )}
        <CreateModal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
        <PostModal />
        </div>
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
