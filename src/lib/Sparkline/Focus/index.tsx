import { type Series } from '../types'
import { classes } from '../utils'
import styles from '../index.module.css'
import Icon from '../Icons'

export interface FocusProps {
  series: Series
  className?: string
}

const Focus = ({ series, className }: FocusProps): JSX.Element => {
  const toggleLine = (index: number): void => {
    const className = `path.serie-${index}`
    const element = document.querySelector(className)
    if (element != null) {
      const currentOpacity = parseFloat(element.getAttribute('opacity') ?? '1')
      const isVisible = currentOpacity !== 0.1
      const newOpacity = isVisible ? 0.1 : 1
      element.setAttribute('opacity', newOpacity.toString())
    }
  }
  const toggleArea = (index: number): void => {
    const className = `path.serie-${index}-area`
    const element = document.querySelector(className)
    if (element != null) {
      const currentOpacity = parseFloat(element.getAttribute('opacity') ?? '1')
      const isVisible = currentOpacity !== 0.1
      const newOpacity = isVisible ? 0.1 : 0.6
      element.setAttribute('opacity', newOpacity.toString())
    }
  }

  return (
    <div className={classes(styles.caption, className)} aria-hidden="true">
      <div className={styles.row}>
        {series.map((serie, index) => (
          <div className={styles.row} key={index}>
            <p>{serie.name}</p>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <circle cx={12} cy={12} r={8} fill={serie.color} />
            </svg>
            <button
              onClick={() => {
                toggleLine(index)
              }}
              className={styles.button}
            >
              Spark
            </button>
            <button
              onClick={() => {
                toggleArea(index)
              }}
              className={styles.button}
            >
              Area
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const Trigger = ({ onClick }: { onClick: () => void }): JSX.Element => (
  <button type="button" onClick={onClick}>
    <Icon name="filter" />
  </button>
)

Focus.Trigger = Trigger

export default Focus
