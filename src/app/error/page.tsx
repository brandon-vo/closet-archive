import { goBackHome } from "./actions";

export default function ErrorPage() {
  return (
    <main className="flex flex-col gap-2 w-screen h-screen justify-center items-center">
      <p className="font-bold text-2xl">Oops! Something went wrong :(</p>
      <form>
        <button
          className="button-shadow bg-lake-blue rounded-md px-3 py-1.5 shadow-md text-white hover:brightness-95 transition"
          formAction={goBackHome}
        >
          Home
        </button>
      </form>
    </main>
  );
}
