export default defineNuxtPlugin((nuxtApp) => {
  const customFetch = $fetch.create({
    onRequest({ options }) {
      if (options.baseURL?.includes("ngrok")) {
        options.headers = {
          ...options.headers,
          "ngrok-skip-browser-warning": "true",
        };
      }
    },
  });

  return {
    provide: {
      customFetch,
    },
  };
});
