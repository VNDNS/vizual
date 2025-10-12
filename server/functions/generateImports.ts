import { ComponentUI } from "../../types/ComponentUI";
import { capitalize } from "./capitalize";


export const generateImports = (components: ComponentUI[]) => {
  const types = [...new Set(components.map(component => component.type))];
  return types.map(type => `import { ${capitalize(type)} } from '../../components/${capitalize(type)}'`).join('\n');
};
