import CopyRights from "../../FooterComponents/CopyRights/CopyRights";
import FollowUs from "../../FooterComponents/FollowUs/FollowUs";
import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <div className="Footer">
      <FollowUs />
      <CopyRights />
    </div>
  );
}

export default Footer;
