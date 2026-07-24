import { AlertCircle } from "lucide-react";
import logo from "../assets/Logo.png";

export default function DashboardHeader() {
  return (
    <header className="w-full border-b p-0.5   border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-1 py-2 sm:px-4 sm:py-3">

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img
            src={logo}
            alt="Logo do projeto"
            className="-ml-3 h-13 w-auto sm:h-10 md:h-12 lg:h-19"
          />

          <div className="min-w-0 -ml-5 sm:-ml-7">
            <h1 className="truncate text-md font-bold text-slate-800 sm:text-sm md:text-lg lg:text-2xl">
              Brasil em Números
            </h1>

            <p className="text-[11px] leading-tight text-slate-700 sm:text-[10px] md:text-xs lg:text-sm">
              Explore dados do Brasil por indicador e região
            </p>
          </div>
        </div>

        {/* Navegação */}
        <nav className="ml-2 mr-2 flex shrink-0 items-center gap-1 sm:gap-2">
          <AlertCircle className="h-3 w-3 text-slate-600 sm:h-4 sm:w-4 md:h-5 md:w-5" />

          <span className="text-[9px] font-medium text-slate-600 sm:text-[10px] md:text-xs lg:text-sm">
            Sobre os dados
          </span>
        </nav>
      </div>
    </header>
  );
}