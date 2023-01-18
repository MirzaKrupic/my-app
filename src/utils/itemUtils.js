export const computeTimeLeft = (date) => {
    let d1 = date;
    let d2 = new Date();
    let now = new Date();
    if (d2.getTime() < d1.getTime()) {
      d1 = now;
      d2 = date;
    }
    let yd = d1.getYear();
    let yn = d2.getYear();
    let years = yn - yd;
    let md = d1.getMonth();
    let mn = d2.getMonth();
    let months = mn - md;
    if (months < 0) {
      years--;
      months = 12 - md + mn;
    }
    let dd = d1.getDate();
    let dn = d2.getDate();
    let days = dn - dd;
    if (days < 0) {
      months--;
      d2.setMonth(mn, 0);
      days = d2.getDate() - dd + dn;
    }
    let weeks = Math.floor(days / 7);
    days = days % 7;
    if (years > 0)
      return (
        years +
        " years" +
        (months > 0 ? " and " + months + " months" : " and " + weeks + " weeks")
      );
    if (months > 0)
      return (
        months +
        " months" +
        (weeks > 0 ? " and " + weeks + " weeks" : " and " + days + " days")
      );
    if (weeks > 0)
      return weeks + " weeks" + (days > 0 ? " and " + days + " days" : "");
    return days + " days";
  }