import { Box, Button, Paper } from "@mui/material";
import "./AuthMenu.css";
import { useState } from "react";
import { StyledAuthMenu } from "../../MyStyles/StyledAuthMenu";
import Login from "../Login/Login";
import MyLogo from "../../MyStyles/MyLogo/MyLogo";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import Register from "../Register/Register";

function AuthMenu(): JSX.Element {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const [isJoinButtonActive, setIsJoinButtonActive] = useState(false);
  const location = useLocation();
  setTimeout(() => {
    setIsJoinButtonActive(
      location.pathname === "/identity/login" ? false : true
    );
  }, 0);

  return (
    <div className="AuthMenu">
      <StyledAuthMenu open className={`${theme} autoMenu-pop`}>
        <div className="authMenuContainer">
          <Paper
            className="autoMenu-paper"
            sx={{
              boxShadow: "none",
              backgroundColor: "var(--color-background)",
            }}
          >
            <MyLogo></MyLogo>

            <Box className="buttonsRow">
              <Button
                className={`joinButton ${isJoinButtonActive ? "active" : ""}`}
              >
                <Link to={"/identity/register"}>JOIN</Link>
              </Button>
              <Button
                className={`SignInButton ${
                  !isJoinButtonActive ? "active" : ""
                }`}
              >
                <Link to={"/identity/login"}>SIGN IN</Link>
              </Button>
            </Box>
            <Routes>
              <Route path="/" element={<Navigate to="/identity/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Paper>
        </div>
      </StyledAuthMenu>
    </div>
  );
}

export default AuthMenu;
