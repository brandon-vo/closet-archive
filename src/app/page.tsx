import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import SignOut from "@/components/SignOut";
import Items from "@/components/Items";
import BottomBar from "@/components/BottomBar";
import UploadModal from "@/components/UploadModal/UploadModal";

export default async function Home() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <SignOut />
      <main className="flex h-screen overflow-y-hidden flex-col py-10 px-12 md:px-36">
        <h1 className="text-dark-grey text-2xl font-bold">Closet Archive</h1>
        <Items userID={data.user.id} />
        <UploadModal userID={data.user.id} />
        <BottomBar />
      </main>
    </>
  );
}
