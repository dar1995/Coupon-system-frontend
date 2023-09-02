import { MenuItem, MenuList } from "@mui/material";
import "./CompanyAccountMenu.css";
import { Link } from "react-router-dom";
import { RiLogoutCircleLine, RiCoupon3Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
function CompanyAccountMenu(): JSX.Element {
  return (
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
        <Link to={"add-coupon"}>
          <MdAddCircle />
          Add coupon
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to={"/logout"}>
          <RiLogoutCircleLine />
          Logout
        </Link>
      </MenuItem>
    </MenuList>
  );
}

export default CompanyAccountMenu;
