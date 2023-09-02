import { useDispatch } from "react-redux";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearAllCompanies } from "../../../Redux/CompanyAppState";
import { clearAllCustomers } from "../../../Redux/CustomerAppState";
import { clearId } from "../../../Redux/DeleteIdAppState";
import { loggedOut } from "../../../Redux/GuardAppState";
import { userLoggedOut } from "../../../Redux/UserAppState";
import { clearAllCoupons } from "../../../Redux/CouponAppState";

function Logout(): JSX.Element {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearAllCompanies());
    dispatch(clearAllCustomers());
    dispatch(clearId());
    dispatch(loggedOut());
    dispatch(userLoggedOut());
    dispatch(clearAllCoupons());
    navigate("/home");
  });
  return <></>;
}

export default Logout;
