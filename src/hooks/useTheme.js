import { useCallback, useSyncExternalStore } from 'react'

const THEME_STORAGE_KEY = 'boni-theme'
// Browser UI color (mobile address bar) per theme; must match index.html.
const BROWSER_THEME_COLORS = { light: '#DBDBD3', dark: '#1A1D26' }

// The <html data-theme> attribute is the single source of truth.
// index.html sets it before the first paint; every consumer subscribes to it.
function subscribe(onChange) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

function getIsDark() {
  return document.documentElement.getAttribute('data-theme') === 'dark'
}

export function useTheme() {
  const isDark = useSyncExternalStore(subscribe, getIsDark)

  const toggleTheme = useCallback(() => {
    const nextTheme = getIsDark() ? 'light' : 'dark'

    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', BROWSER_THEME_COLORS[nextTheme])

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }, [])

  return { isDark, toggleTheme }
}
