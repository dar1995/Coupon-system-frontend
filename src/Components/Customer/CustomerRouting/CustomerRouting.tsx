import { Navigate, Route, Routes } from "react-router-dom";
import "./CustomerRouting.css";
import Coupons from "../../Coupon/Coupons/Coupons";
import CustomerProfile from "../CustomerProfile/CustomerProfile";

function CustomerRouting(): JSX.Element {
  return (
    <div className="CustomerRouting">
      <Routes>
        <Route path="/" element={<Navigate to="profile" />}></Route>
        <Route path="/profile" element={<CustomerProfile />}></Route>
        <Route path="/coupons" element={<Coupons />}></Route>
      </Routes>
    </div>
  );
}

export default CustomerRouting;
