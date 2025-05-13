"use client";

import React from "react";
import { notFound } from "next/navigation";
import EditUserForm from "@/components/EditUserForm";
import { fetchUserById } from "@/utils/api";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}
const EditUserPage = async ({ params }: PageProps) => {
  const userId = parseInt(params.id);
  const router = useRouter();
  if (isNaN(userId)) {
    return notFound();
  }

  const user = await fetchUserById(userId);
  if (!user) {
    return notFound();
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ユーザー編集
        </Typography>
        <EditUserForm
          userId={user.id}
          onSuccess={() => router.push("/users")}
          onError={(error) => alert(`登録に失敗しました: ${error}`)}
          disabled={false}
        />
      </Box>
    </Container>
  );
};

export default EditUserPage;
