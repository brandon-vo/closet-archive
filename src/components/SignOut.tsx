import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SignOut() {
  const signout = async () => {
    "use server";

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      redirect("/error");
    }

    redirect("/login");
  };
  return (
    <form action={signout}>
      <button className="absolute top-7 right-7 text-calm-violet drop-shadow">
        <LogoutIcon />
      </button>
    </form>
  );
}
