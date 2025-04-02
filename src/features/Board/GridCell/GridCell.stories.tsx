import type { Meta, StoryObj } from "@storybook/react";
import GridCell, { GridCellProps } from "./GridCell";

const meta = {
  title: "Library/Board/GridCell/GridCell",
  component: GridCell,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof GridCell>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: GridCellProps = {
  rowIndex: 1,
  colIndex: 1
};

export const Default: Story = {
  args: {
    ...defaultProps
  }
};
