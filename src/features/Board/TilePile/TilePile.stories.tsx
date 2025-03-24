import type { Meta, StoryObj } from "@storybook/react";
import TilePile, { TilePileProps } from "./TilePile";
import { tileDeck } from "../../../constants/tiles";

const meta = {
  title: "Library/Board/TilePile/TilePile",
  component: TilePile,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof TilePile>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: TilePileProps = { tiles: [...tileDeck] };

export const Default: Story = {
  args: {
    ...defaultProps
  }
};
