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
      <button className="bg-dark-violet text-white px-3 py-1.5 rounded-xl neu-button">
        <LogoutIcon />
      </button>
    </form>
  );
}
