"use client";

import React from "react";
import RegisterForm from "../../components/RegisterForm";
import { Typography, Box, Container } from "@mui/material";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ユーザー新規登録
        </Typography>
        <RegisterForm
          onSuccess={() => router.push("/users")}
          onError={(error) => alert(`登録に失敗しました: ${error}`)}
          disabled={false}
        />
      </Box>
    </Container>
  );
};

export default RegisterPage;
