import { lora } from "@/constants/Fonts";
import { login } from "./actions";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex flex-col lg:flex-row h-screen">
      <section className="w-full lg:w-3/5 flex justify-center items-center h-[60%] lg:h-screen">
        <div className="flex flex-col justify-center xl:mb-[3vh]">
          <h1
            className={`title-shadow text-[min(15vw,13vh)] md:text-[12vh] xl:text-[16vh] text-right font-bold uppercase -mb-[min(8vw,8vh)] xl:-mb-[10vh] text-dark-grey ${lora.className}`}
          >
            Closet
          </h1>
          <h1
            className={`title-shadow text-[min(15vw,13vh)] md:text-[12vh] xl:text-[16vh] font-bold uppercase -mb-[min(3.5vw,4vh)] text-dark-grey ${lora.className}`}
          >
            Archive
          </h1>
          <h3 className="text-left text-[min(18px,2.5vw)] lg:text-[min(20px,2.5vw)] text-slate-grey font-medium">
            Digitally organize your wardrobe and record outfits
          </h3>
        </div>
      </section>
      <aside className="panel-shadow w-full lg:w-2/5 h-full lg:h-screen flex flex-col justify-center items-center rounded-t-[3vh] lg:rounded-l-[3vh] lg:rounded-tr-[0] bg-calm-green">
        <form
          autoComplete="off"
          className="flex flex-col justify-center w-full gap-4 px-20 2xl:px-24"
        >
          <input
            className="icon-input email input-shadow font-bold rounded-md py-1 px-4"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="icon-input password input-shadow font-bold rounded-md py-1 px-4"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <div className="flex flex-col xl:flex-row items-center justify-center gap-4">
            <button
              className="button-shadow bg-lake-blue hover:brightness-95 font-bold rounded-full text-bv-white rounded-full py-2 w-full xl:w-1/2-DISABLED transition"
              formAction={login}
            >
              Login
            </button>
            {/* <button
              className="icon-input google button-shadow hover:brightness-95 font-bold rounded-full text-dark-grey rounded-full py-2 w-full xl:w-1/2 h-full transition"
              formAction={loginWithGoogle}
            >
              Sign in with Google
            </button> */}
          </div>
          <div className="flex justify-center gap-1 text-dark-grey">
            Don’t have an account?
            <Link className="font-bold" href={"/signup"}>
              Sign Up
            </Link>
          </div>
        </form>
      </aside>
    </main>
  );
}
