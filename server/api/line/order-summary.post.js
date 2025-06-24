export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (
      !body.userId ||
      !body.order ||
      !body.userName ||
      !body.address ||
      !body.paymentMethod ||
      !body.timestamp
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    const LINE_API_URL = "https://api.line.me/v2/bot/message/push";
    const LINE_CHANNEL_ACCESS_TOKEN = useRuntimeConfig().public.lineAccessToken;

    if (!LINE_CHANNEL_ACCESS_TOKEN) {
      throw createError({
        statusCode: 500,
        statusMessage: "LINE Channel Access Token not configured",
      });
    }

    const messagePayload = {
      to: body.userId,
      messages: [
        {
          type: "text",
          text: `รายละเอียดคำสั่งซื้อ\n\nเมนู ${body.order.name}\nราคา ${body.order.price} บาท\nการชำระเงิน ${body.paymentMethod}\n\nผู้รับ\n${body.userName}\n${body.address}\n\n${body.timestamp}`,
        },
      ],
    };

    const response = await fetch(LINE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: messagePayload,
    });

    return {
      status: "success",
      message: "Order summary sent successfully",
      data: response,
    };
  } catch (error) {
    console.error("Error sending LINE message:", error);

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to send order summary",
    });
  }
});
