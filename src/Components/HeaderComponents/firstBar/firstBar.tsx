import "./firstBar.css";
import { FaRegUser, FaSearch } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import MyLogo from "../../MyStyles/MyLogo/MyLogo";
import MyAccountDropDown from "../MyAccountDropDown/MyAccountDropDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { setTheme } from "../../../Redux/ThemeAppState";
import { ClientTypes } from "../../../Models/ClientType";

function FirstBar(): JSX.Element {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const dispatch = useDispatch();
  const changeTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };
  const dropDownAnchorRef = useRef(null);
  const [isAccountDropDownOpen, setAccountDropDown] = useState(false);
  const handleAccountDropDownOpen = () => {
    setAccountDropDown(true);
  };
  const handleAccountDropDownClose = () => {
    setAccountDropDown(false);
  };

  const user = useSelector((state: RootState) => state.guardReducer.user);

  return (
    <div className="firstBar">
      <MyLogo></MyLogo>
      <div className="searchInput">
        <input type="text" placeholder="Search for coupons" />
        <button className="searchButton">
          <FaSearch />
        </button>
      </div>
      <div className="headerButtons">
        <div
          className="myAccount-icon"
          onMouseEnter={handleAccountDropDownOpen}
          onMouseLeave={handleAccountDropDownClose}
        >
          <button ref={dropDownAnchorRef}>
            {user === null ? (
              <Link className="userIcon" to={"/identity"}>
                <FaRegUser />
              </Link>
            ) : user === ClientTypes.ADMIN ? (
              <Link className="userIcon" to={"/admin"}>
                <FaRegUser />
              </Link>
            ) : user === ClientTypes.COMPANY ? (
              <Link className="userIcon" to={"/company"}>
                <FaRegUser />
              </Link>
            ) : (
              <Link className="userIcon" to={"/customer"}>
                <FaRegUser />
              </Link>
            )}
          </button>
          <MyAccountDropDown
            open={isAccountDropDownOpen}
            anchorRef={dropDownAnchorRef}
          />
        </div>
        <button onClick={changeTheme}>
          {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
        </button>
      </div>
    </div>
  );
}

export default FirstBar;
