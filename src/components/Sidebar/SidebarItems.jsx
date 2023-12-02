import SidebarCreate from "./SidebarCreate.jsx"
import SidebarHome from "./SidebarHome.jsx"
import SidebarNotification from "./SidebarNotification.jsx"
import SidebarProfile from "./SidebarProfile.jsx"
import SidebarSearch from "./SidebarSearch.jsx"

const SidebarItems = () => {
  return (
    <>
        <SidebarHome/>
        <SidebarSearch />
        <SidebarNotification />
        <SidebarCreate />
        <SidebarProfile />
    </>
  )
}

export default SidebarItems