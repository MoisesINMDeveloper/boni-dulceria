import { Search, ShoppingBag } from 'lucide-react'
import BrandLogo from './BrandLogo.jsx'
import BranchSelector from './BranchSelector.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function Navbar({ branchId, onChangeBranch, cartCount, onOpenCart, onSearch }) {
  return (
    <header className="app-header fixed inset-x-0 top-0 z-40 border-b border-cocoa/5 bg-cream/85 backdrop-blur-lg dark:border-white/5 dark:bg-brand-dark-card/85">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-7xl flex-col justify-center gap-2 px-4 py-3 sm:px-8 md:h-[76px] md:flex-row md:items-center md:justify-between         md:gap-0 md:py-0"
      >
        <div className="flex items-center justify-between gap-3">
          <a href="#inicio" className="group flex min-w-0 items-center gap-3" aria-label="Boni Dulcería, inicio">
            <BrandLogo className="w-[100%] transition-transform duration-200 group-hover:scale-[1.02] md:w-[176px]" />
          </a>

          <BranchSelector
            value={branchId}
            onChange={onChangeBranch}
            className="branch-selector-mobile"
          />

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
          </div>
        </div>

        <label className="mobile-search md:hidden">
          <Search size={17} className="shrink-0 text-cocoa/45 dark:text-white/45" />
          <input
            type="search"
            onChange={(event) => onSearch(event.target.value)}
            placeholder="¿Qué se te antoja hoy?"
            aria-label="Buscar productos"
            className="dark:text-white dark:placeholder-white/45"
          />
          <span className="search-shortcut dark:text-white/35">⌕</span>
        </label>

        <div className="hidden items-center justify-center gap-8 md:flex md:gap-9">
          <a className="nav-link" href="#menu">Menú</a>
          <a className="nav-link" href="#nosotros">Nuestra historia</a>
          <a className="nav-link" href="#contacto">Contacto</a>
        </div>

        <BranchSelector
          value={branchId}
          onChange={onChangeBranch}
          className="branch-selector-desktop"
        />

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Abrir carrito, ${cartCount} productos`}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-cocoa/10 bg-white/70 text-cocoa transition hover:border-cocoa hover:bg-white dark:border-white/10 dark:bg-brand-dark-card/70 dark:text-white dark:hover:border-white dark:hover:bg-brand-dark-card"
          >
            <ShoppingBag size={19} strokeWidth={1.7} />
            <span className="absolute -right-1 -top-1 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-caramel px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </button>
        </div>
      </nav>
    </header>
  )
}
