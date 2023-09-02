import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import App from "../../../App";
import Home from "../../Pages/Home/Home";
import About from "../../Pages/About/About";
import Page404 from "../../Pages/Page404/Page404";
import CouponsList from "../../Pages/CouponsList/CouponsList";
import Coupon from "../../Pages/Coupon/Coupon";
import Purchase from "../../Pages/Purchase/Purchase";
import AuthMenu from "../../Auth/AuthMenu/AuthMenu";
import Welcome from "../../Pages/Welcome/Welcome";
import Profile from "../../ProfileLayout/Profile/Profile";
import Logout from "../../Auth/Logout/Logout";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { ClientTypes } from "../../../Models/ClientType";

function Routing(): JSX.Element {
  const client = useSelector((state: RootState) => state.guardReducer.user);
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/coupons" element={<CouponsList />} />
        <Route path="/coupons/:id" element={<Coupon />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/identity/*" element={<AuthMenu />} />
        {client === ClientTypes.ADMIN && (
          <Route path="/admin/*" element={<Profile />} />
        )}
        {client === ClientTypes.COMPANY && (
          <Route path="/company/*" element={<Profile />} />
        )}
        <Route path="/customer/*" element={<Profile />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default Routing;
