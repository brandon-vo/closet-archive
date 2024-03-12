import { lora } from "@/constants/Fonts";
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <main className="flex">
      <section className="w-3/5 flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center">
          <h1
            className={`text-[12vh] font-bold uppercase -mb-[8vh] text-slate-grey ${lora.className}`}
          >
            Virtual
          </h1>
          <h1
            className={`text-[20vh] font-bold uppercase -mb-[4.5vh] text-slate-grey ${lora.className}`}
          >
            Closet
          </h1>
          <h3 className="text-right text-[min(20px,3vh)] text-bv-black">
            A web app to manage your wardrobe
          </h3>
        </div>
      </section>
      <aside className="w-2/5 flex justify-center items-center h-screen bg-green-grey">
        <form className="flex flex-col justify-center w-[50%] gap-2">
          <label htmlFor="email" className="text-bv-black">
            Email
          </label>
          <input
            className="border-2 border-gray-400 rounded-md"
            id="email"
            name="email"
            type="email"
            required
          />
          <label htmlFor="password" className="text-bv-black">
            Password
          </label>
          <input
            className="border-2 border-gray-400 rounded-md"
            id="password"
            name="password"
            type="password"
            required
          />
          <button
            className="bg-lake-blue rounded-md text-bv-white"
            formAction={login}
          >
            Log in
          </button>
          <button
            className="bg-dark-violet rounded-md text-white"
            formAction={signup}
          >
            Create an account
          </button>
        </form>
      </aside>
    </main>
  );
}
