import { Link } from "react-router-dom";
import "./Purchase.css";

function Purchase(): JSX.Element {
  return (
    <div className="Purchase">
      <h1>Your coupon purchase was successful !</h1>
      <Link to={"/coupons"}>
        <button>continue shopping</button>
      </Link>
    </div>
  );
}

export default Purchase;
