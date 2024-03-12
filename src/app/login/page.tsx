import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <main className="flex">
      <section className="w-3/5 flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center">
          <h1 className="text-7xl font-semibold">Virtual Closet</h1>
          <h3 className="text-md">A web app to manage your wardrobe</h3>
        </div>
      </section>
      <aside className="w-2/5 flex justify-center items-center h-screen">
        <form className="flex flex-col justify-center w-[50%] gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="border-2 border-gray-400 rounded-md"
            id="email"
            name="email"
            type="email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className="border-2 border-gray-400 rounded-md"
            id="password"
            name="password"
            type="password"
            required
          />
          <button
            className="bg-blue-400 rounded-md text-white"
            formAction={login}
          >
            Log in
          </button>
          <button
            className="bg-blue-400 rounded-md text-white"
            formAction={signup}
          >
            Sign up
          </button>
        </form>
      </aside>
    </main>
  );
}
