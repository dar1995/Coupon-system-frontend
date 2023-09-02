import { useEffect, useState } from "react";
import "./Home.css";
import CouponDisplayCard from "../../Cards/CoupponDisplayCard/CouponDisplayCard";
import { CouponModel } from "../../../Models/CouponModel";
import webApiService from "../../../Services/WebApiService";
import EmptyView from "../EmptyView/EmptyView";

function Home(): JSX.Element {
  const [couponDisplay, setCouponDisplay] = useState<CouponModel[]>([]);
  const [showEmptyView, setEmptyView] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setEmptyView(true);
    }, 1000);
    webApiService
      .getRandomCoupons()
      .then((res) => {
        setCouponDisplay(res.data);
        console.log(res.data);
        console.log(couponDisplay);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Home">
      {couponDisplay.length > 0 ? (
        <div className="validHome">
          <h1>OUR HOTTEST DEALS!!</h1>
          <img
            src="C:\\Users\\darge\\Downloads\\the office chrismas.jpg"
            alt=""
          />
          <div className="dealCoupons">
            {couponDisplay.map((c, idx) => (
              <CouponDisplayCard
                key={`coupon-display-card-${idx}`}
                coupon={c}
              />
            ))}
          </div>
        </div>
      ) : (
        showEmptyView && <EmptyView title="No coupons founds" />
      )}
    </div>
  );
}

export default Home;
