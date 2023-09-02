import { Link } from "react-router-dom";
import "./SecondBar.css";

function SecondBar(): JSX.Element {
  return (
    <div className="SecondBar">
      <div className="selectors">
        <Link to={"/Coupons"}>Coupons</Link>
      </div>
    </div>
  );
}

export default SecondBar;
