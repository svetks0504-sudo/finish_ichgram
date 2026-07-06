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
        <PostModal />
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
