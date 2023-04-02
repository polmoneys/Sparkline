import { Fragment } from 'react'
import styles from '../index.module.css'
import { type Captions, type Series } from '../types'
import { classes } from '../utils'
import Focus from '../Focus'

export interface CaptionProps {
  caption: string
  series: Series
  className?: string
  kind: Captions | null
}

function Caption(props: CaptionProps): JSX.Element {
  if (props.kind === null) return <Fragment />
  const { caption, series, className } = props
  if (props.kind === 'focus')
    return <Focus className={className} series={series} />

  return (
    <div className={classes(styles.caption, className)} aria-hidden="true">
      <p>{caption} </p>
      <div className={classes(styles.gap, styles.row)}>
        {series.map(serie => (
          <div className={styles.row} key={serie.name}>
            <p>{serie.name}</p>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <circle cx={12} cy={12} r={8} fill={serie.color} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}

function Trigger({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <button onClick={onClick} className={styles.iconButton}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" transform="rotate(180 12 12)" />
        <path
          stroke="var(--sparkline-ui-fill)"
          fill="var(--sparkline-ui-fill)"
          d="M21 4.34a1.24 1.24 0 0 0-1.08-.23L13 5.89v14.27l7.56-1.94A1.25 1.25 0 0 0 21.5 17V5.32a1.25 1.25 0 0 0-.5-.98z"
        />
        <path
          stroke="var(--sparkline-ui-fill)"
          fill="var(--sparkline-ui-fill)"
          d="M11 5.89L4.06 4.11A1.27 1.27 0 0 0 3 4.34a1.25 1.25 0 0 0-.48 1V17a1.25 1.25 0 0 0 .94 1.21L11 20.16z"
        />
      </svg>
    </button>
  )
}

Caption.Trigger = Trigger
export default Caption
