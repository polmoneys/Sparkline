import { useSearchParams } from 'react-router-dom'
import { type DataPoint } from './types'
import { formatDateTime, formatNumber } from './utils'
import { useCallback } from 'react'

interface Return {
  isPointInUrl: (point: DataPoint) => boolean
  pointForUrl: (point: DataPoint) => Record<'value' | 'date', string>
  pointInUrlDetails: () => Record<'value' | 'date', string> | undefined
  setSearchParams: any
}

function useSparklineUrl(): Return {
  const [searchParams, setSearchParams] = useSearchParams()
  const valueInUrl = searchParams.get('value') ?? 0
  const dateInUrl = searchParams.get('date') ?? ''
  const hasValidPointInUrl = valueInUrl !== 0 && dateInUrl !== ''

  const isPointInUrl = useCallback(
    (point: DataPoint): boolean => {
      const { date: dateAsUrl, value: valueAsUrl } = pointForUrl(point)
      return dateAsUrl === dateInUrl && valueAsUrl === valueInUrl
    },
    [valueInUrl, dateInUrl],
  )

  const pointForUrl = (point: DataPoint): Record<'value' | 'date', string> => ({
    value: formatNumber(point.value, { maximumFractionDigits: 0 }),
    date: formatDateTime(new Date(point.date)).replaceAll('/', '-'),
  })

  const pointInUrlDetails = (): Record<'value' | 'date', string> | undefined =>
    hasValidPointInUrl
      ? {
          value: formatNumber(Number(valueInUrl)),
          date: formatDateTime(new Date(dateInUrl)),
        }
      : undefined

  return {
    isPointInUrl,
    pointForUrl,
    pointInUrlDetails,
    setSearchParams,
  }
}

export default useSparklineUrl
