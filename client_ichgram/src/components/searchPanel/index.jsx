import { Drawer } from "antd";

function SearchPanel({setActivePanel}){
    return(
       <Drawer
      title="Search"
      open={true}
      onClose={() => setActivePanel(null)}
    ></Drawer>
    )
}

export default SearchPanel;