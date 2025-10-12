import fs from "fs";

export const saveJson = (data: any, filePath: string) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData);
};
