import type { Meta, StoryObj } from "@storybook/react";
import Timer from "./Timer";

const meta = {
  title: "Library/Timer/Timer",
  component: Timer,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
