// Minimal inline SVG icons to avoid extra deps
export function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35m1.1-4.65a7.75 7.75 0 1 1-15.5 0 7.75 7.75 0 0 1 15.5 0Z"
      />
    </svg>
  )
}

export function CubeIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path stroke="currentColor" strokeWidth="2" d="M12 2 3 7l9 5 9-5-9-5Z" />
      <path stroke="currentColor" strokeWidth="2" d="M3 17l9 5 9-5" />
      <path stroke="currentColor" strokeWidth="2" d="M3 7v10l9 5 9-5V7" />
    </svg>
  )
}

export function FlaskIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path stroke="currentColor" strokeWidth="2" d="M9 3v5l-5.5 9A3 3 0 0 0 6 21h12a3 3 0 0 0 2.5-4.5L15 8V3" />
      <path stroke="currentColor" strokeWidth="2" d="M9 8h6" />
    </svg>
  )
}

export function BookIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path stroke="currentColor" strokeWidth="2" d="M4 5a3 3 0 0 1 3-3h12v20H7a3 3 0 0 1-3-3V5Z" />
      <path stroke="currentColor" strokeWidth="2" d="M7 2v20" />
    </svg>
  )
}

export function HelpIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path stroke="currentColor" strokeWidth="2" d="M12 17h.01M9 9a3 3 0 1 1 4.8 2.4c-.99.74-1.8 1.6-1.8 2.6v.5" />
      <circle stroke="currentColor" strokeWidth="2" cx="12" cy="12" r="9" />
    </svg>
  )
}

export function BrainIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M8.5 9A3.5 3.5 0 1 1 5 5.5M15.5 9A3.5 3.5 0 1 0 19 5.5M8.5 15A3.5 3.5 0 1 0 5 18.5M15.5 15A3.5 3.5 0 1 1 19 18.5"
      />
      <path stroke="currentColor" strokeWidth="2" d="M12 4v16" />
    </svg>
  )
}
