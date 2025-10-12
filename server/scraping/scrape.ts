import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import { Data, TableCell } from "./types/Data";

export const scrape = async (url: string) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const data: Data[] = [];

    $("p, table, h1, h2, h3, h4, h5, h6").each((_i, element) => {
      if (element.tagName === "p") {
        const pText = $(element).text().trim();
        if (pText) {
          data.push({
            type: "paragraph",
            content: pText,
          });
        }
      } else if (element.tagName === "table") {
        const table: TableCell[][] = [];
        $(element)
          .find("tr")
          .each((_rowIndex, row) => {
            const rowData: TableCell[] = [];
            $(row)
              .find("th, td")
              .each((_colIndex, cell) => {
                const colspan = $(cell).attr("colspan");
                const rowspan = $(cell).attr("rowspan");
                rowData.push({
                  text: $(cell).text().trim(),
                  isHeader: cell.tagName === "th",
                  colspan: colspan ? parseInt(colspan, 10) : undefined,
                  rowspan: rowspan ? parseInt(rowspan, 10) : undefined,
                });
              });
            if (rowData.length > 0) {
              table.push(rowData);
            }
          });
        if (table.length > 0) {
          data.push({
            type: "table",
            content: table,
          });
        }
      } else if (element.tagName.match(/^h[1-6]$/)) {
        const headingText = $(element).text().trim();
        if (headingText) {
          data.push({
            type: "heading",
            level: parseInt(element.tagName.substring(1), 10) as 1 | 2 | 3 | 4 | 5 | 6,
            content: headingText,
          });
        }
      }
    });

    fs.writeFile("website.json", JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("File successfully written!");
      }
    });
    return data
  } catch (error) {
    console.error("Error scraping the website:", error);
  }
};