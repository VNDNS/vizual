export function generateComponentArray(components: any[]) {
  return components.map((component: any) => {
    return `  components.push(${component.name})`;
  });
}
