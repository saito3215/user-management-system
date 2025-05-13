import type { Meta, StoryObj } from "@storybook/react";
import DeleteUserButton from "./DeleteUserButton";

const meta: Meta<typeof DeleteUserButton> = {
  title: "Components/DeleteUserButton",
  component: DeleteUserButton,
};

export default meta;

type Story = StoryObj<typeof DeleteUserButton>;

export const Default: Story = {
  args: {
    userId: 1,
    onDelete: (id: number) => {
      console.log(`User with ID ${id} deleted`);
    },
  },
};
