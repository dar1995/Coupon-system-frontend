import { Autocomplete } from "@mui/material";
import "./SearchById.css";
import { StyledSearchByIdInput } from "../../MyStyles/StyledSearchByIdInput";
interface SearchByIdProps {
  value: number | null;
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
  idArray: number[];
}
function SearchById({
  value,
  setValue,
  idArray,
}: SearchByIdProps): JSX.Element {
  return (
    <div className="SearchById">
      <Autocomplete
        options={idArray}
        getOptionLabel={(option) => option.toString()}
        renderInput={(params) => (
          <StyledSearchByIdInput {...params} label="Find by Id" type="number" />
        )}
        value={value}
        disablePortal
        onChange={(event: any, newValue: number | null | string) => {
          if (newValue === null) {
            setValue(newValue);
          } else if (typeof newValue === "string") {
            !Number.isNaN(parseInt(newValue))
              ? setValue(parseInt(newValue))
              : null;
          } else {
            setValue(newValue);
          }
        }}
        sx={{ width: "100%" }}
        freeSolo
      />
    </div>
  );
}

export default SearchById;
