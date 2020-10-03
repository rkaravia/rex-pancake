<script>
  import Breakpoint from "./Breakpoint.svelte";
  import BreakpointMin from "./BreakpointMin.svelte";
  import BreakpointMax from "./BreakpointMax.svelte";
  import * as Pancake from "@sveltejs/pancake";
  import { data, formatDateLong, formatDateShort } from "../helpers";

  const x1 = 0;
  const x2 = data.length - 1;
  const y1 = 0;
  const y2 = Math.max(...data.map(row => row.y));

  const xAxisTicks = data
    .filter(({ date }) => date.getUTCDate() === 1)
    .map(({ x }) => x);

  const averageAnnotationPoint = getAverageAnnotationPoint(data);

  function getAverageAnnotationPoint(data) {
    const maxAverage = Math.max(...data.map(row => row.yRollingAverage));
    const maxAverageRow = data.find(row => row.yRollingAverage === maxAverage);
    return { x: maxAverageRow.x, y: maxAverageRow.yRollingAverage };
  }
</script>

<style>
  .chart {
    overflow: hidden;
  }

  .chart__content {
    display: flex;
    margin-left: 50px;
    margin-bottom: 30px;
  }

  .layer {
    width: 100%;
    margin-right: -100%;
  }

  .chart-height {
    height: 200px;
  }

  .tick {
    position: absolute;
    bottom: -8px;
    height: 8px;
    border-left: 1px solid #ccc;
  }

  .x.label {
    position: absolute;
    left: -8px;
    bottom: -24px;
  }

  .y.label {
    position: absolute;
    right: calc(100% + 12px);
    text-align: right;
    bottom: -8px;
  }

  .grid-line {
    position: absolute;
    left: -8px;
    width: calc(100% + 16px);
    border-bottom: 1px solid #ccc;
  }

  .cases-day {
    fill: #9ecae1;
  }

  .cases-week-average {
    stroke: #3182bd;
    stroke-width: 2px;
    fill: none;
  }

  .annotation {
    position: absolute;
    bottom: 0;
    display: flex;
  }

  .annotation__line {
    width: 32px;
    margin-top: 10px;
    border-left: 1px solid;
    border-top: 1px solid;
    border-top-left-radius: 4px;
  }

  .annotation__content {
    margin-left: 4px;
    white-space: nowrap;
  }
</style>

<div class="chart">
  <div class="chart__content">
    <div class="layer chart-height">
      <Pancake.Chart {x1} {x2} {y1} {y2}>
        <Pancake.Grid horizontal count={3} let:value>
          <div class="grid-line" />
          <span class="y label">{value}</span>
        </Pancake.Grid>

        <Pancake.Svg>
          {#each data as { x, y }}
            <Pancake.SvgRect
              x1={x - 0.5}
              x2={x + 0.5}
              y1={0}
              y2={y}
              let:x
              let:y
              let:width
              let:height
              let:value>
              <rect class="cases-day" {x} {y} width={width * 0.9} {height} />
            </Pancake.SvgRect>
          {/each}

          <Pancake.SvgLine {data} y={d => d.yRollingAverage} let:d>
            <path class="cases-week-average" {d} />
          </Pancake.SvgLine>
        </Pancake.Svg>

        <Pancake.Point {...averageAnnotationPoint}>
          <div class="annotation">
            <div class="annotation__line" />
            <div class="annotation__content">Moyenne sur 7 jours</div>
          </div>
        </Pancake.Point>
      </Pancake.Chart>
    </div>

    <div class="layer chart-height">
      <Breakpoint>
        <BreakpointMax width={549}>
          <div class="chart-height">
            <Pancake.Chart {x1} {x2} {y1} {y2}>
              <Pancake.Grid vertical ticks={xAxisTicks} let:value>
                <div class="tick" />
                <span class="x label">{formatDateShort(data[value].date)}</span>
              </Pancake.Grid>
            </Pancake.Chart>
          </div>
        </BreakpointMax>
        <BreakpointMin width={550}>
          <div class="chart-height">
            <Pancake.Chart {x1} {x2} {y1} {y2}>
              <Pancake.Grid vertical ticks={xAxisTicks} let:value>
                <div class="tick" />
                <span class="x label">{formatDateLong(data[value].date)}</span>
              </Pancake.Grid>
            </Pancake.Chart>
          </div>
        </BreakpointMin>
      </Breakpoint>
    </div>
  </div>
</div>
