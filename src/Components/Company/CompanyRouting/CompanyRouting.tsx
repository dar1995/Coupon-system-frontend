import { Navigate, Route, Routes } from "react-router-dom";
import "./CompanyRouting.css";
import Coupons from "../../Coupon/Coupons/Coupons";
import AddCoupon from "../../Coupon/AddCoupon/AddCoupon";
import CompanyProfile from "../CompanyProfile/CompanyProfile";
import UpdateCoupon from "../../Coupon/UpdateCoupon/UpdateCoupon";

function CompanyRouting(): JSX.Element {
  return (
    <div className="CompanyRouting">
      <Routes>
        <Route path="/" element={<Navigate to="profile" />}></Route>
        <Route path="/profile" element={<CompanyProfile />}></Route>
        <Route path="/coupons" element={<Coupons />}></Route>
        <Route path="/add-coupon" element={<AddCoupon />}></Route>
        <Route path="/update-coupon/:id" element={<UpdateCoupon />}></Route>
      </Routes>
    </div>
  );
}

export default CompanyRouting;
