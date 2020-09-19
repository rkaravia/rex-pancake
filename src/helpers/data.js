import dataTsv from "../data/coronavirus_data_switzerland.tsv";
import { autoType, tsvParse } from "d3-dsv";

const rollingAverageDays = 7;

const parsedData = tsvParse(dataTsv, autoType);

const data = parsedData.map((row, i) => {
  const start = Math.max(0, i - rollingAverageDays + 1);
  const end = i + 1;
  const yRollingAverage = average(parsedData.slice(start, end));

  return {
    date: row.date,
    x: i,
    y: row.n_cases,
    yRollingAverage,
  };
});

export default data;

function average(rows) {
  let sum = 0;
  rows.forEach(({ n_cases }) => (sum += n_cases));
  return sum / rows.length;
}
