// app/users/[id]/details/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import { fetchUserById } from "@/utils/api";
import { User } from "@/types/User";
import UserDetails from "@/components/UserDetails";
import { useRouter } from "next/navigation";

const UserDetailsPage: React.FC = () => {
  const params = useParams();
  const userId = Number(params.id);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isNaN(userId)) {
      return;
    }
    const loadUser = async () => {
      try {
        const fetchedUser = await fetchUserById(userId);
        if (!fetchedUser) {
          return;
        }
        setUser(fetchedUser);
      } catch (err) {
        console.error("ユーザー情報の取得に失敗しました:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId, router]);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        ユーザー詳細
      </Typography>

      {user && <UserDetails user={user} />}
    </Box>
  );
};

export default UserDetailsPage;
