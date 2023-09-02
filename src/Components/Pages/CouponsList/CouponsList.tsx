import { useState, useEffect } from "react";
import "./CouponsList.css";
import { CouponModel } from "../../../Models/CouponModel";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../../Redux/Store";
import { gotAllGeneralCouponsAction } from "../../../Redux/GeneralCouponsAppState";
import webApiService from "../../../Services/WebApiService";
import SearchCoupon from "../../Coupon/SearchCoupon/SearchCoupon";

function CouponsList(): JSX.Element {
  const [couponDisplay, setCouponDisplay] = useState<CouponModel[]>(
    store.getState().generalCouponsReducer.coupons
  );
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (couponDisplay.length > 0) {
      return;
    }
    webApiService
      .getAllGeneralCoupons()
      .then((res) => {
        setCouponDisplay(res.data);
        dispatch(gotAllGeneralCouponsAction(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="CouponsList">
      <div className="couponDisplayList"></div>
      <SearchCoupon
        coupons={couponDisplay}
        handelConfirmationOpen={() => {}}
        theme={theme}
        couponDisplayCard={true}
      />
    </div>
  );
}

export default CouponsList;
