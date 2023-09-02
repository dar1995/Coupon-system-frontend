import { MenuItem, MenuList } from "@mui/material";
import "./CustomerAccountMenu.css";
import { Link } from "react-router-dom";
import { RiLogoutCircleLine, RiCoupon3Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
function CustomerAccountMenu(): JSX.Element {
  return (
    <div className="CustomerAccountMenu">
      <MenuList className="CompanyAccountMenu AccountMenu">
        <MenuItem>
          <Link to={"profile"}>
            <FaRegUser />
            My profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"coupons"}>
            {" "}
            <RiCoupon3Fill />
            My coupons
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/logout"}>
            <RiLogoutCircleLine />
            Logout
          </Link>
        </MenuItem>
      </MenuList>
    </div>
  );
}

export default CustomerAccountMenu;
