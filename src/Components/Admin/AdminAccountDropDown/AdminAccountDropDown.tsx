import { MenuItem, MenuList } from "@mui/material";
import "./AdminAccountDropDown.css";
import { Link } from "react-router-dom";
import { BsFillBuildingsFill, BsBuildingFillAdd } from "react-icons/bs";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";

function AdminAccountDropDown(): JSX.Element {
  return (
    <MenuList className="AdminAccountDropDown">
      <MenuItem className="nameMI">
        <span>Hello Boss</span>
      </MenuItem>
      <MenuItem>
        <Link to={"/admin/companies"}>
          <BsFillBuildingsFill />
          Companies
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to={"/admin/customers"}>
          {" "}
          <FaUsers />
          Customers
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to={"/admin/add-company"}>
          <BsBuildingFillAdd />
          Add company
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to={"/admin/add-customer"}>
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

export default AdminAccountDropDown;
