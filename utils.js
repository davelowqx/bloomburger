import _ from "lodash";
const numberFormat = (x) =>
  Math.abs(x) > 1000000000000
    ? _.round(x / 1000000000000, 1) + "T"
    : Math.abs(x) > 1000000000
    ? _.round(x / 1000000000, 1) + "B"
    : Math.abs(x) > 1000000
    ? _.round(x / 1000000, 1) + "B"
    : x;

export { numberFormat };
