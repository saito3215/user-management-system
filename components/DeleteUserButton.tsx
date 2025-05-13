"use client";
import React from "react";
import { logicDeleteUser } from "../utils/api";
import { Button } from "@mui/material";

interface DeleteUserButtonProps {
  userId: number;
  onDelete: (userId: number) => void;
}
const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  userId,
  onDelete,
}) => {
  const handleDelete = async () => {
    const confirmed = confirm("本当にこのユーザーを削除しますか？");
    if (!confirmed) return;

    try {
      await logicDeleteUser(userId);
      onDelete(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("ユーザーの削除に失敗しました。");
    }
  };
  return (
    <Button onClick={handleDelete} size="small" color="error">
      ユーザーを削除
    </Button>
  );
};
export default DeleteUserButton;
