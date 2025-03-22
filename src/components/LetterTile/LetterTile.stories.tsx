import type { Meta, StoryObj } from "@storybook/react";
import LetterTile, { LetterTileProps } from "./LetterTile";

const meta = {
  title: "Library/LetterTile/LetterTile",
  component: LetterTile,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof LetterTile>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: LetterTileProps = { letter: "a" };

export const Default: Story = {
  args: {
    ...defaultProps
  }
};
