import { generateHTML } from "./generateHTML";
import { scrape } from "./scrape";
import { Data } from "./types/Data";


const url = "https://vgsales.fandom.com/wiki/Pok%C3%A9mon";

const main = async () => {
    const data = await scrape(url);
    generateHTML(data as Data[])
}

main()
