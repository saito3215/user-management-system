import { Box, Card, CardContent, Typography } from "@mui/material";
import { User } from "../types/User";
import CustomButton from "./parts/CustomButton";
import React from "react";
import { useRouter } from "next/navigation";

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/users");
  }
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <CustomButton onClick={handleBack}>戻る</CustomButton>
      </Box>
    </Card>
  );
};
export default UserDetails;
