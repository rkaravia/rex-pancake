const monthsLong = [
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

const monthsShort = [
  "janv.",
  "févr.",
  "mars",
  "avr.",
  "mai",
  "juin",
  "juill.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
];

export function formatDateLong(date) {
  return monthsLong[date.getUTCMonth()];
}

export function formatDateShort(date) {
  return monthsShort[date.getUTCMonth()];
}
