// components/parts/CustomCard.tsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  LinearProgress,
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
  return (
    <Card sx={{ minWidth: 275, mb: 2, backgroundColor: color }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          whiteSpace={"pre-line"}
        >
          {description}
        </Typography>
        {progress !== undefined && (
          <LinearProgress variant="determinate" value={progress} />
        )}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default CustomCard;
