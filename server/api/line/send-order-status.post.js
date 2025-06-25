export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

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
          altText: "อาหารของคุณกำลังไปส่ง",
          contents: {
            type: "bubble",
            header: {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "text",
                  text: `สถานะ: ${body.status}`,
                  weight: "bold",
                  size: "xl",
                  color: "#1DB446",
                  flex: 1,
                },
              ],
            },
            body: {
              type: "box",
              layout: "vertical",
              spacing: "lg",
              contents: [
                {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: `เมนู: ${body.order.name}`,
                      size: "md",
                      weight: "bold",
                    },
                    {
                      type: "text",
                      text: `ราคา: ${body.order.price} บาท`,
                      size: "md",
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
                  margin: "md",
                  contents: [
                    {
                      type: "text",
                      text: "ผู้รับ",
                      weight: "bold",
                      size: "md",
                      color: "#111111",
                    },
                    {
                      type: "text",
                      text: body.userName,
                      wrap: true,
                      size: "sm",
                      color: "#555555",
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  margin: "md",
                  contents: [
                    {
                      type: "text",
                      text: "ที่อยู่จัดส่ง",
                      weight: "bold",
                      size: "md",
                      color: "#111111",
                    },
                    {
                      type: "text",
                      text: body.address,
                      wrap: true,
                      size: "sm",
                      color: "#555555",
                    },
                  ],
                },
              ],
            },

            styles: {
              header: {
                backgroundColor: "#E6F5EA",
              },
              body: {
                separator: true,
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
      message: `${body.status} status sent successfully `,
      data: response,
    };
  } catch (error) {
    console.error("Error sending order status:", error);
    return { error: "Failed to send order status" };
  }
});
