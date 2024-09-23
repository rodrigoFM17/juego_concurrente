export const formatMoney = (money: number) => {
  let stringified = money.toString();
  const length = stringified.length;
  let formated = "";
  if (length > 3) {
    const n =
      length % 3 != 0 ? Math.floor(length / 3) : Math.floor(length / 3) - 1;
    for (let i = 0; i <= n; i++) {
      if (i == 0) {
        formated = stringified.substring(length - 1 * 3, length);
      } else {
        let start = length - (i + 1) * 3;
        if (start < 0) {
          formated = stringified.substring(0, 3 + start) + "," + formated;
        } else if (start == 0) {
          formated = stringified.substring(0, 3 + start) + "," + formated;
        } else {
          formated =
            stringified.substring(start, length - i * 3) + "," + formated;
        }
      }
    }
  } else {
    formated = stringified;
  }
  return "$ " + formated + ".00";
};
