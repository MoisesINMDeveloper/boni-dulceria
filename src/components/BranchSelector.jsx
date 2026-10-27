import { ChevronDown, MapPin } from 'lucide-react'
import { branches } from '../data/products.js'
import Dropdown from './Dropdown.jsx'

const branchOptions = branches.map((branch) => ({ value: branch.id, label: branch.name }))

export default function BranchSelector({ value, onChange, className = '' }) {
  return (
    <Dropdown
      className={`branch-selector ${className}`}
      label="Seleccionar sede de entrega"
      value={value}
      options={branchOptions}
      onChange={onChange}
    >
      {(selectedBranch) => (
        <>
          <MapPin size={17} className="branch-selector-pin" aria-hidden="true" />
          <span className="branch-selector-copy" aria-hidden="true">
            <span className="branch-selector-label">PEDIR EN</span>
            <span className="branch-selector-value">{selectedBranch?.label}</span>
          </span>
          <ChevronDown size={14} className="branch-selector-chevron" aria-hidden="true" />
        </>
      )}
    </Dropdown>
  )
}
