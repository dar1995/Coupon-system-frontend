import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import { addThemeClass } from "../../../Contexts/SearchMethods";
import "./PriceSearch.css";
import { Theme } from "../../../Models/ThemeType";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
interface priceSearchProps {
  theme: Theme;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: string;
}
function PriceSearch({
  theme,
  value,
  setValue,
  maxPrice,
}: priceSearchProps): JSX.Element {
  theme = useSelector((state: RootState) => state.themeReducer.theme);
  // const [maxPrice, setMaxPrice] = useState("");
  const handleOpen = () => {
    addThemeClass(theme);
    value === "" ? setValue(maxPrice) : null;
  };
  const handleClose = () => {
    value === maxPrice ? setValue("") : setValue(value);
  };
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue.toString());
  };

  return (
    <div className="PriceSearch">
      <FormControl className="priceFormControl searchFormControl">
        <InputLabel id="priceSearchLabel">Max Price</InputLabel>
        <Select
          className="priceSelect searchSelect"
          onOpen={handleOpen}
          value={value}
          renderValue={() => `${value}₪`}
          label={"Max Price"}
          labelId="priceSearchLabel"
          onClose={handleClose}
        >
          <span></span>
          <MenuItem
            disableTouchRipple={true}
            sx={{ height: "6vh", alignItems: "center", gap: "2vw" }}
            value={maxPrice}
          >
            <Slider
              className="priceSlider"
              sx={{ width: "18vw" }}
              max={Number(maxPrice)}
              value={Number(value)}
              onChange={handleSliderChange}
              defaultValue={Number(maxPrice)}
            />
            <span style={{ fontWeight: "400" }}>{maxPrice}₪</span>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default PriceSearch;
