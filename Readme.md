## TLDR

Sparklines with `svg` & `react`. [Demo](https://polmoneys.github.io/Sparkline/)

### Sparkline

Tiny/Dense **sparklines** where the initial goal of this exploration. It could do **exports**, **captions**, **tooltips**, **crosshairs**, **dimming** for extra focus...On `v2-beta` added built in **url** sync with `react-router` and **excel** export. 

```ts

// Sparkline with customTooltip and custom line/circle appearance...
<Sparkline
  series={datum}
  TooltipComponent={CustomTooltip}
  height={height}
  width={width}
  circleRadius={circleRadius}
  lineColors={palette}
  circleColors={palette}
/>

// Add crosshair, dimming, export, syncs Url with point...
const { setSearchParams, pointInUrlDetails } = useSparklineUrl()

<Mouse series={datum}>
  {active => (
    <Sparkline
      series={datum}
      activeIndex={active}
      height={height}
      width={width}
      canDim
      canExport
      exportSchema={schema}
      onSelectPointToUrl={point => {
        setSearchParams(point)
      }}
    />
  )}
</Mouse>

// display output
{pointInUrlDetails() !== undefined && (
  <Card
    value={pointInUrlDetails().value }
    label={pointInUrlDetails().date }
    onClick={() => {
      setSearchParams()
    }}
  />
)}

// Add sliding window, dragging a rectangle to select points...
const [selectedPoints, setPoints] = useState<DataPoints>([])

<Window series={datum} windowSize={30}>
{sliced => (
  <Fragment>
    <Mouse series={datum} windowSize={30}>
      {active => (
        <Sparkline
          series={datum}
          points={sliced}
          activeIndex={active}
          width={width}
          height={height}
          onSelectPoints={selection => {
            setPoints(selection)
          }}
          canSelect
        />
      )}
    </Mouse>
      <p>
        <b>Range:</b>
        {formatDateTime(new Date(sliced[0][0].date))}-
        {formatDateTime(
          new Date(sliced[0][sliced[0].length - 1].date as Date),
        )}
      </p>
  </Fragment>
)}
</Window>

// display output
{selectedPoints?.map((p, i) => (
  <Card
    key={p.label}
    value={formatNumber(p.value)}
    label={p.label}
    onClick={() => {
      setPoints([])
    }}
  />
))}

```


### FAQ 

You **must** set some css custom properties to style it all, these are decent defaults:

```css

:root {
  --sparkline-ui-fill: hsla(250, 11%, 37%, 1);
  --sparkline-ui-color: #f5f5f7;
  --sparkline-transparent: rgba(0, 0, 0, 0.001);
  --sparkline-border: 1px solid hsl(0, 4%, 94%);
  --sparkline-z-actions: 99;
  --sparkline-gap: 0.5em;
  /* selection */
  --sparkline-rect-color: rgba(0, 0, 255, 0.2);
  --sparkline-rect-stroke: blue;
  --sparkline-z-rect: 9;

}

```

### Prior work 

Isometric [charts](https://github.com/polmoneys/charts) and [waffle](https://github.com/polmoneys/Waffle)

### Inspiration 💐

> Our requirements are more modest but at the same time more responsible: 
> buildings, furniture, drinking glasses may well be consumer items that 
> we can destroy without regret after they have served for some short or 
> long period, but while we use them we expect them to fullfill their role and serve us perfectly, so perfectly that we can also derive aesthetic 
> enjoyment from observing them in use. 

Erik Gunnar Asplund on **Swedish Grace**.


