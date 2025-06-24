import { unlink } from "fs/promises";
import { join } from "path";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { imagePath } = body;

    if (!imagePath) {
      return { error: "No image path provided" };
    }

    const filePath = join(process.cwd(), "public", imagePath);
    await unlink(filePath);

    return { success: true };
  } catch (error) {
    console.error("Error deleting receipt:", error);

    return { error: "Failed to delete file" };
  }
});
