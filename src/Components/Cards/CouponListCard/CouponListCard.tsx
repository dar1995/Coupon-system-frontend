import { Link } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import "./CouponListCard.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../../../Redux/DeleteIdAppState";
import { RootState } from "../../../Redux/Store";
import { ClientTypes } from "../../../Models/ClientType";
interface CouponListCardProps {
  coupon: CouponModel;
  openConfirmation: () => void;
}
function CouponListCard(props: CouponListCardProps): JSX.Element {
  const ilsSign = "\u20AA";
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.guardReducer.user);
  const handleOpen = () => {
    dispatch(setId(props.coupon.id));
    props.openConfirmation();
  };
  return (
    <div className="CouponListCard">
      <div className="couponTitle">
        <h1>{props.coupon.title}</h1>
      </div>
      <div className="couponDetails">
        <div className="imgCul">
          {user === ClientTypes.COMPANY ? (
            <div className="buttonsRow">
              <Link to={`/company/update-coupon/${props.coupon.id}`}>
                <FaEdit size={20} />
              </Link>
              <button onClick={handleOpen}>
                <MdDelete size={20} />
              </button>
            </div>
          ) : null}

          <img src={props.coupon.image} alt="office" />
        </div>
        <div className="couponsDetailsCon">
          <div className="detailsFirstCul">
            <p>{props.coupon.description}</p>
            <p>Id: {props.coupon.id}</p>
            <p>
              Price: {props.coupon.price}
              {ilsSign}
            </p>
            <p>Category: {props.coupon.category}</p>
          </div>
          <div className="detailsSecondCul">
            <p>Amount: {props.coupon.amount}</p>
            <p>Start date: {props.coupon.startDate?.toString()}</p>
            <p>End date: {props.coupon.endDate?.toString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponListCard;
