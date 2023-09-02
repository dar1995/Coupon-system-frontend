import { Box, IconButton, Input, InputAdornment, Popper } from "@mui/material";
import "./MyInput.css";
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
  UseFormTrigger,
} from "react-hook-form";
import { Theme } from "../../../Models/ThemeType";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface MyInputPropsBase {
  name: string;
  type: React.HTMLInputTypeAttribute;
  anchorRef: React.MutableRefObject<null>;
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  title: string;
  theme: Theme;
  isDisabled?: boolean;
  isMultiLine?: boolean;
  control?: Control<any>;
  trigger?: UseFormTrigger<any>;
}

interface MyInputPropsWithOptional {
  isDisabled: boolean;
  description: string;
}
interface MyInputPropsWithoutOptional {
  isDisabled?: false;
  description?: never;
}

type MyInputProps = MyInputPropsBase &
  (MyInputPropsWithOptional | MyInputPropsWithoutOptional);

function MyInput({
  name,
  type,
  anchorRef,
  error,
  register,
  title,
  theme,
  isDisabled,
  description,
  isMultiLine,
  control,
  trigger,
}: MyInputProps): JSX.Element {
  const [isDisabledClicked, setDisabledClicked] = useState(false);
  const handleDisabledMessageOpen = () => {
    setDisabledClicked(true);
    setTimeout(() => {
      setDisabledClicked(false);
    }, 3000);
  };

  const [showPassword, setShoWPassword] = useState(false);
  const handleClickShowPassword = () =>
    setShoWPassword((showPassword) => !showPassword);

  return (
    <div className="MyInput">
      <Box className="authMenuBox">
        <label htmlFor={name}> {title}:</label>
        {isDisabled === true ? (
          <Popper
            open={isDisabledClicked}
            anchorEl={anchorRef.current}
            className={"authMenuPopper"}
            placement="top-end"
            disablePortal
          >
            {description}
          </Popper>
        ) : (
          <Popper
            open={error !== undefined}
            anchorEl={anchorRef.current}
            className={"authMenuPopper"}
            placement="top-end"
            disablePortal
          >
            {error?.message}
          </Popper>
        )}

        <span ref={anchorRef}></span>
        {isMultiLine === true ? (
          <textarea
            {...register(name)}
            name={name}
            className={` ${error ? "invalid" : ""}`}
            disabled={isDisabled}
            style={{ width: "100%", height: "6vh" }}
          />
        ) : type === "date" && trigger !== undefined ? (
          <Controller
            name={name}
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(field.value)}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                    trigger(name);
                  }}
                  onSelectedSectionsChange={(newValue) => trigger(name)}
                  format="DD-MM-YYYY"
                  slotProps={{
                    textField: {
                      variant: "standard",
                      error: error ? true : false,
                    },
                    desktopPaper: { className: theme },
                    switchViewButton: { color: "inherit" },
                    nextIconButton: { color: "inherit" },
                    previousIconButton: { color: "inherit" },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        ) : type === "password" ? (
          <Input
            {...register(name)}
            type={showPassword ? "text" : "password"}
            name={name}
            className={` ${error ? "invalid" : ""}`}
            disabled={isDisabled}
            error={error ? true : false}
            disableUnderline
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <Input
            {...register(name)}
            type={type}
            name={name}
            className={` ${error ? "invalid" : ""}`}
            disabled={isDisabled}
            disableUnderline
          />
        )}
        {isDisabled === true ? (
          <div className="overLay" onClick={handleDisabledMessageOpen}></div>
        ) : null}
      </Box>
    </div>
  );
}

export default MyInput;
