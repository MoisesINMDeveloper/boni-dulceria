import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.js'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-cocoa/10 bg-white/70 text-cocoa transition hover:border-cocoa hover:bg-white md:h-11 md:w-11 dark:border-white/10 dark:bg-brand-dark-card/70 dark:text-white dark:hover:border-white dark:hover:bg-brand-dark-card"
    >
      {isDark ? (
        <Sun size={18} strokeWidth={1.7} className="md:size-[19px]" />
      ) : (
        <Moon size={18} strokeWidth={1.7} className="md:size-[19px]" />
      )}
    </button>
  )
}
