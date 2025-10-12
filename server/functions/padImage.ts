import sharp from "sharp";
import fs from "fs";

export const padImage = async (file: string) => {
  const background = { r: 255, g: 255, b: 255, alpha: 1 }
  const path = `./server/images/input/${file}`
  const outputPath = `./server/images/padded/${file}`
  const metadata = await sharp(path).metadata();
  const { width, height } = metadata;
  const size = Math.max(width, height);
  const image = await sharp(path)
    .resize(size, size, {
      fit: "contain", // keep aspect ratio, add padding
      background, // background color (default white)
    })
    .resize(1024, 1024)

  // save new file
  image.toFile(outputPath);
  console.log(`Square image saved to ${outputPath}`);
}

// load all files from ./server/images/input

const files = fs.readdirSync('./server/images/input');

for (const file of files) {
  await padImage(file);
}