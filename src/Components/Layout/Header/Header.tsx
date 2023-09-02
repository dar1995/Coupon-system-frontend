import SecondBar from "../../HeaderComponents/SecondBar/SecondBar";
import FirstBar from "../../HeaderComponents/firstBar/firstBar";
import "./Header.css";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <FirstBar />
      <SecondBar />
    </div>
  );
}

export default Header;
