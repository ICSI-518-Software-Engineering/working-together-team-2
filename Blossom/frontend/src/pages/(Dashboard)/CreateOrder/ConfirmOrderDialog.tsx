import { CustomDialogBaseProps } from "@/components/CustomDialog";
import FullScreenCustomDialog from "@/components/FullScreenCustomDialog";
import { formatPrice } from "@/lib/utils";
import { Close } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Theme,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import CartSection from "./CartSection";
import useProductsStore, { calculateTotalPrice } from "./productsStore";

type ConfirmOrderDialogProps = {
  onConfirm: () => unknown;
} & CustomDialogBaseProps;

const ConfirmOrderDialog: React.FC<ConfirmOrderDialogProps> = ({
  onConfirm,
  ...props
}) => {
  const { cart } = useProductsStore();
  const isNotMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("lg")
  );

  const totalPrice = calculateTotalPrice(cart);

  return (
    <FullScreenCustomDialog {...props} hideCloseButton>
      <AppBar>
        <Toolbar>
          {/* Close Button */}
          <IconButton edge="start" color="inherit" onClick={props.onClose}>
            <Close />
          </IconButton>

          {/* Title */}
          <Typography ml="1rem" variant="h6" flex={1}>
            Confirm Order
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        mt="5rem"
        gap={{ xs: "3rem", lg: "1rem" }}
        height="90%"
      >
        {/* Cart Section */}
        <Stack
          gap="2rem"
          overflow={{ xs: "initial", lg: "auto" }}
          maxHeight={{ xs: undefined, lg: "85vh" }}
          flexGrow={1}
        >
          <CartSection />
        </Stack>

        <Divider orientation={isNotMobile ? "vertical" : "horizontal"} />

        {/* Payment Details Section */}
        <Stack gap="1.5rem" minWidth="25%" p={{ xs: 0, lg: "1.5rem" }}>
          <Typography fontWeight="bold">Price Details</Typography>
          {isNotMobile && <Divider />}

          <TableContainer>
            <Table>
              <TableBody>
                {/* Price */}
                <TableRow>
                  <StyledTableCell>
                    Price ({Object.keys(cart).length} items)
                  </StyledTableCell>
                  <StyledTableCell>{formatPrice(totalPrice)}</StyledTableCell>
                </TableRow>
                {/* Delivery Charges */}
                <TableRow>
                  <StyledTableCell enableBorder>
                    Delivery Charges
                  </StyledTableCell>
                  <StyledTableCell enableBorder>Free</StyledTableCell>
                </TableRow>
                {/* Total */}
                <TableRow>
                  <StyledTableCell sx={{ fontWeight: "bold" }}>
                    Total Amount
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontWeight: "bold" }}>
                    {formatPrice(totalPrice)}
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              props.onClose();
              onConfirm();
            }}
          >
            Create Order
          </Button>
        </Stack>
      </Stack>
    </FullScreenCustomDialog>
  );
};

export default ConfirmOrderDialog;

/**
 * Styled Table Cell
 */

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "enableBorder",
})<{ enableBorder?: boolean }>(({ enableBorder }) => ({
  borderBottom: !enableBorder ? "none" : undefined,
  paddingLeft: 0,
  paddingRight: 0,
}));
