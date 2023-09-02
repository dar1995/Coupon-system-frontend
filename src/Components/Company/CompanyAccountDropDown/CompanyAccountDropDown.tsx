import { MenuItem, MenuList } from "@mui/material";
import "./CompanyAccountDropDown.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { Link } from "react-router-dom";
import { RiLogoutCircleLine, RiCoupon3Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";

function CompanyAccountDropDown(): JSX.Element {
  const company = useSelector((state: RootState) => state.userReducer.user);
  return (
    <MenuList className="CompanyAccountDropDown">
      <MenuItem className="nameMI">
        <span>Hello {company.name}</span>
      </MenuItem>
      <MenuItem>
        <Link to={"/company/profile"}>
          <FaRegUser />
          My profile
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to={"/company/coupons"}>
          {" "}
          <RiCoupon3Fill />
          My coupons
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to={"/company/add-coupon"}>
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

export default CompanyAccountDropDown;
