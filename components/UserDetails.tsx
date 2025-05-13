import { Card, CardContent, Typography } from "@mui/material";
import { User } from "../types/User";
import React from "react";

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          ユーザー詳細
        </Typography>
        <Typography variant="body1">
          <strong>ID:</strong> {user.id}
        </Typography>
        <Typography variant="body1">
          <strong>名前:</strong> {user.name}
        </Typography>
        <Typography variant="body1">
          <strong>メールアドレス:</strong> {user.email}
        </Typography>
        <Typography variant="body1">
          <strong>役職:</strong> {user.role}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default UserDetails;
