import ProfileMain from "../ProfileMain/ProfileMain";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import "./Profile.css";

function Profile(): JSX.Element {
  return (
    <div className="Profile">
      <ProfileMenu />
      <ProfileMain />
    </div>
  );
}

export default Profile;
