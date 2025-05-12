'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { fetchUserById, updateUser } from '../utils/api';
import { useRouter } from 'next/navigation';
import { User } from '../types/User'; 

interface EditUserFormInputs {
  name: string;
  email: string;
  role: string;
}

interface EditUserFormProps {
  userId: number;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ userId }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<EditUserFormInputs>();
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user: User | null = await fetchUserById(userId);
        if (!user) {
          setSubmitError('ユーザーが見つかりません。');
          setLoading(false);
          return;
        }
        setValue('name', user.name);
        setValue('email', user.email);
        setValue('role', user.role);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setSubmitError('ユーザー情報の取得に失敗しました。');
        setLoading(false);
      }
    };

    loadUser();
  }, [userId, setValue]);

  const onSubmit: SubmitHandler<EditUserFormInputs> = async (data) => {
    try {
      await updateUser(userId, data);
      router.push('/users');
    } catch (error) {
        console.error('Error updating user:', error);
      setSubmitError('ユーザーの更新に失敗しました。');
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ユーザー情報編集
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          {...register('name', { required: '名前は必須です' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="メールアドレス"
          fullWidth
          margin="normal"
          type="email"
          {...register('email', { required: 'メールは必須です' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="ロール"
          fullWidth
          margin="normal"
          type="text"
          {...register('role', { required: 'ロールは必須です' })}
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
        >
          更新
        </Button>
      </form>
    </Box>
  );
};

export default EditUserForm;