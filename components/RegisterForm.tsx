// components/RegisterForm.tsx

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { createUser } from "../utils/api";

interface RegisterFormInputs {
  name: string;
  email: string;
  role: string;
}
interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  disabled?: boolean;
}
const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onError,
  disabled,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const [submitError, setSubmitError] = useState("");
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setSubmitError("");
    try {
      await createUser({name:data.name,email:data.email,role:data.role});
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setSubmitError("ユーザーの登録に失敗しました。");
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        新規登録
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          {...register("name", { required: "名前は必須です" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="メール"
          fullWidth
          margin="normal"
          type="email"
          {...register("email", { required: "メールは必須です" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="ロール"
          fullWidth
          margin="normal"
          type="text"
          {...register("role", { required: "ロールは必須です" })}
          error={!!errors.role}
          helperText={errors.role?.message}
        >
        </TextField>

        {submitError && <Alert severity="error">{submitError}</Alert>}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={disabled}
        >
          登録
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
