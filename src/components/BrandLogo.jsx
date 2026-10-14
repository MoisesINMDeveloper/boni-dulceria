import logo from '../assets/boni-horizontal.png'
import mobileLogo from '../assets/boni-mobile.png'

export default function BrandLogo({ className = '', useMobileLogo = false }) {
  return (
    <picture className={`brand-logo-frame ${className}`}>
      {useMobileLogo && <source media="(max-width: 767px)" srcSet={mobileLogo} />}
      <img
        src={logo}
        alt="Boni Dulcería · Postres y tortas"
        className="brand-logo"
        width="1600"
        height="499"
      />
    </picture>
  )
}
