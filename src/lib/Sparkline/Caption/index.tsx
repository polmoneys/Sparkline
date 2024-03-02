import { Fragment } from 'react'
import styles from '../index.module.css'
import { type Captions, type Series } from '../types'
import { classes } from '../utils'
import Focus from '../Focus'
import Icon from '../Icons'

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
    <button type="button" onClick={onClick}>
      <Icon name="caption" />
    </button>
  )
}

Caption.Trigger = Trigger
export default Caption
