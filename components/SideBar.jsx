import SideBarHeader from '@/components/SideBarHeader';
import NavLinks from '@/components/NavLinks';
import MemberProfile from '@/components/MemberProfile';

const Sidebar = () => {
  return (
    <div className="px-4 w-80 min-h-full bg-base-200 py-12 grid grid-rows-[auto,1fr,auto]">
      <SideBarHeader />
      <NavLinks />
      <MemberProfile />
    </div>
  )
}

export default Sidebar;