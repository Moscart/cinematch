"use server";

import translate from "google-translate-api-x";

export async function translateToId(text: string | string[]) {
  const res = await translate(text, { to: "id" });
  return JSON.stringify(res);
}
