"use server";

import { redirect } from "next/navigation";

export async function goBackHome() {
  redirect("/");
}
