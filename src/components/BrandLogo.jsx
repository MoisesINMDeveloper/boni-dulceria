import logo from '../assets/boni-horizontal.png'

export default function BrandLogo({ className = '' }) {
  return (
    <picture className={`brand-logo-frame ${className}`}>
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
