import "./MyLogo.css";
import logoLight from "../../../assets/imageas/newLogo.png";
import logoDark from "../../../assets/imageas/newLogoDark2.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
function MyLogo(): JSX.Element {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);

  return (
    <div className="MyLogo">
      <Link to={"/home"}>
        <img src={theme === "light" ? logoLight : logoDark} alt="logo" />
      </Link>
    </div>
  );
}

export default MyLogo;
