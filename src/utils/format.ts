export const metricNumber = (num: number) =>
  num >= 1e9 ? (num / 1e9).toFixed(1) + 'B' :
  num >= 1e6 ? (num / 1e6).toFixed(1) + 'M' :
  num >= 1e3 ? (num / 1e3).toFixed(1) + 'K' :
  num.toFixed(0);

export const removeDigits = (value: bigint | undefined, digits: number) => {
  const result = (Number(value) / 10 ** (digits))
  return parseFloat(result.toFixed(2))
};

export const truncateWithDots = (toTruncate: string) => {
  if (toTruncate.length <= 10) return toTruncate;
  return `${toTruncate.slice(0, 5)}...${toTruncate.slice(-5)}`;
};