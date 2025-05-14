// components/parts/CustomButton.tsx
import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  variantType?: "primary" | "secondary" | "danger";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variantType = "primary",
  ...props
}) => {
  let color: ButtonProps["color"] = "primary";

  switch (variantType) {
    case "primary":
      color = "primary";
      break;
    case "secondary":
      color = "success";
      break;
    case "danger":
      color = "warning";
      break;
    default:
      color = "primary";
  }

  return (
    <Button color={color} variant="contained" {...props}>
      {props.children}
    </Button>
  );
};

export default CustomButton;
