import * as fs from "fs";
import { Data } from "./types/Data";

export const generateHTML = (data: Data[]) => {
  let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
    <style>
        body { font-family: sans-serif; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 1rem; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        p { line-height: 1.6; }
    </style>
</head>
<body>
`;

  data.forEach((item) => {
    if (item.type === "paragraph") {
      htmlContent += `<p>${item.content}</p>\n`;
    } else if (item.type === "table") {
      htmlContent += "<table>\n";
      item.content.forEach((row) => {
        htmlContent += "  <tr>\n";
        row.forEach((cell) => {
          const tag = cell.isHeader ? "th" : "td";
          const rowspan = cell.rowspan ? ` rowspan="${cell.rowspan}"` : "";
          const colspan = cell.colspan ? ` colspan="${cell.colspan}"` : "";
          htmlContent += `    <${tag}${rowspan}${colspan}>${cell.text}</${tag}>\n`;
        });
        htmlContent += "  </tr>\n";
      });
      htmlContent += "</table>\n";
    } else if (item.type === "heading") {
      htmlContent += `<h${item.level}>${item.content}</h${item.level}>\n`;
    }
  });

  htmlContent += `
</body>
</html>
`;

  fs.writeFile("./page.html", htmlContent, (err) => {
    if (err) {
      console.error("Error writing HTML file:", err);
      return;
    }
    console.log("Successfully created page.html");
  });
};
