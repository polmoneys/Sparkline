import { Fragment, useCallback } from 'react'
import writeXlsxFile from 'write-excel-file'
import {
  type ExportFormat,
  type ExportExcelSchema,
  type DataPoints,
  type Series,
} from '../types'
import Icon from '../Icons'

interface ExportProps {
  filename?: string
  format?: ExportFormat
  onExport?: (format: ExportFormat) => void
  onError?: (error: any) => void
  divRef: any
  schema?: ExportExcelSchema
  items: DataPoints[]
  seriesProp: Series
}

const Export = (props: ExportProps): JSX.Element => {
  const {
    filename = 'chart',
    format = 'svg',
    onExport,
    onError,
    divRef,
    schema,
    items,
    seriesProp,
  } = props

  const exportChart = async (): Promise<void> => {
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

  const canExportExcel = schema !== undefined

  const exportFile = useCallback(async (): Promise<void> => {
    if (!canExportExcel) return
    const datum = items
      .map((serie, datasetIndex) =>
        serie.map(item => ({
          ...item,
          serie: seriesProp[datasetIndex].name,
        })),
      )
      .flat()
    try {
      await writeXlsxFile(datum, {
        schema,
        fileName: `${filename}-excel.xlsx`,
        stickyColumnsCount: 2,
        sheet: 'KIT',
      })
    } catch (error) {
      onError?.(error)
    }
  }, [items, schema])

  return (
    <Fragment>
      <button
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
        <Icon name="chart" />
      </button>
      {canExportExcel && (
        <button
          onClick={() => {
            void (async () => {
              try {
                await exportFile()
              } catch (error) {
                onError?.(error)
              }
            })()
          }}
        >
          <Icon name="file" />
        </button>
      )}
    </Fragment>
  )
}

export default Export
