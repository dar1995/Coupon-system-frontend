import { createTheme } from "@mui/material/styles";

const AppTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--color-background)",
          color: "var(--color-primary)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "none",
          borderRadius: "0",
          borderBottom: "1px solid",
          borderTop: "1px solid",
          borderColor: "var(--color-secondary)",
        },
        root: {
          "&:hover": {
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--color-footer)",
            },
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: "var(--color-primary)",
          border: "1px solid",
          padding: "0.5rem",
          borderColor: "var(--color-primary)",

          "&:before": {
            // content:"none"
          },
          "&.Mui-error": {
            borderColor: "#d32f2f",
          },
          "& .MuiIconButton-root": {
            color: "var(--color-primary)",
          },
          
        },
        input:{
          "&.Mui-disabled":{
            WebkitTextFillColor: "var(--color-primary)",

          }
        }
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--color-tertiary)",
            },
          },
          color: "var(--color-primary)",
          fontFamily: "Oswald",
          fontWeight: "300",
          fontSize: "2vmin",
        },
        icon: {
          color: "var(--color-primary)",
          fontSize: "3vmin",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Oswald",
          fontWeight: "300",
          fontSize: "2vmin",
          color: "var(--color-primary)",
          "&.Mui-focused": {
            color: "var(--color-primary)",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "Oswald",
          fontWeight: "300",
          fontSize: "1.5vmin",
          "&.Mui-selected": {
            backgroundColor: "transparent",
            "&.Mui-focusVisible": {
              backgroundColor: "transparent",
            },
          },
          "&.Mui-selected:hover": {
            backgroundColor: "transparent",
          },
          "&:hover": {
            backgroundColor: "inherit",
            color: "var(--color-deals)",
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: "var(--color-primary)",
          "&.MuiSlider-dragging": {},
        },
        valueLabel: {
          backgroundColor: "var(--color-background)",
          color: "var(--color-primary)",
          background: "none",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          fontSize: "20px",
          fontFamily: "Oswald",
          fontWeight: "300",
          "&.Mui-focused": {
            backgroundColor: "transparent",
            color: "var(--color-deals)",
          },
        },
      },
    },
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          "& .MuiDayCalendar-weekDayLabel": {
            color: "var(--color-primary)",
          },
          "& .MuiPickersDay-root": {
            color: "var(--color-primary)",
          },
          "& .css-1jsy6pn-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":
            {
              borderColor: "var(--color-primary)",
            },
        },
      },
    },
  },
});
export { AppTheme };
