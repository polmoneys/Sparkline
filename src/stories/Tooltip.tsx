import { type DataPoint } from '@/lib/Sparkline/types'
import { formatNumber } from '@/lib/Sparkline/utils'

interface TooltipProps {
  point: DataPoint | null
  x: number
  y: number
  color: string
  serie: string
}

const Tooltip = (props: TooltipProps): JSX.Element | null => {
  const { point, color, x, y, serie } = props
  if (point == null) return null
  const { label, value } = point
  return (
    <div
      aria-hidden="true"
      className="tooltip"
      style={{
        backgroundColor: color,
        left: x,
        top: y,
      }}
    >
      <p>
        {serie} <b>{label}</b> <span>{formatNumber(value)}</span>
      </p>
    </div>
  )
}

export default Tooltip
