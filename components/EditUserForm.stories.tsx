// components/EditUserForm.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import EditUserForm from "./EditUserForm";

const meta: Meta<typeof EditUserForm> = {
  title: "Components/EditUserForm",
  component: EditUserForm,
};

export default meta;

type Story = StoryObj<typeof EditUserForm>;

export const Default: Story = {
  args: {
    userId: 1,
  },
};
