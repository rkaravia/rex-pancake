<script>
  import * as Pancake from "@sveltejs/pancake";
  import { data, formatDate } from "../helpers";

  const x1 = 0;
  const x2 = data.length - 1;
  const y1 = 0;
  const y2 = Math.max(...data.map(row => row.y));

  const averageAnnotationPoint = getAverageAnnotationPoint(data);

  function getAverageAnnotationPoint(data) {
    const maxAverage = Math.max(...data.map(row => row.yRollingAverage));
    const maxAverageRow = data.find(row => row.yRollingAverage === maxAverage);
    return { x: maxAverageRow.x, y: maxAverageRow.yRollingAverage };
  }
</script>

<style>
  .chart {
    position: relative;
    padding-top: 40%;
    margin-left: 50px;
    margin-bottom: 30px;
  }

  .chart__content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .x.label {
    position: absolute;
    bottom: -24px;
  }

  .x.label.last {
    right: 0;
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
    <Pancake.Chart {x1} {x2} {y1} {y2}>
      <Pancake.Grid vertical ticks={[x1, x2]} let:value let:first let:last>
        <span class="x label" class:first class:last>
          {formatDate(data[value].date)}
        </span>
      </Pancake.Grid>

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
</div>
