'use client';

import React from 'react';
import { Box } from '@mui/material';
import { User } from '../types/User';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <Box sx={{ mt: 4 }}>
        {users.map((user) => (
            <UserCard user={user} key={user.id}/>
        ))}
    </Box>
  );
};

export default UserList;