import lightLogo from '../assets/boni-horizontal.png'
import darkLogo from '../LOGOTIPO/PNG/LOGOTIPO HORIZONTAL-02.png'
import { useTheme } from '../hooks/useTheme.js'

export default function BrandLogo({ className = '' }) {
  const { isDark } = useTheme()

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
