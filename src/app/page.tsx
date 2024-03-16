import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import Upload from "@/components/Upload";
import SignOut from "@/components/SignOut";
import Items from "@/components/Items";

export default async function Home() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <nav className="fixed top-0 w-full shadow-lg h-[60px]">
        <div className="flex items-center justify-between w-full h-full px-10 md:px-16">
          <h1>Hello {data.user.email}</h1>
          <SignOut />
        </div>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between py-20 px-12 md:px-24">
        <Items userID={data.user.id} />
        <Upload userID={data.user.id} />
      </main>
    </>
  );
}
