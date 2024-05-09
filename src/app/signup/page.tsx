import { lora } from "@/constants/Fonts";
import { signUp } from "./actions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="flex flex-col justify-center items-center w-screen h-screen">
      <h1
        className={`title-shadow text-[10vh] font-bold uppercase text-dark-grey ${lora.className}`}
      >
        Sign Up
      </h1>
      <section className="panel-shadow relative flex justify-center items-center bg-calm-green w-[30vw] h-[20vw] min-w-[400px] min-h-[300px] rounded-xl">
        <Link className="absolute top-5 left-5" href="/login">
          <ArrowBackIcon className="text-dark-grey" />
        </Link>
        <form autoComplete="off" className="flex flex-col gap-5 w-[75%]">
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
          <input
            className="icon-input password input-shadow font-bold rounded-md py-1 px-4"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
          />
          <div className="flex justify-center gap-1">
            <button
              className="button-shadow bg-lake-blue font-bold rounded-full text-bv-white rounded-full py-2 w-full"
              formAction={signUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
