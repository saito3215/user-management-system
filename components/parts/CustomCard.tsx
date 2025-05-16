import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  LinearProgress,
  Box,
} from "@mui/material";

interface CustomCardProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
  color?: "primary" | "secondary"; // 2色
  progress?: number;
}
const colorMap = {
  primary: "#e3f2fd",   // 薄い青
  secondary: "#f5f5f5", // 薄いグレー
};

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  actions,
  color = "secondary", //グレーデフォルト
  progress,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const backgroundColor = colorMap[color];

  return (
    <Box
      onClick={handleFlip}
      sx={{
        position: "relative",
        width: 950,
        height: 190,
      }}
    >
      <Box
        sx={{
          backgroundColor,
          width: "100%",
          height: "100%",
          border: "1px solid #ccc",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <Card
          sx={{
            backgroundColor,
            width: "100%",
            height: "100%",
            position: "absolute",
            backfaceVisibility: "hidden",
          }}
        >
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            {progress !== undefined && (
              <LinearProgress variant="determinate" value={progress} />
            )}
          </CardContent>
          {actions && <CardActions>{actions}</CardActions>}
        </Card>

        {/* Back */}
        <Card
          sx={{
            backgroundColor,
            width: "100%",
            height: "100%",
            position: "absolute",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: "pre-line" }}
            >
              {description}
            </Typography>
          </CardContent>
          {actions && <CardActions>{actions}</CardActions>}
        </Card>
      </Box>
    </Box>
  );
};

export default CustomCard;
