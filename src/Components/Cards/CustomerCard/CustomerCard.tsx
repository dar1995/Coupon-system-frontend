import { useDispatch } from "react-redux";
import { CustomerModel } from "../../../Models/CustomerModel";
import "./CustomerCard.css";
import { useState } from "react";
import { setId } from "../../../Redux/DeleteIdAppState";
import userImage from "../../../assets/imageas/user-dwight-schrute.jpg";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Collapse } from "@mui/material";
import CouponDisplayCard from "../CoupponDisplayCard/CouponDisplayCard";
interface CustomerCardProps {
  customer: CustomerModel;
  openConfirmation: () => void;
}
function CustomerCard(props: CustomerCardProps): JSX.Element {
  const dispatch = useDispatch();
  const [isCouponDisplay, setCouponDisplay] = useState(false);
  const handleCouponDisplayOpen = () => setCouponDisplay(!isCouponDisplay);
  const handleOpen = () => {
    dispatch(setId(props.customer.id));
    props.openConfirmation();
  };

  return (
    <div className="CustomerCard">
      <div className="CustomerCardMain">
        <div className="firstRow">
          <img src={userImage} alt="user" />
          <button onClick={handleCouponDisplayOpen}>Coupons</button>
        </div>
        <div className="detailsRow">
          <h1>{`${props.customer.firstName} ${props.customer.lastName}`}</h1>
          <p>Id: {props.customer.id}</p>
          <p>Email: {props.customer.email}</p>
          <p>Password: {props.customer.password}</p>
        </div>
        <div className="buttonsRow">
          <Link to={`/admin/update-customer/${props.customer.id}`}>
            <FaEdit size={20} />
          </Link>
          <button onClick={handleOpen}>
            <MdDelete size={20} />
          </button>
        </div>
      </div>
      <Collapse in={isCouponDisplay}>
        <div className="customerCoupons">
          {props.customer.coupons?.length > 0 ? (
            props.customer.coupons.map((c, idx) => (
              <CouponDisplayCard
                key={`customer-coupon-card-${idx}`}
                coupon={c}
              />
            ))
          ) : (
            <p>No coupons</p>
          )}
        </div>
      </Collapse>
    </div>
  );
}

export default CustomerCard;
