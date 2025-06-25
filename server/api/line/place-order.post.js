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
      to: "U0ed9e278767e8095adcbdf0980d4fbd7",
      messages: [
        {
          type: "flex",
          altText: "สรุปรายการคำสั่งซื้อ",
          contents: {
            type: "bubble",
            header: {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "text",
                  text: "คำสั่งซื้อ",
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
                    {
                      type: "text",
                      text: "สถานะ: ชำระเงินเรียบร้อย",
                      color: "#00C300",
                      size: "md",
                      weight: "bold",
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
            footer: {
              type: "box",
              layout: "vertical",
              spacing: "sm",
              contents: [
                {
                  type: "button",
                  style: "primary",
                  color: "#1DB446",
                  action: {
                    type: "postback",
                    label: "พร้อมส่ง",
                    data: JSON.stringify({
                      action: "confirmOrder",
                      menu: body.order.name,
                      price: body.order.price,
                      userName: body.userName,
                      address: body.address,
                    }),
                    displayText: "พร้อมส่ง",
                  },
                },
              ],
            },
            styles: {
              body: {
                separator: true,
                backgroundColor: "#F9F9F9",
              },
              header: {
                backgroundColor: "#E6F5EA",
              },
              footer: {
                backgroundColor: "#F9F9F9",
              },
            },
          },
        },

        {
          type: "image",
          originalContentUrl: body.receiptUrl,
          previewImageUrl: body.receiptUrl,
        },
      ],
    };

    const response = await $fetch(LINE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(messagePayload),
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
