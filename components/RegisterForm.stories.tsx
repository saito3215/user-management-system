// components/RegisterForm.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "./RegisterForm";

const meta: Meta<typeof RegisterForm> = {
  title: "Components/RegisterForm",
  component: RegisterForm,
};

export default meta;

type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {
  args: {
    onSuccess: () => alert(""),
    onError: (error) => alert(`登録に失敗しました: ${error}`),
    disabled: false,
  },
};
