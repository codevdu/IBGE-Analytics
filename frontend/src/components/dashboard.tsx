import { Filter } from "./filter";

export function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <Filter />
      </div>
    </main>
  );
}