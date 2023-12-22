export interface SidebarInterface {
  sidebar: boolean
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
}
