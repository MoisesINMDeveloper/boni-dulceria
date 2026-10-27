import { Check } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

// Accessible single-select dropdown (button + listbox) that replaces the unstyleable
// native <select> popup. The caller renders the visible trigger content through
// `children(selectedOption)`; a transparent button stretched over it handles interaction.
export default function Dropdown({ value, options, onChange, label, className = '', children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const listRef = useRef(null)
  const listId = useId()
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value))
  const selectedOption = options[selectedIndex]

  const open = () => {
    setActiveIndex(selectedIndex)
    setIsOpen(true)
  }

  const close = ({ restoreFocus = true } = {}) => {
    setIsOpen(false)
    if (restoreFocus) triggerRef.current?.focus()
  }

  const select = (index) => {
    const option = options[index]
    if (option.value !== value) onChange(option.value)
    close()
  }

  useEffect(() => {
    if (!isOpen) return undefined

    listRef.current?.focus()
    const closeOnOutsidePointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsidePointer)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer)
  }, [isOpen])

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      open()
    }
  }

  const handleListKeyDown = (event) => {
    const lastIndex = options.length - 1
    const keyActions = {
      ArrowDown: () => setActiveIndex((index) => (index === lastIndex ? 0 : index + 1)),
      ArrowUp: () => setActiveIndex((index) => (index === 0 ? lastIndex : index - 1)),
      Home: () => setActiveIndex(0),
      End: () => setActiveIndex(lastIndex),
      Enter: () => select(activeIndex),
      ' ': () => select(activeIndex),
      Escape: () => close(),
    }

    if (event.key === 'Tab') {
      close({ restoreFocus: false })
      return
    }
    if (!keyActions[event.key]) return
    event.preventDefault()
    keyActions[event.key]()
  }

  return (
    <div ref={rootRef} className={`dropdown ${className}${isOpen ? ' is-open' : ''}`}>
      {children(selectedOption)}
      <button
        ref={triggerRef}
        type="button"
        className="dropdown-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        aria-label={`${label}: ${selectedOption?.label}`}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleTriggerKeyDown}
      />
      {isOpen && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          aria-activedescendant={`${listId}-${activeIndex}`}
          tabIndex={-1}
          className="dropdown-list"
          onKeyDown={handleListKeyDown}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              className={`dropdown-option${index === activeIndex ? ' is-active' : ''}`}
              onPointerMove={() => setActiveIndex(index)}
              onClick={() => select(index)}
            >
              <span>{option.label}</span>
              {index === selectedIndex && <Check size={14} strokeWidth={2.4} aria-hidden="true" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
