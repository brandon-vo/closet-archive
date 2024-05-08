import { lora } from "@/constants/Fonts";
import { signUp } from "./actions";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <section className="relative flex justify-center items-center bg-calm-green w-[30vw] h-[30vw] min-w-[400px] min-h-[400px] rounded-xl">
        <Link className="absolute top-5 left-5" href="/login">
          <span>Go Back</span>
        </Link>
        <form className="flex flex-col gap-5 w-[60%]">
          <input
            className="icon-input email font-bold rounded-md py-1 px-4"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="icon-input password font-bold rounded-md py-1 px-4"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <input
            className="icon-input password font-bold rounded-md py-1 px-4"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
          />
          <div className="flex justify-center gap-1">
            <button
              className="bg-lake-blue font-bold rounded-full text-bv-white rounded-full py-2 w-full"
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
