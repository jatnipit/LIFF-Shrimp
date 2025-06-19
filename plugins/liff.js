import { defineNuxtPlugin } from "#app";
import liff from "@line/liff";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const liffId = config.public.liffId;

  try {
    await liff.init({ liffId });

    if (!liff.isLoggedIn) {
      liff.login();
    }

    nuxtApp.provide("liff", liff);
  } catch (error) {
    console.error(error);
  }
});
