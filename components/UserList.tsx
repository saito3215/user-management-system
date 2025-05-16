"use client";

import React, { useState } from "react";
import { User } from "../types/User";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { logicDeleteUser } from "@/utils/api";
import CustomModal from "./parts/CustomModal";
import { MenuItem, Select, InputLabel, FormControl, Box } from "@mui/material";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [visibleUsers, setVisibleUsers] = useState(users);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [selectedId, setSelectedId] = useState<number | "">("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleDelete = async (userId: number | undefined) => {
    if (!userId) return;
    try {
      await logicDeleteUser(userId);
      const updatedUsers = visibleUsers.filter((user) => user.id !== userId);
      setVisibleUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("ユーザーの削除に失敗しました。");
    }
  };

  const filteredUsers = visibleUsers
    .filter((user) => {
      const idMatch = selectedId === "" || user.id === selectedId;
      const roleMatch = selectedRole === "" || user.role === selectedRole;
      return idMatch && roleMatch;
    })
    .sort((a, b) => {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    });

  const userIds = Array.from(new Set(visibleUsers.map((u) => u.id)));
  const roles = Array.from(new Set(visibleUsers.map((u) => u.role)));

  return (
    <div>
      <Box display="flex" gap={2} mb={3}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>ID</InputLabel>
          <Select
            value={selectedId}
            onChange={(e) => setSelectedId(Number(e.target.value) || "")}
            label="ID"
          >
            <MenuItem value="">すべて</MenuItem>
            {userIds.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>役職</InputLabel>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            label="役職"
          >
            <MenuItem value="">すべて</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <CustomButton
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          variantType="secondary"
        >
          ID: {sortOrder === "asc" ? "昇順" : "降順"}
        </CustomButton>
      </Box>

      {filteredUsers.map((user) => (
        <CustomCard
          key={user.id}
          title={user.name}
          description={`役割: ${user.role}\n${user.email}`}
          color={user.id % 2 === 0 ? "primary" : "secondary"}
          actions={
            <>
              <CustomButton
                href={`/users/${user.id}/edit`}
                variantType="primary"
              >
                編集
              </CustomButton>
              <CustomButton
                onClick={() => {
                  setOpen(true);
                  setSelectedUserId(user.id);
                }}
                variantType="danger"
              >
                削除
              </CustomButton>
              <CustomButton
                href={`/users/${user.id}/details`}
                variantType="secondary"
              >
                詳細
              </CustomButton>
            </>
          }
        />
      ))}
      <CustomModal
        open={open}
        title="確認"
        content="本当にこの操作を実行しますか？"
        onClose={() => setOpen(false)}
        onConfirm={() => {
          handleDelete(selectedUserId);
          setOpen(false);
        }}
      />
    </div>
  );
};

export default UserList;
