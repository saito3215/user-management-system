// components/parts/CustomButton.tsx
import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CustomButtonProps extends ButtonProps {
  variantType?: "primary" | "secondary" | "danger";
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledButton = styled(Button)(({ theme }) => ({
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.20)", // 20%拡大
  },
}));

const CustomButton: React.FC<CustomButtonProps> = ({
  variantType = "primary",
  onClick,
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
  const playBeep = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

     oscillator.type = "square"; // 音のタイプ選択可："sine" | "square" | "sawtooth" | "triangle"
    oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4 = 440Hz
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime); // 音量（0.0〜1.0）

     oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1); // 0.1秒でとまる！
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    playBeep();
    if (onClick) {
      onClick(event);
    }
  };

  return (
 <StyledButton
      color={color}
      variant="contained"
      {...props}
      onClick={handleClick}
    >
      {props.children}
    </StyledButton>  );
};

export default CustomButton;
