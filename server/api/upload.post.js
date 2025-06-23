import { createWriteStream } from "fs";
import { join } from "path";
import { mkdir } from "fs/promises";

export default defineEventHandler(async (event) => {
  const form = await readFormData(event);
  const file = form.get("image");

  if (!file) {
    return { error: "No file uploaded" };
  }

  try {
    const uploadDir = join(process.cwd(), "public", "receipts");

    await mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(uploadDir, fileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await writeFile(filePath, buffer);

    const imageUrl = `/receipts/${fileName}`;
    return { imageUrl };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Failed to upload file" };
  }
});

function writeFile(filePath, buffer) {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(filePath);

    stream.on("error", reject);
    stream.on("finish", resolve);

    stream.write(buffer);
    stream.end();
  });
}
