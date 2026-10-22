import lightLogo from '../assets/boni-horizontal.png'
import darkLogo from '../LOGOTIPO/PNG/LOGOTIPO HORIZONTAL-02.png'
import { useEffect, useState } from 'react'

export default function BrandLogo({ className = '' }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark'
      setIsDark(isDarkMode)
    }

    checkTheme()

    // Observar cambios en el atributo data-theme
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => observer.disconnect()
  }, [])

  return (
    <picture className={`brand-logo-frame ${className}`}>
      <img
        src={isDark ? darkLogo : lightLogo}
        alt="Boni Dulcería · Postres y tortas"
        className="brand-logo"
        width="1600"
        height="499"
      />
    </picture>
  )
}
