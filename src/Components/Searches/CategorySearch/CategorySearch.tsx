import "./CategorySearch.css";
import { Autocomplete } from "@mui/material";

import { StyledSearchByIdInput } from "../../MyStyles/StyledSearchByIdInput";
interface categorySearchProps {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  stringArray: string[];
  title: string;
}
function CategorySearch({
  value,
  setValue,
  stringArray,
  title,
}: categorySearchProps): JSX.Element {
  return (
    <div className="CategorySearch">
      <Autocomplete
        options={stringArray}
        getOptionLabel={(option) => option.toString()}
        renderInput={(params) => (
          <StyledSearchByIdInput {...params} label={title} />
        )}
        value={value}
        disablePortal
        onChange={(event: any, newValue: null | string) => {
          setValue(newValue);
        }}
        sx={{ width: "100%" }}
      />
    </div>
  );
}

export default CategorySearch;
