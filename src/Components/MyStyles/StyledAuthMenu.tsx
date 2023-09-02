import styled from "@emotion/styled";
import { Popover } from "@mui/material";

export const StyledAuthMenu = styled(Popover)({
  backgroundColor: "var(--color-secondary)",
  boxShadow: "none",
  height: "100%",
  ".css-1kjj2df-MuiPaper-root-MuiPopover-paper": {
    boxShadow: "none",
    position: "static",
    backgroundColor: "var(--color-secondary)",
    width: "100%",
    maxWidth: "none",
    maxHeight: "none",
    height: "100%",
  },
});