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
  color?: string;
  progress?: number;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  actions,
  color = "white",
  progress,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <Box
      onClick={handleFlip}
      sx={{
        position: "relative",
        width: 900,
        height: 200,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
      
        <Card
          sx={{
            backgroundColor: color,
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
            backgroundColor: color,
            width: "100%",
            height: "100%",
            position: "absolute",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <CardContent>
            <Typography variant="body2" color="text.secondary" whiteSpace="pre-line">
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
