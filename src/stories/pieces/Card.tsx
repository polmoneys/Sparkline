import { type ReactNode } from 'react'
import styles from '@/lib/Sparkline/index.module.css'

function Card({
  label,
  value,
  onClick,
}: {
  label: string
  value: string
  onClick?: () => void
}): JSX.Element {
  return (
    <div className="card">
      <ul>
        <li>
          <b>{value}</b>
        </li>
        <li>{label}</li>
      </ul>
      {onClick !== undefined && (
        <button type="button" onClick={onClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M7.49991 0.877075C3.84222 0.877075 0.877075 3.84222 0.877075 7.49991C0.877075 11.1576 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1576 14.1227 7.49991C14.1227 3.84222 11.1576 0.877075 7.49991 0.877075ZM3.85768 3.15057C4.84311 2.32448 6.11342 1.82708 7.49991 1.82708C10.6329 1.82708 13.1727 4.36689 13.1727 7.49991C13.1727 8.88638 12.6753 10.1567 11.8492 11.1421L3.85768 3.15057ZM3.15057 3.85768C2.32448 4.84311 1.82708 6.11342 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C8.88638 13.1727 10.1567 12.6753 11.1421 11.8492L3.15057 3.85768Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      )}
    </div>
  )
}

Card.XL = ({ children }: { children: ReactNode }) => {
  return <div className="card xl">{children}</div>
}
export default Card
