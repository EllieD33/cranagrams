import type { Meta, StoryObj } from "@storybook/react";
import TileTray, { TilePileProps } from "./TileTray";

const meta = {
  title: "Library/Board/TilePile/TilePile",
  component: TileTray,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof TileTray>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: TilePileProps = { variant: "PlayerTray" };

export const Default: Story = {
  args: {
    ...defaultProps
  }
};
