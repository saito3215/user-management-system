import type { Meta, StoryObj } from "@storybook/react";
import UserList from "./UserList";

const meta: Meta<typeof UserList> = {
  title: "Components/UserList",
  component: UserList,
};

export default meta;

type Story = StoryObj<typeof UserList>;

export const Default: Story = {
  args: {
    users: [
      {
        id: 1,
        name: "山田 太郎",
        email: "yamada@example.com",
        role: "管理者",
        deleted: false,
      },
      {
        id: 2,
        name: "鈴木 次郎",
        email: "suzuki@example.com",
        role: "一般",
        deleted: false, 
      },
      {
        id: 3,
        name: "佐藤 花子",
        email: "sato@example.com",
        role: "一般",   
        deleted: true,
      },
      {
        id: 4,
        name: "田中 一郎",
        email: "tanaka@example.com",
        role: "一般",
        deleted: false,
      },
    ] ,
  },
};
