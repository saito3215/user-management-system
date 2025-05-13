"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { User } from "../types/User";
import UserCard from "./UserCard";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [visibleUsers, setVisibleUsers] = useState(users);
  const handleDelete = (userId: number) => {
    setVisibleUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };
  return (
    <Box sx={{ mt: 4 }}>
      {visibleUsers.map((user) => (
        <UserCard user={user} key={user.id} onDelete={handleDelete} />
      ))}
    </Box>
  );
};

export default UserList;
