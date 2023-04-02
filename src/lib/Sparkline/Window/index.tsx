import { type ChangeEvent, Fragment, type ReactNode, useState } from 'react'
import { type Series, type DataPoint } from '../types'
import styles from '../index.module.css'

interface WindowProps {
  series: Series
  children: (sliced: DataPoint[][]) => ReactNode
  windowSize: number
}

const Window = (props: WindowProps): JSX.Element => {
  const { series, children, windowSize } = props
  const [windowStart, setWindowStart] = useState(0)
  const points = series.map(item => item.points)

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setWindowStart(parseInt(event.target.value, 10))
  }

  const sliced = points.map(dataset =>
    dataset.slice(windowStart, windowStart + windowSize),
  )

  const maxValue = Math.max(
    ...points.map(dataset => dataset.length - windowSize),
  )

  return (
    <Fragment>
      {children(sliced)}
      <input
        className={styles.range}
        type="range"
        min={0}
        max={maxValue}
        value={windowStart}
        onChange={onChange}
      />
    </Fragment>
  )
}

export default Window
