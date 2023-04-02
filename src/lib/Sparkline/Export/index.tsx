import styles from '../index.module.css'

export type ExportFormat = 'svg' | 'png' | 'jpeg'

interface ExportProps {
  filename?: string
  format?: ExportFormat
  onExport?: (format: ExportFormat) => void
  onError?: (error: any) => void
  divRef: any
}

const Export = (props: ExportProps): JSX.Element => {
  const {
    filename = 'chart',
    format = 'svg',
    onExport,
    onError,
    divRef,
  } = props

  const exportChart = async () => {
    const svgElement = divRef.current?.querySelector('svg')
    if (svgElement == null) return

    if (format === 'svg') {
      const serializer = new XMLSerializer()
      const source =
        '<?xml version="1.0" standalone="no"?>\r\n' +
        serializer.serializeToString(svgElement)
      const url =
        'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)

      download(url, `${filename}.svg`)
    } else {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const svgData = new XMLSerializer().serializeToString(svgElement)
      const img = new Image()

      img.onload = () => {
        if (ctx != null) {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)

          canvas.toBlob(blob => {
            if (blob != null) {
              const url = URL.createObjectURL(blob)
              download(url, `${filename}.${format}`)
            }
          }, `image/${format}`)
        }
      }

      img.src =
        'data:image/svg+xml;base64,' +
        btoa(unescape(encodeURIComponent(svgData)))
    }

    onExport?.(format)
  }

  const download = (url: string, filename: string): void => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }

  return (
    <button
      className={`${styles.iconButton} ${styles.mlAuto}`}
      onClick={() => {
        void (async () => {
          try {
            await exportChart()
          } catch (error) {
            onError?.(error)
          }
        })()
      }}
    >
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <rect width="24" height="24" opacity="0" />
        <path
          stroke="var(--sparkline-ui-fill)"
          fill="var(--sparkline-ui-fill)"
          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.69 11.86l-3 2.86a.49.49 0 0 1-.15.1.54.54 0 0 1-.16.1.94.94 0 0 1-.76 0 1 1 0 0 1-.33-.21l-3-3a1 1 0 0 1 1.42-1.42l1.29 1.3V8a1 1 0 0 1 2 0v5.66l1.31-1.25a1 1 0 0 1 1.38 1.45z"
        />
      </svg>
    </button>
  )
}

export default Export
