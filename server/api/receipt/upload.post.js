import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export default defineEventHandler(async (event) => {
  try {
    const form = await readFormData(event);
    const file = form.get("image");
    const userId = form.get("userId");

    if (!file) {
      return { error: "No file uploaded" };
    }

    const uploadDir = join(process.cwd(), "public", "receipts");
    await mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const fileExtension = getFileExtension(file.name);
    const fileName = `${timestamp}-${userId}${fileExtension}`;
    const filePath = join(uploadDir, fileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    const imageUrl = `/receipts/${fileName}`;
    return { success: true, imageUrl };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Failed to upload file" };
  }
});

function getFileExtension(filename) {
  const lastDot = filename.lastIndexOf(".");
  return lastDot !== -1 ? filename.substring(lastDot) : "";
}
