import { CompanyModel } from "../../../Models/CompanyModel";
import "./CompanyCard.css";
import office from "../../../assets/imageas/office.jpg";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Collapse } from "@mui/material";
import CouponDisplayCard from "../CoupponDisplayCard/CouponDisplayCard";
import { useDispatch } from "react-redux";
import { setId } from "../../../Redux/DeleteIdAppState";
interface CompanyCardProps {
  company: CompanyModel;
  openConfirmation: () => void;
}
function CompanyCard(props: CompanyCardProps): JSX.Element {
  const dispatch = useDispatch();
  const [isCouponDisplay, setCouponDisplay] = useState(false);
  const handleCouponDisplayOpen = () => setCouponDisplay(!isCouponDisplay);
  const handleOpen = () => {
    dispatch(setId(props.company.id));
    props.openConfirmation();
  };

  return (
    <div className="CompanyCard">
      <div className="CompanyCardMain">
        <div className="firstRow">
          <img src={office} alt="office" />
          <button onClick={handleCouponDisplayOpen}>Coupons</button>
        </div>
        <div className="detailsRow">
          <h1>{props.company.name}</h1>
          <p>Id: {props.company.id}</p>
          <p>Email: {props.company.email}</p>
          <p>Password: {props.company.password}</p>
        </div>
        <div className="buttonsRow">
          <Link to={`/admin/update-company/${props.company.id}`}>
            <FaEdit size={20} />
          </Link>
          <button onClick={handleOpen}>
            <MdDelete size={20} />
          </button>
        </div>
      </div>
      <Collapse in={isCouponDisplay}>
        <div className="companyCoupons">
          {props.company.coupons?.length > 0 ? (
            props.company.coupons.map((c, idx) => (
              <CouponDisplayCard
                key={`company-coupon-card-${idx}`}
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

export default CompanyCard;
