import React from "react";
import { Card, CardContent, Typography, CardActions } from "@mui/material";
import { User } from "../types/User";
import CustomButton from "./parts/CustomButton";
import { logicDeleteUser } from "@/utils/api";

interface UserCardProps {
  user: User;
  onDelete: (userId: number) => void;
}
const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const handleDelete = async () => {
    const confirmed = confirm("本当にこのユーザーを削除しますか？");
    if (!confirmed) return;

    try {
      await logicDeleteUser(user.id);
      onDelete(user.id);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("ユーザーの削除に失敗しました。");
    }
  };

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography color="text.secondary">{user.email}</Typography>
        <Typography variant="body2">役割: {user.role}</Typography>
      </CardContent>
      <CardActions>
        <CustomButton
          variantType="primary"
          size="small"
          href={`/users/${user.id}/edit`}
        >
          編集
        </CustomButton>
        <CustomButton variantType="danger" size="small" onClick={handleDelete}>
          削除
        </CustomButton>
        <CustomButton
          variantType="secondary"
          size="small"
          href={`/users/${user.id}/details`}
        >
          詳細
        </CustomButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;
