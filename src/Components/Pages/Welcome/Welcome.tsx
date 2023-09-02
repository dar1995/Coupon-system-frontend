import { useSelector } from "react-redux";
import "./Welcome.css";
import { RootState } from "../../../Redux/Store";
function Welcome(): JSX.Element {
  const name = useSelector(
    (state: RootState) => state.userReducer.user.name
  ).toUpperCase();
  return (
    <div className="Welcome">
      <div className="welcomeContainer">
        <h1>WELCOME TO COUPLA {name}!</h1>
        <h3>Elevate Savings, Elevate Life: Your Coupon Oasis</h3>
      </div>
    </div>
  );
}

export default Welcome;
