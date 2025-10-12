export const removeEmptyLines = (lines: string[]) => {
  return lines.filter((line: string) => line.trim() !== '');
};
