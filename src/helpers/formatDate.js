const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

export default function formatDate(date) {
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const nonBreakingSpace = "\u00a0";
  return `${day}${nonBreakingSpace}${months[month]}`;
}
