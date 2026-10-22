import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('boni-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      setIsDark(false)
      document.documentElement.removeAttribute('data-theme')
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    if (newIsDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('boni-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('boni-theme', 'light')
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-cocoa/10 bg-white/70 text-cocoa transition hover:border-cocoa hover:bg-white md:h-11 md:w-11 dark:border-white/10 dark:bg-brand-dark-card/70 dark:text-white dark:hover:border-white dark:hover:bg-brand-dark-card"
    >
      {isDark ? (
        <Sun size={18} strokeWidth={1.7} className="md:size-19" />
      ) : (
        <Moon size={18} strokeWidth={1.7} className="md:size-19" />
      )}
    </button>
  )
}