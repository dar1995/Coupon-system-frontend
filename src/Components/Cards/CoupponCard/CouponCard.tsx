import { Link, useNavigate } from "react-router-dom";
import "./CouponCard.css";
import react, { useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../../Redux/Store";
import { ClientTypes } from "../../../Models/ClientType";
import webApiService from "../../../Services/WebApiService";
import { addedCouponAction } from "../../../Redux/CouponAppState";

interface CouponCardProps {
  coupon: CouponModel;
}

type symbols = "+" | "-";
function CouponCard(props: CouponCardProps): JSX.Element {
  const ilsSign = "\u20AA";
  const [showDetails, setShowDetails] = react.useState(false);
  const [iconType, setIconType] = react.useState<symbols>("+");
  const [isOpen, setOpen] = useState(false);
  const onClick = () => {
    setShowDetails(showDetails === false ? true : false);
    console.log(iconType);

    setIconType(iconType === "+" ? "-" : "+");
    console.log(typeof iconType);
  };

  const id = props.coupon.id;
  const clientType = useSelector((state: RootState) => state.guardReducer.user);
  const coupons = store.getState().couponsReducer.coupons;
  const [errormessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePurchase = () => {
    if (coupons.some((c) => c.id === id)) {
      setErrorMessage("Looks like you have already purchased this coupon :(");
      setOpen(true);
    } else {
      return webApiService
        .purchaseCoupons(id)
        .then((res) => {
          dispatch(addedCouponAction(res.data));
          navigate("/purchase");
        })
        .catch((err) => {
          err?.response
            ? setErrorMessage(err.response.data.description)
            : setErrorMessage("something went wrong");
          setOpen(true);
        });
    }
  };

  return (
    <div className="CouponCard">
      <div className="couponImg">
        <img src={props.coupon.image} alt={`coupon #${props.coupon.id}`} />
      </div>
      <div className="couponHighLights">
        <h2>{props.coupon.title}</h2>
        <h4>
          {props.coupon.price}
          {ilsSign}
        </h4>
        <p>{props.coupon.description}</p>
        <div className="purchaseButtonCon">
          {clientType === ClientTypes.CUSTOMER || clientType === null ? (
            clientType === null ? (
              <Link to={"/identity"}>
                <button className="purchaseButton">Purchase</button>
              </Link>
            ) : (
              <>
                <button onClick={handlePurchase} className="purchaseButton">
                  Purchase
                </button>
                {isOpen && <p className="errorSpan">{errormessage}</p>}
              </>
            )
          ) : null}
        </div>
        <button onClick={onClick}>
          Details
          <div className="symbolType">{iconType}</div>
        </button>
        {showDetails === true ? (
          <ul className="couponDetails">
            <li>coupon ID: {props.coupon.id}</li>
            <li>coupons left: {props.coupon.amount}</li>
            <li>category: {props.coupon.category}</li>
            <li>available from: {props.coupon.startDate?.toString()}</li>
            <li>available until: {props.coupon.endDate?.toString()}</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default CouponCard;
