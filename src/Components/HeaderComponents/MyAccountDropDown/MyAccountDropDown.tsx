import { Collapse, Fade, Popper } from "@mui/material";
import "./MyAccountDropDown.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import UserAccountDropDown from "../UserAccountDropDown/UserAccountDropDown";
import AdminAccountDropDown from "../../Admin/AdminAccountDropDown/AdminAccountDropDown";
import { ClientTypes } from "../../../Models/ClientType";
import CompanyAccountDropDown from "../../Company/CompanyAccountDropDown/CompanyAccountDropDown";
import CustomerAccountDropDown from "../../Customer/CustomerAccountDropDown/CustomerAccountDropDown";

interface MyAccountDropDownProps {
  open: boolean;
  anchorRef: React.MutableRefObject<null>;
}

function MyAccountDropDown({
  open,
  anchorRef,
}: MyAccountDropDownProps): JSX.Element {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const user = useSelector((state: RootState) => state.guardReducer.user);

  return (
    <Popper
      className={`MyAccountDropDown ${theme}`}
      open={true}
      anchorEl={anchorRef.current}
    >
      <Collapse in={open} className="">
        <Fade in={open} timeout={300}>
          <span className="tip"></span>
        </Fade>
        {user === null ? (
          <UserAccountDropDown />
        ) : user === ClientTypes.ADMIN ? (
          <AdminAccountDropDown />
        ) : user === ClientTypes.COMPANY ? (
          <CompanyAccountDropDown />
        ) : (
          <CustomerAccountDropDown />
        )}
      </Collapse>
    </Popper>
  );
}

export default MyAccountDropDown;
