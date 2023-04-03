import { type Series } from '../types'
import { classes } from '../utils'
import styles from '../index.module.css'

export interface FocusProps {
  series: Series
  className?: string
}

const Focus = ({ series, className }: FocusProps): JSX.Element => {
  const toggleVisibility = (
    index: number,
    area = false,
    areaHideOpacity = 0,
    // TODO: fix 'var(--sparkline-area-dim)',
    areaShowOpacity = 0.3,
    // TODO: fix 'var(--sparkline-spark-dim)',
    pathHideOpacity = 0.1,
    pathShowOpacity = 1,
  ): void => {
    const className = !area ? `serie-${index}` : `serie-${index}-area`
    const elements = document.getElementsByClassName(className)
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      const currentOpacity = parseFloat(element.getAttribute('opacity') ?? '1')
      console.log({ currentOpacity })

      const isVisible = !area
        ? currentOpacity === Number(pathShowOpacity)
        : currentOpacity === Number(areaShowOpacity)
      const hideOpacity = !area ? pathHideOpacity : areaHideOpacity
      const visibleOpacity = !area ? pathShowOpacity : areaShowOpacity

      const newOpacity = isVisible ? hideOpacity : visibleOpacity
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
                toggleVisibility(index)
              }}
              className={styles.button}
            >
              Spark
            </button>
            <button
              onClick={() => {
                toggleVisibility(index, true)
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
  <button type="button" onClick={onClick} className={styles.iconButton}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" />
      <path
        stroke="var(--sparkline-ui-fill)"
        fill="var(--sparkline-ui-fill)"
        d="M13.9 22a1 1 0 0 1-.6-.2l-4-3.05a1 1 0 0 1-.39-.8v-3.27l-4.8-9.22A1 1 0 0 1 5 4h14a1 1 0 0 1 .86.49 1 1 0 0 1 0 1l-5 9.21V21a1 1 0 0 1-.55.9 1 1 0 0 1-.41.1z"
      />
    </svg>
  </button>
)

Focus.Trigger = Trigger

export default Focus
