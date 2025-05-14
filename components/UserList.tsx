"use client";

import React, { useState } from "react";
import { Button, Link } from "@mui/material";
import { User } from "../types/User";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { logicDeleteUser } from "@/utils/api";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [visibleUsers, setVisibleUsers] = useState(users);

  const handleDelete = async(userId: number) => {
    const confirmed = confirm("本当にこのユーザーを削除しますか？");
    if (!confirmed) return;

    try {
      await logicDeleteUser(userId);
      setVisibleUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("ユーザーの削除に失敗しました。");
    }
  };

  return (
    <div>
      {visibleUsers.map((user) => (
        <CustomCard
          key={user.id}
          title={user.name}
          description={`役割: ${user.role}\n${user.email}`}
          actions={
            
            <>
              <Button component={Link} href={`/users/${user.id}/edit`}>
                編集
              </Button>
              <CustomButton onClick={() => handleDelete(user.id)}>
                削除
              </CustomButton>
              <Button component={Link} href={`/users/${user.id}/details`}>
                詳細
              </Button>
            </>
          }
        />
      ))}
    </div>
  );
};

export default UserList;
