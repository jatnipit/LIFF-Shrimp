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
          type: "flex",
          altText: "รายละเอียดคำสั่งซื้อ",
          contents: {
            type: "bubble",
            header: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "รายละเอียดคำสั่งซื้อ",
                  weight: "bold",
                  size: "xl",
                  color: "#1DB446",
                },
              ],
            },
            body: {
              type: "box",
              layout: "vertical",
              spacing: "md",
              contents: [
                {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: `เมนู`,
                      weight: "bold",
                      size: "md",
                    },
                    {
                      type: "text",
                      text: body.order.name,
                      size: "sm",
                      color: "#555555",
                      wrap: true,
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: `ราคา`,
                      weight: "bold",
                      size: "md",
                    },
                    {
                      type: "text",
                      text: `${body.order.price} บาท`,
                      size: "sm",
                      color: "#555555",
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: `การชำระเงิน`,
                      weight: "bold",
                      size: "md",
                    },
                    {
                      type: "text",
                      text: body.paymentMethod,
                      size: "sm",
                      color: "#555555",
                    },
                  ],
                },
                {
                  type: "separator",
                  margin: "md",
                },
                {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: `ผู้รับ`,
                      weight: "bold",
                      size: "md",
                    },
                    {
                      type: "text",
                      text: body.userName,
                      size: "sm",
                      color: "#555555",
                    },
                    {
                      type: "text",
                      text: body.address,
                      size: "sm",
                      color: "#555555",
                      wrap: true,
                    },
                  ],
                },
                {
                  type: "separator",
                  margin: "md",
                },
                {
                  type: "text",
                  text: body.timestamp,
                  size: "xs",
                  color: "#999999",
                  align: "end",
                },
              ],
            },
            styles: {
              header: {
                backgroundColor: "#E6F5EA",
              },
              body: {
                backgroundColor: "#F9F9F9",
              },
            },
          },
        },
      ],
    };

    const response = await $fetch(LINE_API_URL, {
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

    return {
      error: error.message || "An error occurred while sending the message",
    };
  }
});
