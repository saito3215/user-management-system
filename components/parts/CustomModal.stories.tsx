// components/parts/CustomModal.stories.tsx

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import { Box } from "@mui/material";


const meta: Meta<typeof CustomModal> = {
    title: 'Components/Parts/CustomModal',
    component: CustomModal,
    tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CustomModal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Box>
        <CustomButton variantType="primary" onClick={() => setOpen(true)}>
          モーダルを開く
        </CustomButton>
        <CustomModal
          open={open}
          title="確認"
          content="本当にこの操作を実行しますか？"
          onClose={() => setOpen(false)}
          onConfirm={() => {
            alert('確認ボタンがクリックされました。');
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};