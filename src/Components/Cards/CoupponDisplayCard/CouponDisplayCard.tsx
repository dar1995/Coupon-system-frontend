import { Link } from "react-router-dom";
import "./CouponDisplayCard.css";
import { CouponModel } from "../../../Models/CouponModel";
interface CouponDisplayCardProps {
  coupon: CouponModel;
}
function CouponDisplayCard(props: CouponDisplayCardProps): JSX.Element {
  const ilsSign = "\u20AA";

  return (
    <div className="CouponDisplayCard">
      <Link to={`/coupons/${props.coupon.id}`}>
        <img src={props.coupon.image} alt="Coupons Image" />
        <div className="couponDisplayDetails">
          <p className="couponsDisplayTitle">{props.coupon.title}</p>
          <p className="couponDisplayPrice">
            {props.coupon.price}
            {ilsSign}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default CouponDisplayCard;
