import { MenuItem, MenuList } from "@mui/material";
import "./CustomerAccountDropDown.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { Link } from "react-router-dom";
import { RiLogoutCircleLine, RiCoupon3Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

function CustomerAccountDropDown(): JSX.Element {
  const customer = useSelector((state: RootState) => state.userReducer.user);
  return (
    <div className="CustomerAccountDropDown">
      <MenuList className="CompanyAccountDropDown">
        <MenuItem className="nameMI">
          <span>Hello {customer.name}</span>
        </MenuItem>
        <MenuItem>
          <Link to={"/customer/profile"}>
            <FaRegUser />
            My profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/customer/coupons"}>
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

export default CustomerAccountDropDown;
