import {
  FormControl,
  InputLabel,
  MenuItem,
  Popper,
  SelectChangeEvent,
} from "@mui/material";
import "./MySelect.css";
import { FieldError, UseFormRegister } from "react-hook-form";
import { StyledSelect } from "../StyledSelect";
import { Theme } from "../../../Models/ThemeType";
import { addThemeClass } from "../../../Contexts/SearchMethods";
import { useState } from "react";
interface MySelectProps {
  name: string;
  anchorRef: React.MutableRefObject<null>;
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  title: string;
  id: string;
  items: string[];
  theme: Theme;
  label?: string;
  defaultValues?: string;
}
function MySelect({
  name,
  anchorRef,
  error,
  register,
  title,
  items,
  theme,
  id,
  label,
  defaultValues,
}: MySelectProps): JSX.Element {
  const handleOpen = () => addThemeClass(theme);
  const [value, setValue] = useState<string | null>("");
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (event.target) {
      const newValue = event.target.value as string;
      setValue(newValue);
    }
  };
  return (
    <div className="MySelect">
      {label !== undefined ? <label> {label}:</label> : null}
      <FormControl className="selectFormControl">
        <InputLabel id={id}>{title}</InputLabel>
        {error ? (
          <Popper
            open={true}
            anchorEl={anchorRef.current}
            className={"authMenuPopper"}
            placement="top-end"
            disablePortal
          >
            {error.message}
          </Popper>
        ) : null}
        <span ref={anchorRef}></span>
        <StyledSelect
          {...register(name)}
          label={title}
          labelId={id}
          value={defaultValues && value === "" ? defaultValues : value}
          className={` ${error ? "invalid" : ""}`}
          variant="outlined"
          onOpen={handleOpen}
          onChange={handleChange}
          sx={{ height: "6vh" }}
        >
          {items.map((c, idx) => (
            <MenuItem key={`${name}-${idx}`} value={c}>
              {c}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </div>
  );
}

export default MySelect;
