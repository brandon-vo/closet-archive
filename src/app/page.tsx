import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { signout } from "./actions";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello {data.user.email}
      <form>
        <button formAction={signout}>Sign out</button>
      </form>
    </main>
  );
}
