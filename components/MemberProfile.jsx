import { UserButton, currentUser, auth } from '@clerk/nextjs';
import { fetchOrGenerateTokens } from '@/utils/actions';
// import LanguageToggle from '@/components/LanguageToggle';


const MemberProfile = async () => {
  const user = await currentUser();
  const { userId } = auth();
  await fetchOrGenerateTokens(userId);
  return (
    <div>
      {/* <LanguageToggle /> */}
      <div className="px-4 flex items-center gap-2">
        <UserButton afterSignOutUrl='/' />
        <p className="text-xs">{user.emailAddresses[0].emailAddress}</p>
      </div>
    </div>
  )
}

export default MemberProfile;