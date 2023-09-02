import { useSelector } from "react-redux";
import "./ProfileMenu.css";
import { RootState } from "../../../Redux/Store";
import { ClientTypes } from "../../../Models/ClientType";
import AdminAccountMenu from "../../Admin/AdminAccountMenu/AdminAccountMenu";
import CompanyAccountMenu from "../../Company/CompanyAccountMenu/CompanyAccountMenu";
import CustomerAccountMenu from "../../Customer/CustomerAccountMenu/CustomerAccountMenu";

function ProfileMenu(): JSX.Element {
  const user = useSelector((state: RootState) => state.guardReducer.user);
  return (
    <div className="ProfileMenu">
      {user === ClientTypes.ADMIN ? (
        <AdminAccountMenu />
      ) : user === ClientTypes.COMPANY ? (
        <CompanyAccountMenu />
      ) : user === ClientTypes.CUSTOMER ? (
        <CustomerAccountMenu />
      ) : null}
    </div>
  );
}

export default ProfileMenu;
