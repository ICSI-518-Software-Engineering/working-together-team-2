import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { ReactNode } from "react";

type CustomDialogProps = {
  isOpen: boolean;
  onClose: () => unknown;
  title?: string;
  children: ReactNode;
  dialogActions?: ReactNode;
};

const CustomDialog: React.FC<CustomDialogProps> = ({
  children,
  dialogActions,
  ...props
}) => {
  return (
    <Dialog open={props.isOpen} onClose={props.onClose}>
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      <Box position="absolute" top={10} right={10}>
        <IconButton onClick={props.onClose}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>{children}</DialogContent>
      {dialogActions && <DialogActions>{dialogActions}</DialogActions>}
    </Dialog>
  );
};

export default CustomDialog;
