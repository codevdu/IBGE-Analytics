import { AlertCircle } from "lucide-react";
import logo from "../assets/Logo.png";

export default function DashboardHeader() {
  return (
    <header className="w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        <div className="flex items-center">
          <div className="rounded-lg text-white">
            <img 
              src={logo} 
              className="h-10 w-20 sm:h-30 sm:w-40"
              alt="Logo do projeto" />
          </div>

          <div>
            <h1 className="text-sm sm:text-2xl font-bold text-slate-800">
              Brasil em Números
            </h1>
            <p className="text-sm mt-1 text-slate-500">
              Explore dados do Brasil por indicador e região
            </p>
          </div>
        </div>

        {/* Navegação */}
        <nav className="flex items-center justify-center gap-2 md:flex">
          <AlertCircle size={15} />
          <a
            href="#"
            className="font-medium text-slate-600 transition hover:text-emerald-600"
          >
            Sobre os dados
          </a>
        </nav>
      </div>
    </header>
  );
}