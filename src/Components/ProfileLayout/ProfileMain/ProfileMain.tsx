import { Outlet } from "react-router-dom";
import AdminRouting from "../../Admin/AdminRouting/AdminRouting";
import "./ProfileMain.css";
import CompanyRouting from "../../Company/CompanyRouting/CompanyRouting";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { ClientTypes } from "../../../Models/ClientType";
import CustomerRouting from "../../Customer/CustomerRouting/CustomerRouting";

function ProfileMain(): JSX.Element {
  const client = useSelector((state: RootState) => state.guardReducer.user);
  return (
    <div className="ProfileMain">
      {client === ClientTypes.ADMIN ? (
        <AdminRouting />
      ) : client === ClientTypes.COMPANY ? (
        <CompanyRouting />
      ) : client === ClientTypes.CUSTOMER ? (
        <CustomerRouting />
      ) : null}
      <Outlet />
    </div>
  );
}

export default ProfileMain;
