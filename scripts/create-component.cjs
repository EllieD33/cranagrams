const fs = require("fs");
const path = require("path");

const componentName = process.argv[2];
const location = process.argv[3] || "src/components";

if (!componentName) {
  console.error(
    "❌ Error: Please provide a component name (in PascalCase) as an argument."
  );
  console.log("  Example: node create-component.js Button");
  process.exit(1);
}

if (!/^[A-Z][a-zA-Z]*$/.test(componentName)) {
  console.error(
    '❌ Error: The component name must be in PascalCase (e.g., "Button", "MyComponent").'
  );
  process.exit(1);
}

const componentDir = path.join(location, componentName);
fs.mkdirSync(componentDir, { recursive: true });

const locationParts = location.split("/");
const folderName = locationParts[locationParts.length - 1];

const componentFile = path.join(componentDir, `${componentName}.tsx`);
const componentContent = `import { ReactElement } from "react";
import styles from "./${componentName}.module.css";

export interface ${componentName}Props {};

const ${componentName} = ({}: ${componentName}Props): ReactElement => {
    return (
        <>
        </>
    );
};

export default ${componentName};
`;

fs.writeFileSync(componentFile, componentContent);

const storiesFile = path.join(componentDir, `${componentName}.stories.tsx`);
const storiesContent = `import type { Meta, StoryObj } from "@storybook/react";
import ${componentName}, { ${componentName}Props } from "./${componentName}";

const meta = {
    title: "Library/${process.argv[3] ? folderName + "/" : ""}${componentName}/${componentName}",
    component: ${componentName},
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: ${componentName}Props = { };

export const Default: Story = {
    args: {
        ...defaultProps,
    }
};
`;

fs.writeFileSync(storiesFile, storiesContent);

const testFile = path.join(componentDir, `${componentName}.test.tsx`);
const testContent = `import { render, screen } from "@testing-library/react";
import ${componentName}, { ${componentName}Props } from "./${componentName}";

const defaultProps: ${componentName}Props = {};

describe('${componentName}', () => {
    it('should render the default component', () => {
        render(<${componentName} {...defaultProps} />);
        expect(screen.getByTestId('')).toBeInTheDocument();
    });
});
`;

fs.writeFileSync(testFile, testContent);

const cssModuleFile = path.join(componentDir, `${componentName}.module.css`);
fs.writeFileSync(cssModuleFile, "");

console.log(`✅ Files successfully created for component: ${componentName}`);
console.log(`📂 Location: ${componentDir}`);
