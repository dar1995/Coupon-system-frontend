import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledSearchByIdInput = styled(TextField)({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& .MuiIconButton-root": {
    color: "var(--color-primary)",
  },
  "& .MuiInputLabel-root": {
    color: "var(--color-primary)",
  },
  "& .MuiOutlinedInput-root": {
    color: "var(--color-primary)",
    fontFamily: "Oswald",
    fontSize: "20px",
    fontWeight: "300",
    "&.Mui-focused": {
      ".MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--color-tertiary)",
      },
    },
  },
  "& .MuiAutocomplete-option": {
    backgroundColor: "pink",
  },
});
