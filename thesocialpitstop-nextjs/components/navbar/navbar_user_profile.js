import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { CLOUDFRONT_URL } from "../../constants/constants";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DropdownContent, DropdownContentLink, ProfileImage, ProfileSection } from "./navbar_user_profile.style";



const NavbarUserProfile = () => {
  const { user } = useUser();
  const userID = user?.sub.split("|")[1];
  const [src, setSrc] = useState(`${CLOUDFRONT_URL}/${userID}`);

  return (
    <ProfileSection>
      <ProfileImage
        src={src}
        width={50}
        height={50}
        onError={() => setSrc(`https://ui-avatars.com/api/?name=Yue+Hern`)}
      />
      <DropdownContent>
        <DropdownContentLink href="/profile">My Profile</DropdownContentLink>
        <DropdownContentLink href="/api/auth/logout">Logout</DropdownContentLink>
      </DropdownContent>

      <KeyboardArrowDownIcon />
    </ProfileSection>
  );
};

export default NavbarUserProfile;
