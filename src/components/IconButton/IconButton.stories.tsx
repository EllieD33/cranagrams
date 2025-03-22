import type { Meta, StoryObj } from "@storybook/react";
import IconButton, { IconButtonProps } from "./IconButton";

const meta = {
  title: "Library/IconButton/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: IconButtonProps = {
  icon: "start",
  ariaLabel: "Start",
  onClick: () => {}
};

export const Default: Story = {
  args: {
    ...defaultProps
  }
};
