export const formatNumber = (num: number) =>
  num >= 1e9 ? (num / 1e9).toFixed(1) + 'B' :
  num >= 1e6 ? (num / 1e6).toFixed(1) + 'M' :
  num >= 1e3 ? (num / 1e3).toFixed(1) + 'K' :
  num.toFixed(0);
