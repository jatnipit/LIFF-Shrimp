export default defineEventHandler(async (event) => {
  const form = await readFormData(event);
  const image = form.get("image");

  if (!image) {
    return { error: "No image provided" };
  }

  try {
  } catch (error) {}
});
