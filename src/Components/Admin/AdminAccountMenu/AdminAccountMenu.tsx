import { MenuItem, MenuList } from "@mui/material";
import "./AdminAccountMenu.css";
import { Link } from "react-router-dom";
import { BsFillBuildingsFill, BsBuildingFillAdd } from "react-icons/bs";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
function AdminAccountMenu(): JSX.Element {
  return (
    <MenuList className="AdminAccountMenu AccountMenu">
      <MenuItem>
        <Link to={"companies"}>
          <BsFillBuildingsFill />
          Companies
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to={"customers"}>
          {" "}
          <FaUsers />
          Customers
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to={"add-company"}>
          <BsBuildingFillAdd />
          Add company
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to={"add-customer"}>
          <FaUserPlus />
          Add customer
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

export default AdminAccountMenu;
