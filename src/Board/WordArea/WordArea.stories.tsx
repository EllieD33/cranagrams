import type { Meta, StoryObj } from "@storybook/react";
import WordArea, { WordAreaProps } from "./WordArea";

const meta = {
  title: "Library/Board/WordArea/WordArea",
  component: WordArea,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof WordArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: WordAreaProps = {};

export const Default: Story = {
  args: {
    ...defaultProps
  }
};
