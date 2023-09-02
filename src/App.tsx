import "./App.css";
import Header from "./Components/Layout/Header/Header";
import Footer from "./Components/Layout/Footer/Footer";
import Main from "./Components/Layout/Main/Main";
import { AppTheme } from "./Components/MyStyles/MainTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/Store";

function App() {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);

  return (
    <div className={`app ${theme}`}>
      <ThemeProvider theme={AppTheme}>
        <Header />
        <Main />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
