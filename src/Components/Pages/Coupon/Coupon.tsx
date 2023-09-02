import { useState, useEffect } from "react";
import "./Coupon.css";
import { useParams } from "react-router-dom";
import CouponCard from "../../Cards/CoupponCard/CouponCard";
import { CouponModel } from "../../../Models/CouponModel";
import webApiService from "../../../Services/WebApiService";
import EmptyView from "../EmptyView/EmptyView";

function Coupon(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel>();
  const [showEmptyView, setEmptyView] = useState(false);
  const params = useParams();
  const id = +(params.id || 0);
  useEffect(() => {
    setTimeout(() => {
      setEmptyView(true);
    }, 1000);
    webApiService
      .getSingleGeneralCoupon(id)
      .then((res) => {
        setCoupon(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="Coupon">
      {coupon !== undefined ? (
        <CouponCard coupon={coupon} />
      ) : (
        showEmptyView && <EmptyView title="No coupons founds" />
      )}
    </div>
  );
}

export default Coupon;
