import { MenuItem, MenuList } from "@mui/material";
import "./UserAccountDropDown.css";
import { Link } from "react-router-dom";
import { RiLoginCircleLine } from "react-icons/ri";

function UserAccountDropDown(): JSX.Element {
  return (
    <MenuList className="UserAccountDropDown">
      <MenuItem className="authRow">
        <RiLoginCircleLine />
        <div className="authLinks">
          <Link className="loginDrop-Down" to={"/identity/login"}>
            Sign in
          </Link>
          <span>|</span>
          <Link className="registerDrop-Down" to={"/identity/register"}>
            Join
          </Link>
        </div>
      </MenuItem>
    </MenuList>
  );
}

export default UserAccountDropDown;
